import { deleteMark } from "../api/index.js";
import { ModalManager } from "#shared/lib/plugins/ModalManager";
import { getAttr } from "#shared/lib/utils";

/**
 * Модель удаления меток.
 */
export class DeleteMarkModel {
  static selectors = {
    deleteMarkBtn: "[data-js-delete-mark-btn]",
  };

  constructor() {
    this.#initEventListeners();
  }

  /**
   * Обработчик события удаления метки.
   * @param {Event} event - Событие клика.
   */
  #handleDeleteMark = async (event) => {
    const button = event.target.closest(DeleteMarkModel.selectors.deleteMarkBtn);

    if (!button) return;

    const markId = button.getAttribute(getAttr(DeleteMarkModel.selectors.deleteMarkBtn));
    if (!markId) return;

    ModalManager.getInstance().openConfirmModal({
      message: "Вы уверены, что хотите удалить метку?",
      onConfirm: async () => {
        await this.#deleteMarkById(markId);
      },
      onCancel: ModalManager.closeAll,
    });
  };

  /**
   * Удаление метки по ID.
   * @param {string} markId - Идентификатор метки.
   */
  async #deleteMarkById(markId) {
    try {
      await deleteMark(markId);
      console.info(`Метка с ID ${markId} успешно удалена.`);
    } catch (error) {
      console.error(`Ошибка при удалении метки: ${error.message}`);
    }
  }

  #initEventListeners() {
    document.addEventListener("click", this.#handleDeleteMark, true);
  }
}
