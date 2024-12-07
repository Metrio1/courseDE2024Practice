import { getGeneratedAttrs } from "#shared/lib/utils";

/**
 * Компонент кнопок для карты
 * @param {Object} props
 * @param {Array} props.extraClasses - Дополнительные классы для блока кнопок
 * @param {Array} props.buttons - Массив кнопок, где каждая кнопка — объект { text, iconSlot, extraAttrs }
 * @return {string}
 */
export const MapButtons = ({ extraClasses = [], buttons = [] } = {}) => {
    return `<div class="mapButtons ${extraClasses.join(" ")}">
    ${buttons
        .map(
            ({ text, iconSlot = "", extraAttrs = [] }) => `
        <button class="mapButtons__button" ${getGeneratedAttrs(extraAttrs)}>
          <span class="mapButtons__icon">${iconSlot}</span>
          <span class="mapButtons__text">${text}</span>
        </button>
      `
        )
        .join("")}
  </div>`;
};