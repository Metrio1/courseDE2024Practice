export const getConfirmModalTemplate = (message = "Вы уверены?") => {
    return `<div class="confirm-modal">
                <p>${message}</p>
                <div class="modal-buttons">
                    <button data-js-confirm-btn class="btn btn--confirm">Да</button>
                    <button data-js-cancel-btn class="btn btn--cancel">Нет</button>
                </div>
            </div>`
}