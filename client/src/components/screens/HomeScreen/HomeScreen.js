import "./HomeScreen.css";

const HomeScreen = ({ }) => {
    return (
        <div className="video">
            <video src="videos\FitnessVideo.mp4" autoPlay loop muted></video>
            <img className="center" src="images\FitSync-logos_white.png"></img>
        </div>
    );

};

export default HomeScreen;