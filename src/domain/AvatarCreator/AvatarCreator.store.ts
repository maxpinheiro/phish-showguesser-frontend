import { Color } from "../../shared/util/colors"

export interface AvatarConfig {
    head: Color,
    torso: Color,
    background: Color
}

export const defaultAvatar: AvatarConfig = {
    head: "#ddd",
    torso: "#aaa",
    background: '#666'
}

export interface AvatarCreatorState {

}