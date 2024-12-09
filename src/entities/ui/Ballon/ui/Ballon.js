import {iconsPresets} from "#shared/ui/Map/config/constants.js";

/**
 * Создаёт HTML для балуна.
 * @param {Object} info - Данные для отображения в балуне.
 * @param {string} info.type - Тип маркера.
 * @param {string} info.title - Заголовок балуна.
 * @param {string} info.comment - Комментарий.
 * @param {Array<string>} info.images - Массив URL-адресов изображений.
 * @param {Object} info.address - Адрес объекта.
 * @param {string} info.address.city - Город.
 * @param {string} info.address.street - Улица.
 * @param {string} info.address.house - Номер дома.
 * @returns {string} HTML-строка.
 */
export const Ballon = (info, buttons = []) => {
    const {
        type,
        title,
        comment,
        images,
        address: { street, house },
    } = info;

    return `
  <div class="ballon-swiper">
    ${
        images && images.length
            ? `<div class="swiper">
            <div class="swiper-wrapper">
              ${images
                .map(
                    (image) =>
                        `<div class="swiper-slide"><img src="${image}" alt="Фото"></div>`
                )
                .join("")}
            </div>
            <div class="swiper-pagination"></div>
          </div>`
            : ""
    }
    <div class="ballon__body">
      <div class="ballon__description">
        <div class="ballon__header">
            <h3>${title}</h3>
            <div>${iconsPresets[type]}</div>
            <p>${street}, ${house}</p>
        </div>
        <p class="ballon__comment">${comment}</p>
        <div class="ballon__buttons">
          ${buttons.join("")}
        </div>
      </div>
    </div>
  </div>
`;
};