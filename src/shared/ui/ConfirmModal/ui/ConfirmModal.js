import {Button} from "#shared/ui/Button/index.js";
import {CancelIcon, CheckIcon} from "#shared/ui/Icons/index.js";


export const getConfirmModalTemplate = (message = "Вы уверены?") => {
    return `
        <div class="confirm-modal">
            <p class="confirm-modal__message">${message}</p>
            <div class="confirm-modal__buttons">
                ${Button({ text: "Да", iconSlot: CheckIcon(), extraClasses: ["confirm-modal__button", "confirm-modal__button--confirm", "btn--isGreenLightIcon"], extraAttrs: ["data-js-confirm-btn"] })}
                ${Button({ text: "Нет", iconSlot: CancelIcon(), extraClasses: ["btn--isRedIcon", "confirm-modal__button", "confirm-modal__button--cancel"], extraAttrs: ["data-js-cancel-btn"] })}    
            </div>
        </div>
    `;
};