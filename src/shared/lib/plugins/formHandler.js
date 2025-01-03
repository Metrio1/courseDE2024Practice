// import { ApiClient } from "../services/ApiClient.js";
import { ModalManager } from "./ModalManager.js";
import {ApiClient} from "#shared/lib/services/ApiClient.js";

/**
 * Класс для отправки данных с формы
 */
export class FormHandler {
  static instance;

  attrs = {
    form: "data-js-form",
  };

  constructor() {
    if (FormHandler.instance) return FormHandler.instance;
    this.#bindEvents();
    FormHandler.instance = this;
  }

  static getInstance() {
    if (!FormHandler.instance) {
      FormHandler.instance = new FormHandler();
    }
    return FormHandler.instance;
  }

  async #handleSubmit(e) {
    const { target, submitter } = e;
    if (!target.hasAttribute(`${this.attrs.form}`)) return;
    if (target.tagName.toLowerCase() !== "form") return;

    const cfg = JSON.parse(target.getAttribute(this.attrs.form));
    const {
      url,
      method = "POST",
      showModalAfterSuccess,
      preventDefault = true,
    } = cfg;
    const data = new FormData(target);

    if (preventDefault) {
      e.preventDefault();
    }

    submitter.disabled = true;

    try {
      const apiClient = new ApiClient();

      let response;
      if (method.toUpperCase() === "GET") {
        const params = Object.fromEntries(data.entries());
        response = await apiClient.get(url, params);
      } else {
        response = await apiClient[method.toLowerCase()](url, data);
      }

      if (showModalAfterSuccess) {
        ModalManager.getInstance().closeAll();
        ModalManager.getInstance().open(showModalAfterSuccess, {
          type: "inline",
        });
      }

    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    } finally {
      submitter.disabled = false;
    }
  }

  #bindEvents() {
    document.addEventListener(
        "submit",
        (e) => {
          this.#handleSubmit(e);
        },
        true
    );
  }
}
