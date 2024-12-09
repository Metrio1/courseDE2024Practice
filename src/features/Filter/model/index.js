import { getDebouncedFn } from "#shared/lib/utils";

export class FilterManager {
  constructor({
                filterGroupName,
                onFilterChange,
                filtersConfig = {},
                debounceDelay = 1000,
                customAttributes = {},
              }) {
    this.customAttributes = {
      container: "data-js-filter",
      filterItem: "data-js-filter-item",
      parentName: "data-js-filter-parent-name",
      ...customAttributes,
    };

    this.filterGroupName = filterGroupName;
    this.onFilterChange = onFilterChange;
    this.filtersConfig = filtersConfig;
    this.debounceDelay = debounceDelay;

    this.filterContainers = Array.from(
        document.querySelectorAll(
            `[${this.customAttributes.container}="${this.filterGroupName}"]`
        )
    );

    if (!this.filterContainers.length) return;

    this.debouncedHandleInput = getDebouncedFn(
        this.#handleInput.bind(this),
        this.debounceDelay
    );

    this.#initializeFilters();
    this.#bindEvents();
  }

  #initializeFilters() {
    this.filterContainers.forEach((container) => {
      Object.entries(this.filtersConfig).forEach(([name, config]) => {
        const filterElement = this.#getFilterElement(container, name);
        if (!filterElement) return;

        if (["checkbox", "radio"].includes(filterElement.type)) {
          filterElement.checked = config.isChecked || false;
        } else if (filterElement.type === "text" || filterElement.tagName === "INPUT") {
          filterElement.value = config.persistent ? config.value || "" : "";
        }
      });
    });
  }

  #bindEvents() {
    this.filterContainers.forEach((container) => {
      container.addEventListener("input", this.debouncedHandleInput);
      container.addEventListener("change", (e) => this.#handleChange(e));
    });
  }

  #getFilterElement(container, filterName) {
    return container.querySelector(
        `[${this.customAttributes.filterItem}="${filterName}"]`
    );
  }

  #handleInput(event) {
    this.#processFilterChange(event.target);
  }

  #handleChange(event) {
    this.#processFilterChange(event.target);
  }

  #processFilterChange(target) {
    const filterName = target.getAttribute(this.customAttributes.filterItem);
    const parentName = target.getAttribute(this.customAttributes.parentName);

    if (parentName !== this.filterGroupName || !filterName) {
      console.warn("Неверный фильтр или имя родителя:", { filterName, parentName });
      return;
    }

    const updatedFilter = {
      [filterName]: {
        value: target.type === "checkbox" || target.type === "radio" ? null : target.value,
        isChecked: target.type === "checkbox" || target.type === "radio" ? target.checked : false,
        isDisabled: target.disabled || false,
      },
    };

    this.filtersConfig = {
      ...this.filtersConfig,
      ...updatedFilter,
    };

    this.onFilterChange?.(this.filtersConfig);

    // Dispatch custom event for external subscribers
    const event = new CustomEvent("filtersUpdated", {
      detail: {
        filterGroupName: this.filterGroupName,
        filters: this.filtersConfig,
      },
    });
    document.dispatchEvent(event);
  }

  applyFilters(newConfig) {
    this.filtersConfig = { ...this.filtersConfig, ...newConfig };
    this.#initializeFilters();
  }

  destroy() {
    this.filterContainers.forEach((container) => {
      container.removeEventListener("input", this.debouncedHandleInput);
      container.removeEventListener("change", this.#handleChange);
    });
  }
}
