export const getConfirmModalTemplate = (message = "Вы уверены?") => {
    return `
        <div class="confirm-modal">
            <p class="confirm-modal__message">${message}</p>
            <div class="confirm-modal__buttons">
                <button data-js-confirm-btn class="confirm-modal__button confirm-modal__button--confirm">
                    Да
                </button>
                <button data-js-cancel-btn class="confirm-modal__button confirm-modal__button--cancel">
                    Нет
                </button>
            </div>
        </div>
    `;
};