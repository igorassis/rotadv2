export const formatDistance = (meters) => {
    const km = meters/1000;
    return km.toFixed(2);
};

function pad(num) {
    return ("0"+num).slice(-2);
}

export const formatTime = (secs) => {
  var minutes = Math.floor(secs / 60);
  secs = secs%60;
  var hours = Math.floor(minutes/60)
  minutes = minutes%60;
  return `${pad(hours)}:${pad(minutes)}`;
}