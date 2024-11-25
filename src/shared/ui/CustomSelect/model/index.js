import Choices from "choices.js";

/**
 * Модель для создания кастомного селекта на основе choices.js
 */
export class ChoiceSelectModel {
    selectors = {
        instance: "[data-js-custom-select]",
    };

    static instance;

    static choicesInstances = [];

    static defaultCfg = {
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
                    <div class="choices__item choices__item--choice customSelect__choice choices__item--selectable customSelect__item--selectable" data-select-text="${this.config.itemSelectText}" data-choice data-id="${data.id}" data-value="${data.value}" ${
                        data.groupId > 0 ? 'role="treeitem"' : 'role="option"'
                    }>
                        ${icon}<span class="customSelect__label">${data.label}</span>
                    </div>
                `);
                },
            };
        },
    };

    static createChoiceSelect(node) {
        const cfg = node.dataset.jsCustomSelect ? JSON.parse(node.dataset.jsCustomSelect) : {};
        const choicesConfig = {
            ...ChoiceSelectModel.defaultCfg,
            ...cfg,
        };

        ChoiceSelectModel.choicesInstances.push(
            new Choices(node, choicesConfig)
        );
    }

    static getChoiceInstance(node) {
        return ChoiceSelectModel.choicesInstances.find(
            (instance) => instance.passedElement.element === node
        );
    }

    static addHighlightEffect() {
        const applyHighlight = () => {
            const items = document.querySelectorAll('.choices__item');

            items.forEach((item) => {
                item.addEventListener('mouseenter', () => {
                    item.classList.add('is-highlighted');
                });

                item.addEventListener('mouseleave', () => {
                    item.classList.remove('is-highlighted');
                });
            });
        };

        ChoiceSelectModel.choicesInstances.forEach((instance) => {
            instance.passedElement.element.addEventListener('showDropdown', applyHighlight);
        });

        applyHighlight();
    }

    constructor() {
        if (ChoiceSelectModel.instance) return ChoiceSelectModel.instance;
        this.selects = document.querySelectorAll(this.selectors.instance);
        this.selects.forEach((select) => {
            ChoiceSelectModel.createChoiceSelect(select);
        });
        ChoiceSelectModel.addHighlightEffect();
        ChoiceSelectModel.instance = this;
    }
}