/**
 * Генерирует атрибуты для компонентов
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
