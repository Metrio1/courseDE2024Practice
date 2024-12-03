import { deleteMark } from "../api/index.js";
import { ModalManager } from "#shared/lib/plugins/ModalManager";
import { getAttr } from "#shared/lib/utils";

/**
 *
 */
export class DeleteMarkModel {
  static selectors = {
    deleteMarkBtn: "[data-js-delete-mark-btn]",
  };

  constructor() {
    this.#bindEvents();
  }

  handleDeleteMark = (event) => {
    const button = event.target.closest(
        DeleteMarkModel.selectors.deleteMarkBtn
    );

    if (!button) {
      return;
    }

    const markId = button.getAttribute(
        getAttr(DeleteMarkModel.selectors.deleteMarkBtn)
    );

    if (!markId) {
      return;
    }

    const handleDelete = async () => {
      try {
        await deleteMark(markId); // Попытка удалить метку через API
      } catch (error) {
        console.error("Ошибка при удалении метки:", error);
      }
    };

    ModalManager.getInstance().openConfirmModal({
      message: "Вы уверены, что хотите удалить метку?",
      onConfirm: async () => {
        await handleDelete(markId); // Используем замыкание для передачи markId
        ModalManager.closeAll();
      },
      onCancel: () => {
        ModalManager.closeAll();
      },
    });


  };

  #bindEvents() {
    document.addEventListener("click", this.handleDeleteMark, true);
  }
}