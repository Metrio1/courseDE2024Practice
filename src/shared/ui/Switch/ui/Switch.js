import { getGeneratedAttrs } from "#shared/lib/utils";

/**
 * Компонент свитч - кнопки
 * @return {string}
 */
export const Switch = ({
  label = "",
  labelPosition = "right",
  extraClasses = [],
  extraAttrs = [],
  extraInputAttrs = [],
} = {}) => {
  const labelHtml = `<span class="switch__label">${label}</span>`;
  const inputHtml = `<input type="checkbox" class="switch__input visuallyHidden" ${getGeneratedAttrs(extraInputAttrs)}>`;
  return `<label class="switch ${extraClasses.join(" ")}" ${getGeneratedAttrs(extraAttrs)}>
      ${labelPosition === "left" ? labelHtml : ""}
      ${inputHtml}
      <span class="switch__slider"></span>
      ${labelPosition === "right" ? labelHtml : ""}
    </label>`;
};
