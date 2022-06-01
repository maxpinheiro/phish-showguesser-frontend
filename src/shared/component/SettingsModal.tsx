import React, { useEffect, useState } from "react";

interface SettingsModalProps {
    close: () => void
}

const themes = [1, 2];

const SettingsModal: React.FC<SettingsModalProps> = ({ close }) => {
    const [ themeIdx, setThemeIdx ] = useState<number>(1);

    useEffect(() => {
        const themeCookie = parseInt(JSON.parse(window.localStorage.getItem("themeIdx") || "{}"));
        if (themeCookie) {
            setThemeIdx(themeCookie);
        }
    }, []);

    const save = () => {
        window.localStorage.setItem("themeIdx", JSON.stringify(themeIdx));
        close();
    }

    return (
        <div className="column--centered w-100">
            <div className="w-100 row--end">
                <i onClick={close} className="bi bi-x-lg pointer" />
            </div>
            <p className="header m-0">Settings</p>
            <div className="row align-center mx-bw-10">
                <p>Theme: </p>
                <select value={themeIdx} onChange={e => setThemeIdx(idx => parseInt(e.target.value) || idx)} >
                    { themes.map(theme => (
                        <option value={theme} className="w-100vw" key={theme}>Theme {theme}</option>
                    ))}
                </select>
            </div>
            <button className="" onClick={save}><p className="m-0">Save</p></button>
        </div>
    )
}

export default SettingsModal;
