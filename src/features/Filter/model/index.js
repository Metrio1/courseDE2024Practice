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


    this.filterContainer = document.querySelector(
        `[${this.customAttributes.container}="${this.filterGroupName}"]`
    );
    if (!this.filterContainer) return;

    this.debouncedHandleInput = getDebouncedFn(
        this.#handleInput,
        this.debounceDelay
    );

    this.#initializeFilters();
    this.#bindEvents();
  }

  #initializeFilters() {
    Object.entries(this.filtersConfig).forEach(([name, config]) => {
      const filterElement = this.#getFilterElement(name);
      if (!filterElement) return;

      if (filterElement.type === "checkbox" || filterElement.type === "radio") {
        filterElement.checked = config.isChecked || false;
      } else if (
          filterElement.type === "text" ||
          filterElement.tagName === "INPUT"
      ) {
        filterElement.value = config.persistent ? config.value || "" : "";
      }
    });
  }

  #bindEvents() {
    this.filterContainer.addEventListener("input", this.debouncedHandleInput);
    this.filterContainer.addEventListener("change", (event) =>
        this.#handleChange(event)
    );
  }

  #getFilterElement(filterName) {
    return this.filterContainer.querySelector(
        `[${this.customAttributes.filterItem}="${filterName}"]`
    );
  }

  #handleInput = (event) => {
    this.#processFilterChange(event.target);
  };

  #handleChange = (event) => {
    this.#processFilterChange(event.target);
  };

  #processFilterChange(target) {
    console.log("Target element:", target);

    const filterName = target.getAttribute(this.customAttributes.filterItem);
    const parentName = target.getAttribute(this.customAttributes.parentName);

    console.log("Filter changed:", { filterName, parentName, checked: target.checked });

    if (parentName !== this.filterGroupName || !filterName) {
      console.error("Invalid filter or parent name:", { filterName, parentName });
      return;
    }

    const updatedFilter = {
      [filterName]: {
        value:
            target.type === "checkbox" || target.type === "radio"
                ? null
                : target.value,
        isChecked:
            target.type === "checkbox" || target.type === "radio"
                ? target.checked
                : false,
        isDisabled: target.disabled || false,
      },
    };

    this.onFilterChange?.(updatedFilter);
  }

  applyFilters(newConfig) {
    this.filtersConfig = { ...this.filtersConfig, ...newConfig };
    this.#initializeFilters();
  }

  destroy() {
    this.filterContainer.removeEventListener("input", this.debouncedHandleInput);
    this.filterContainer.removeEventListener("change", this.#handleChange);
  }
}