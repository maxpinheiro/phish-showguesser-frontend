export type Color = `#${string}` | `rgb(${number}, ${number}, ${number})`;

export interface AvatarConfig {
    head: Color,
    torso: Color,
    background: Color
}

export interface AvatarCreatorState {

}