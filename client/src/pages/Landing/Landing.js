import lottie from "lottie-web";
import React, { useEffect } from "react";
import Waves from "../../components/Waves/Waves";
import "./Landing.css"
// import cakeLoad from '../../assets/CakeLoad.json' 
import GiftAni from "../../assets/GiftAni.json"
const Landing = () => {

    useEffect(() => {
        const animationContainer = document.querySelector("#man-watching-movie");
        
        if (animationContainer && !animationContainer.getAttribute("data-loaded")) {
            lottie.loadAnimation({
                container: animationContainer,
                animationData: GiftAni,
            });

            animationContainer.setAttribute("data-loaded", true);
        }
    }, []);

    return (
        <div className="landing-container">
            <div className="">

            </div>
            <div id="man-watching-movie" style={{ width: 500, height: 500 }} />
            <h2 className="landing-heading">With CakeTrack never miss to surprise your colleague on their special days</h2>        
            <Waves/>
        </div>
    );
};

export default Landing;
