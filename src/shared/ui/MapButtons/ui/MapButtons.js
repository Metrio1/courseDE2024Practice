import { getGeneratedAttrs } from "#shared/lib/utils";

/**
 * Компонент кнопок для карты
 * @param {Object} props
 * @param {Array} props.extraClasses - Дополнительные классы для блока кнопок
 * @param {Array} props.buttons - Массив кнопок, где каждая кнопка — объект { text, iconClass, extraAttrs }
 * @return {string}
 */
export const MapButtons = ({ extraClasses = [], buttons = [] } = {}) => {
    return `<div class="map-buttons ${extraClasses.join(" ")}">
    ${buttons
        .map(
            ({ text, iconSlot = "", extraAttrs = [] }) => `
        <button class="map-buttons__button" ${getGeneratedAttrs(extraAttrs)}>
          <span class="btn__icon">${iconSlot}</span>
          <span class="map-buttons__text">${text}</span>
        </button>
      `
        )
        .join("")}
  </div>`;
};