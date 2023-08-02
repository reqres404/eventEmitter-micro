import lottie from "lottie-web";
import React, { useEffect } from "react";
import LoadingAni from '../../assets/LoadingAni.json'
import './Loading.css'
const Loading = () => {

    useEffect(() => {
        const animationContainer = document.querySelector("#man-watching-movie");
        
        if (animationContainer && !animationContainer.getAttribute("data-loaded")) {
            lottie.loadAnimation({
                container: animationContainer,
                animationData: LoadingAni,
            });

            animationContainer.setAttribute("data-loaded", true);
        }
    }, []);
    return(
        <div className="loading-animation">
            <div id="man-watching-movie" style={{ width: 100, height: 100 }} />
        </div>
    )

}
export default Loading