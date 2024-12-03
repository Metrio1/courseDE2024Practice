/**
 * Генерируем атрибуты для компонентов
 * @param {Array} attributes - Массив атрибутов в формате [{ name, value } или строка]
 * @return {String}
 */
export const getGeneratedAttrs = (attributes = []) => {
  return attributes
      .map((attr) => {
        if (typeof attr === "string") {
          return attr;
        } else if (typeof attr === "object" && attr.name) {
          return attr.value ? `${attr.name}="${attr.value}"` : `${attr.name}`;
        }
        return "";
      })
      .filter(Boolean)
      .join(" ");
};
