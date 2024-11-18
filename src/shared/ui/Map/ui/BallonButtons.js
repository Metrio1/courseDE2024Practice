import { getGeneratedAttrs } from "#shared/lib/utils/index.js";

/**
 * Компонент кнопок для баллуна
 * @param {Object} props
 * @param {Array} props.extraClasses - Дополнительные классы для блока кнопок
 * @param {Array} props.buttonsConfig - Массив объектов с описанием кнопок
 * @return {string}
 */
export const BallonButtons = ({ extraClasses = [], buttonsConfig = [] } = {}) => {
    return `
    <div class="ballon-buttons ${extraClasses.join(" ")}">
      ${buttonsConfig
        .map(
            ({ text, iconSlot, extraAttrs, extraClasses }) => `
        <button 
          class="ballon-buttons__button ${extraClasses ? extraClasses.join(" ") : ""}" 
          ${getGeneratedAttrs(extraAttrs || [])}>
          <span class="btn__icon">${iconSlot || ""}</span>
          <span class="ballon-buttons__text">${text || ""}</span>
        </button>
      `
        )
        .join("")}
    </div>
  `;
};