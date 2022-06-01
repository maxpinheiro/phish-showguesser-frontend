import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="column--centered">
            <div className="h-20vh" />
            <div className="w-50">
                <p className="header text-centered">Phishing for Phish</p>
            </div>
            <Link to="/runs"><p>View All Runs</p></Link>
        </div>
    );
}

export default Home;
