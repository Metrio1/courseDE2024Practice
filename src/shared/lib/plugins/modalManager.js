import { Fancybox } from "@fancyapps/ui";

export class modalManager {
    static instance;

    constructor(selectors = { instance: "[data-js-modal]" }) {
        this.selectors = selectors;
        this.selectElements = document.querySelectorAll(this.selectors.instance);
        this.instances = {};

        return modalManager.instance || (modalManager.instance = this);
    }

    open({ selector, htmlContent }) {
        if (selector) {
            const element = document.querySelector(selector);
            if (!element) {
                console.error(`Элемент с селектором ${selector} не найден.`);
                return;
            }

            if (!modalManager.instance.instances[selector]) {
                modalManager.instance.instances[selector] = Fancybox.show([{ src: element, type: "inline" }]);
            } else {
                console.warn(`Fancybox instance для селектора "${selector}" уже существует.`);
            }
        } else if (htmlContent) {
            const container = document.createElement("div");
            container.innerHTML = htmlContent;
            document.body.appendChild(container);

            const uniqueId = `dynamic-${Date.now()}`;
            modalManager.instance.instances[uniqueId] = Fancybox.show([{ src: container, type: "html" }]);

            Fancybox.bind(`[data-fancybox="${uniqueId}"]`, {
                on: {
                    destroy: () => container.remove(),
                },
            });
        }
    }

    static closeAll() {
        Fancybox.close(); // Закрывает все активные модалки
    }
}