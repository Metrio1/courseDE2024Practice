import { getUpdateMarkModalContent } from "../ui/getUpdateMarkModalContent.js";
import { API_ENDPOINTS } from "#shared/config/constants.js";
import { ModalManager } from "#shared/lib/plugins/ModalManager";
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

    const markInfoAttr = parent.getAttribute(this.attrs.updateMark);
    if (!markInfoAttr) {
      console.error("Атрибут data-js-update-mark-info не найден или пустой.");
      return;
    }

    try {
      const markInfo = JSON.parse(markInfoAttr);
      console.debug("Полученные данные метки:", markInfo);
      ModalManager.getInstance().open(
          getUpdateMarkModalContent({
            markInfo,
            url: API_ENDPOINTS.marks.update,
          }),
          {
            on: {
              reveal: () => {
                CustomSelect.createCustomSelect(
                    document.querySelector(
                        `[${this.attrs.selectTypeMark}="${markInfo.id}"]`
                    )
                );
              },
            },
            closeButton: false,
          }
      );
    } catch (error) {
      console.error("Ошибка при парсинге JSON:", error);
      console.error("Строка, которую пытались парсить:", markInfoAttr);
    }
  }

  #handleSubmit() {}

  #bindEvents() {
    document.addEventListener("click", (e) => {
      this.#handleClick(e);
    });
  }
}
