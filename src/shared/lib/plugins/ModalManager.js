import { Fancybox } from "@fancyapps/ui";

export class ModalManager {
    static instance;

    constructor(selectors = { instance: "[data-js-modal]" }) {
        this.selectors = selectors;
        this.selectElements = document.querySelectorAll(this.selectors.instance);
        this.instances = {};

        return ModalManager.instance || (ModalManager.instance = this);
    }

    open({ selector, htmlContent }) {
        if (selector) {
            const element = document.querySelector(selector);
            if (!element) {
                console.error(`Элемент с селектором ${selector} не найден.`);
                return;
            }

            if (!ModalManager.instance.instances[selector]) {
                ModalManager.instance.instances[selector] = Fancybox.show([{ src: element, type: "inline" }]);
            } else {
                console.warn(`Fancybox instance для селектора "${selector}" уже существует.`);
            }
        } else if (htmlContent) {
            const container = document.createElement("div");
            container.innerHTML = htmlContent;
            document.body.appendChild(container);

            const uniqueId = `dynamic-${Date.now()}`;
            ModalManager.instance.instances[uniqueId] = Fancybox.show([{ src: container, type: "html" }]);

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