import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="column--centered">
            <p className="header text-centered">Phishing for Phish</p>
            <Link to="/runs"><p>View All Runs</p></Link>
        </div>
    );
}

export default Home;
