import React from "react";
import { AvatarConfig } from "./AvatarCreator.store";

export const AvatarIcon: React.FC<AvatarConfig> = ({background, torso, head}) => (
    <svg width="20" height="20">
        <circle cx="10" cy="10" r="10" fill={background} />
        <path d="M 8.143 12.334 L 5.429 18.335 C 5.429 18.335 7.439 19.546 10.399 19.494 C 13.359 19.442 15.564 17.686 15.564 17.686 L 12.865 12.334 L 8.143 12.334 Z" 
            fill={torso} stroke={torso} />
        <circle cx="10" cy="8.667" r="5.333" fill={head} />
    </svg>
);

export const AvatarIconLarge: React.FC<AvatarConfig> = ({background, torso, head}) => (
    <svg width="40" height="40">
        <circle cx="20" cy="20" r="20" fill={background} />
        <path d="M 16.286 24.668 L 10.583 37.078 C 10.583 37.078 14.395 39.586 20.646 39.456 C 26.897 39.326 31.457 35.767 31.457 35.767 L 25.73 24.668 L 16.286 24.668 Z" 
            fill={torso} stroke={torso} />
        <circle cx="20" cy="17.334" r="10.666" fill={head} />
    </svg>
);

export const AvatarIconSized: React.FC<AvatarConfig & { size: number }> = ({background, torso, head, size}) => (
    <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={size / 2} fill={background} />
        <path d={`M ${size * (8.143 / 20)} ${size * (12.334 / 20)} L ${size * (5.429 / 20)} ${size * (18.335 / 20)} C ${size * (5.429 / 20)} 
            ${size * (18.335 / 20)} ${size * (7.439 / 20)} ${size * (19.546 / 20)} ${size * (10.399 / 20)} ${size * (19.494 / 20)} C ${size * (13.359 / 20)} 
            ${size * (19.442 / 20)} ${size * (15.564 / 20)} ${size * (17.686 / 20)} ${size * (15.564 / 20)} 
            ${size * (17.686 / 20)} L ${size * (12.865 / 20)} ${size * (12.334 / 20)} L ${size * (8.143 / 20)} ${size * (12.334 / 20)} Z`} 
            fill={torso} stroke={torso} />
        <circle cx={size / 2} cy={size * (8.667 / 20)} r={size * (5.333 / 20)} fill={head} />
    </svg>
);
