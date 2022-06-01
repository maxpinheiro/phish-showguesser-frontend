import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById } from "../../api/User.api";
import { ResponseStatus } from "../../app/store/store";
import { selectUserId } from "../../domain/Authentication/Authentication.store";
import { User } from "../../types/User.type";
import { ReactComponent as Logo} from "../icons/Logo.svg";
import { ReactComponent as Donut } from "../icons/Donut.svg";
import Modal from "react-modal";
import SettingsModal from "./SettingsModal";

Modal.setAppElement('#root');

const Navbar: React.FC = () => {
    const currentUserId = useSelector(selectUserId);
    const [ currentUser, setCurrentUser ] = useState<User | null>(null);
    const [ settingsModalOpen, setModalOpen ] = useState(false);

    useEffect(() => {
        if (currentUserId) {
            getUserById(currentUserId).then(user => {
                if (user !== ResponseStatus.UnknownError && user !== ResponseStatus.NotFound) {
                    setCurrentUser(user);
                }
            });
        } else {
            setCurrentUser(null);
        }
    }, [ currentUserId ]);

    return (
        <div className="w-100 bg-secondary-1 text-white font-medium">
            <div className="row--space-between align-center mx-20">
                <div id="logo">
                    <Link to="/">
                        <div className="row align-center mx-bw-10">
                            <Donut className="fill-red" />
                            <p className="font-bold">Phishing For Phish</p>
                        </div>
                    </Link>
                </div>
                <div id="links" className="row mx-bw-10 ">
                    { currentUser ? 
                        <Link to={`/users/${currentUser.id}`}>{currentUser.username}</Link> :
                        <Link to="/login">Login</Link>
                    }
                    <Link to="/runs">Runs</Link>
                    <div className="pointer" onClick={() => setModalOpen(true)}>
                        <i className="bi bi-sliders text-white" />
                    </div>
                </div>
            </div>
            <Modal isOpen={settingsModalOpen} onRequestClose={() => setModalOpen(false)}
                contentLabel="Settings"
            >
                <SettingsModal close={() => setModalOpen(false)} />
            </Modal>
        </div>
    );
}

export default Navbar;
