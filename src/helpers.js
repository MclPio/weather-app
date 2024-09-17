function iconURL(icon) {
  const url = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/4th%20Set%20-%20Monochrome/${icon}.svg`;
  return url;
}

function getFormattedHour(datetime) {
  const res = Number(datetime.slice(0, 2)) + 1 + new Date().getHours();
  let hour;
  if (res > 24) {
    hour = res - 24;
  } else {
    hour = res;
  }
  hour = String(hour);

  if (hour.length < 2) {
    hour = "0".concat(hour);
  }

  const formattedTime = new Date(`2000-01-01T${hour}:00:00`).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      hour12: true,
    }
  );
  return formattedTime;
}

export { iconURL, getFormattedHour };
