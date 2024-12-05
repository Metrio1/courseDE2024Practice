import {Button} from "#shared/ui/Button/index.js";
import {CancelIcon, CheckIcon} from "#shared/ui/Icons/index.js";
import {getGeneratedAttrs} from "#shared/lib/utils/index.js";


export const getConfirmModalTemplate = (message = "Вы уверены?", extraClasses = [], extraAttrs = []) => {
    return `
        <div class="confirmModal" ${extraClasses.join(" ")}" ${getGeneratedAttrs(extraAttrs)}>
            <p class="confirmModal__message">${message}</p>
            <div class="confirmModal__buttons">
                ${Button({ text: "Да", iconSlot: CheckIcon(), extraClasses: ["confirm-modal__button", "confirm-modal__button--confirm", "btn--isGreenLightIcon"], extraAttrs: ["data-js-confirm-btn"] })}
                ${Button({ text: "Нет", iconSlot: CancelIcon(), extraClasses: ["btn--isRedIcon", "confirm-modal__button", "confirm-modal__button--cancel"], extraAttrs: ["data-js-cancel-btn"] })}    
            </div>
        </div>
    `;
};