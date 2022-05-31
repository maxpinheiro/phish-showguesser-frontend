import React from "react";
import { Oval } from "react-loader-spinner";

interface SpinnerProps {
    width?: number,
    height?: number,
    color?: string,
    secondaryColor?: string,
    strokeWidth?: string,
    label?: string
}

const LoadingSpinner: React.FC<SpinnerProps> = ({width, height, color, secondaryColor, strokeWidth, label}) => (
    <>
        <Oval 
            width={width || 100} height={height || 100}
            strokeWidth={strokeWidth || 5} 
            color={color || "#E01212"} secondaryColor={secondaryColor || "#AB2626"}
        />
        <p>{label || "Loading..."}</p>
    </>
)

export default LoadingSpinner;


