import React, { useState } from "react";
import { Color, randomHex } from "../../shared/util/colors";
import { defaultAvatar } from "./AvatarCreator.store";
import { AvatarIconSized } from "./AvatarIcon";

const AvatarCreator: React.FC = () => {
    const [ head, setHead ] = useState<Color>(defaultAvatar.head);
    const [ torso, setTorso ] = useState<Color>(defaultAvatar.torso);
    const [ background, setBackground ] = useState<Color>(defaultAvatar.background);

    const randomColors = () => {
        setHead(randomHex());
        setTorso(randomHex());
        setBackground(randomHex());
    }

    return (
        <div className="column--centered">
            <AvatarIconSized head={head} torso={torso} background={background} size={200} />
            <div className="column--centered w-100">
                <div className="row--space-between align-center w-75">
                    <p>Head:</p>
                    <p style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', color: head}}>{head}</p>
                    <p onClick={() => setHead(randomHex())} className="button">Random</p>
                </div>
                <div className="row--space-between align-center w-75">
                    <p>Torso:</p>
                    <p style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', color: torso}}>{torso}</p>
                    <p onClick={() => setTorso(randomHex())} className="button">Random</p>
                </div>
                <div className="row--space-between align-center w-75">
                    <p>Background:</p>
                    <p style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', color: background}}>{background}</p>
                    <p onClick={() => setBackground(randomHex())} className="button">Random</p>
                </div>
            </div>
            <p onClick={randomColors} className="button">Shuffle Random</p>
        </div>
    );
}

export default AvatarCreator;
