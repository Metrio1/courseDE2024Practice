import { Fancybox } from "@fancyapps/ui";
import { getConfirmModalTemplate } from "#shared/ui/ConfirmModal/ui/ConfirmModal.js";

/**
 * Класс для управления модальными окнами (Singleton).
 */
export class ModalManager {
    static #instance = null;

    static selectors = {
        fancyboxContent: ".fancybox__content",
        confirmBtn: "[data-js-confirm-btn]",
        cancelBtn: "[data-js-cancel-btn]",
    };

    #defaultOptions;

    constructor(options = {}) {
        if (ModalManager.#instance) {
            return ModalManager.#instance;
        }

        this.#defaultOptions = {
            animationClass: "fade",
            overlayColor: "rgba(0, 0, 0, 0.7)",
            trapFocus: true,
            defaultType: "html",
            autoFocus: true,
            ...options,
        };

        ModalManager.#instance = this;
    }

    /**
     * Открытие модального окна.
     * @param {string|HTMLElement} src - Контент модального окна.
     * @param {Object} options - Опции для модального окна.
     */
    open(src, options = {}) {
        const finalOptions = { ...this.#defaultOptions, ...options };
        Fancybox.show([{ src, type: options.type || "html" }], finalOptions);
    }

    /**
     * Открытие модального окна подтверждения действия.
     * @param {Object} params - Параметры для модального окна подтверждения.
     */
    openConfirmModal({ message, onConfirm = () => {}, onCancel = () => {} }) {
        const content = getConfirmModalTemplate(message);

        this.open(content, {
            on: {
                reveal: () => this.#attachConfirmModalListeners(onConfirm, onCancel),
            },
        });
    }

    #attachConfirmModalListeners(onConfirm, onCancel) {
        const fancyboxContent = document.querySelector(ModalManager.selectors.fancyboxContent);

        if (!fancyboxContent) return;

        const confirmBtn = fancyboxContent.querySelector(ModalManager.selectors.confirmBtn);
        const cancelBtn = fancyboxContent.querySelector(ModalManager.selectors.cancelBtn);

        confirmBtn?.addEventListener("click", () => {
            onConfirm();
            ModalManager.closeAll();
        });

        cancelBtn?.addEventListener("click", () => {
            onCancel();
            ModalManager.closeAll();
        });
    }

    /**
     * Закрытие всех модальных окон.
     */
    static closeAll() {
        Fancybox.close();
    }

    /**
     * Получение экземпляра класса (Singleton).
     */
    static getInstance(options = {}) {
        if (!ModalManager.#instance) {
            ModalManager.#instance = new ModalManager(options);
        }
        return ModalManager.#instance;
    }
}
