const coordinateValidation = (latitude, longitude) => {
    if (!isFinite(latitude) || latitude <= -90 || latitude >= 90 || !latitude) {
        return false;
    }
    else if (!isFinite(longitude) || longitude <= -180 || longitude >= 180 || !longitude) {
        return false;
    }
    return true;
}
export default coordinateValidation;