const NearMeButton = ({ handleLatitudeChange, handleLongitudeChange, handleGeoLocationError }) => {
    const handleNearMeClick = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                handleLatitudeChange(position.coords.latitude);
                handleLongitudeChange(position.coords.longitude);
            },
            error => {
                console.log(error)
                handleGeoLocationError();
            }
        );
    };
    return (
        <button type="button" onClick={handleNearMeClick}> Near Me</button>
    )
}

export default NearMeButton;