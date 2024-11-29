import { Button } from "#shared/ui/Button";
import { EditIcon } from "#shared/ui/Icons";

/**
 * Кнопка удаления метки
 */
export const EditMarkBtn = ({ markId }) =>
    Button({
        text: "Редактировать",
        iconSlot: EditIcon({ iconColor: "var(--colorBlack)" }),
        extraAttrs: [{ name: "data-js-edit-mark-btn", value: markId }],
    });
