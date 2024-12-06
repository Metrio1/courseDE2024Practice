/**
 * Генерирует атрибуты для компонентов
 * @param {Array} attributes - Массив атрибутов в формате [{ name, value } или строка]
 * @return {String} Сформированные атрибуты
 */
export const getGeneratedAttrs = (attributes = []) => {
    return attributes
        .map((attr) => {
            if (typeof attr === "string") {
                return attr;
            }
            if (typeof attr === "object" && attr.name) {
                const value =
                    typeof attr.value === "object"
                        ? `'${JSON.stringify(attr.value)}'`
                        : `"${attr.value}"`;
                return attr.value ? `${attr.name}=${value}` : attr.name;
            }
            return "";
        })
        .join(" ");
};
