import { BallonButtons } from "#shared/ui/Map/ui/BallonButtons.js";

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
 * @param {Array<Object>} buttonsConfig - Конфигурация кнопок.
 * @param {Object} iconsPresets - Пресеты иконок.
 * @returns {string} HTML-строка.
 */
export const Ballon = (info, buttonsConfig, iconsPresets) => {
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
            <div class="swiper-pagination"></div> <!-- Пагинация -->
          </div>`
            : ""
    }
    <div class="ballon-body">
      <div class="ballon-description">
        <h3>${title}</h3>
        <div>${iconsPresets[type]}</div>
        <p>${street}, ${house}</p>
        <p>${comment}</p>
      </div>
      ${BallonButtons({ buttonsConfig })}
    </div>
  </div>
`;
};