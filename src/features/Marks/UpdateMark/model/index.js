import { getUpdateMarkModalContent } from "../ui/getUpdateMarkModalContent.js";
import { API_ENDPOINTS, API_URL } from "#shared/config/constants.js";
import { ModalManager } from "#shared/lib/plugins/ModalManager.js";
import { CustomSelect } from "#shared/ui/CustomSelect/model/index.js";

/**
 *
 */
export class UpdateMarkModel {
  attrs = {
    updateMark: "data-js-update-mark-info",
    selectTypeMark: "data-js-update-mark-info-select-type",
  };

  constructor(storeService) {
    this.storeService = storeService;
    this.#bindEvents();
  }


  #handleClick(e) {
    const parent = e.target.closest(`[${this.attrs.updateMark}]`);
    if (!parent) return;

    try {
      const markInfo = JSON.parse(parent.getAttribute(this.attrs.updateMark));
      ModalManager.getInstance().open(
          getUpdateMarkModalContent({
            markInfo,
            url: `${API_ENDPOINTS.marks.update}`,
          }),
          {
            on: {
              reveal: () => {
                CustomSelect.createInstance(
                    document.querySelector(
                        `[${this.attrs.selectTypeMark}="${markInfo.id}"]`
                    )
                );
              },
            },
            closeButton: true,
          }
      );
    } catch (error) {
      console.error("Ошибка при открытии модалки обновления метки:", error);
    }
  }

  #handleSubmit() {}

  #bindEvents() {
    document.addEventListener("click", (e) => {
      this.#handleClick(e);
    });
  }
}