import Choices from "choices.js";

/**
 * Класс для управления кастомными селектами на базе Choices.js.
 */
export class CustomSelect {
    static instance = null;

    static choicesInstances = [];

    static defaultConfig = {
        classNames: {
            containerOuter: ["choices", "customSelect"],
            itemChoice: ["choices__item--choice", "customSelect__choice"],
            containerInner: ["choices__inner", "customSelect__inner"],
            list: ["choices__list", "customSelect__list"],
            itemSelectable: ["choices__item--selectable", "customSelect__item--selectable"],
        },
        callbackOnCreateTemplates: function (template) {
            return {
                item: (classNames, data) => {
                    const icon = data.customProperties?.icon || '';
                    return template(`
                    <div class="customSelect__item--selectable" data-value="${data.value}" data-custom-properties='${JSON.stringify(data.customProperties)}'>
                        ${icon}<span class="customSelect__label">${data.label}</span>
                    </div>
                `);
                },
                choice: (classNames, data) => {
                    const icon = data.customProperties?.icon || '';
                    return template(`
                    <div class="choices__item customSelect__choice choices__item--selectable" data-select-text="${this.config.itemSelectText}" data-choice data-id="${data.id}" data-value="${data.value}" role="option">
                        ${icon}<span class="customSelect__label">${data.label}</span>
                    </div>
                `);
                },
            };
        },
    };

    constructor(selectors = { instance: "[data-js-custom-select]" }) {
        if (CustomSelect.instance) return CustomSelect.instance;

        this.selectors = selectors;
        this.selectElements = document.querySelectorAll(this.selectors.instance);

        this.initSelects();
        this.addGlobalEvents();

        CustomSelect.instance = this;
    }

    initSelects() {
        this.selectElements.forEach((select) => {
            CustomSelect.createInstance(select);
        });
    }

    static createInstance(node) {
        const userConfig = node.dataset.jsCustomSelect ? JSON.parse(node.dataset.jsCustomSelect) : {};
        const config = {
            ...CustomSelect.defaultConfig,
            ...userConfig,
        };
        const instance = new Choices(node, config);

        CustomSelect.choicesInstances.push(instance);
    }

    static getInstanceByNode(node) {
        return CustomSelect.choicesInstances.find((instance) => instance.passedElement.element === node);
    }

    addGlobalEvents() {
        document.addEventListener("mouseenter", this.onMouseEnterHighlight.bind(this), true);
        document.addEventListener("mouseleave", this.onMouseLeaveHighlight.bind(this), true);
    }

    onMouseEnterHighlight(event) {
        const target = event.target;
        if (target && typeof target.closest === "function") {
            const item = target.closest(".choices__item");
            if (item) item.classList.add("is-highlighted");
        }
    }

    onMouseLeaveHighlight(event) {
        const target = event.target;
        if (target && typeof target.closest === "function") {
            const item = target.closest(".choices__item");
            if (item) item.classList.remove("is-highlighted");
        }
    }

    static refreshAll() {
        CustomSelect.choicesInstances.forEach((instance) => {
            instance.destroy();
            CustomSelect.createInstance(instance.passedElement.element);
        });
    }

    static destroyAll() {
        CustomSelect.choicesInstances.forEach((instance) => instance.destroy());
        CustomSelect.choicesInstances = [];
    }
}
