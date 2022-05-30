import React from "react";
import { Oval } from "react-loader-spinner";

interface SpinnerProps {
    width?: number,
    height?: number,
    color?: string,
    secondaryColor?: string,
    label?: string
}

const LoadingSpinner: React.FC<SpinnerProps> = (props) => (
    <div>
        <Oval {...props} />
        {props.label && <p>{props.label}</p>}
    </div>
)

export default LoadingSpinner;
