export type HexColor = `#${string}`;
export type RGBColor = `rgb(${number}, ${number}, ${number})`;
export type Color = HexColor | RGBColor;

export const randomRgb = (): RGBColor => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

export const randomHex = (): HexColor => {
    const r = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    const g = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    const b = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
}

export const rgbToHex = (color: RGBColor): HexColor => {
    const tuple = color.substring(4, color.length - 1).split(', ');
    const r = (parseInt(tuple[0]) || 0).toString(16).padStart(2, "0");
    const g = (parseInt(tuple[1]) || 0).toString(16).padStart(2, "0");
    const b = (parseInt(tuple[2]) || 0).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
}

export const hexToRGB = (color: HexColor): RGBColor => {
    const colors = color.substring(1);
    const r = parseInt(colors.substring(0, 2), 16) || 0;
    const g = parseInt(colors.substring(2, 4), 16) || 0;
    const b = parseInt(colors.substring(4, 6), 16) || 0;
    return `rgb(${r}, ${g}, ${b})`;
}
