import { getGeneratedAttrs } from "#shared/lib/utils";

/**
 * Компонент кнопок для карты
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