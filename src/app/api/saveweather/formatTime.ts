export const getFormattedDateTime = () => {
  const currentDate = new Date();

  const day = currentDate.getDate(); // Get the day (1-31)
  const month = currentDate.getMonth() + 1; // Get the month (1-12)
  const year = currentDate.getFullYear(); // Get the year (4 digits)

  let hours = currentDate.getHours(); // Get the hour (0-23)
  const minutes = currentDate.getMinutes(); // Get the minutes (0-59)
  let ampm = "AM";

  if (hours >= 12) {
    ampm = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }

  // Add leading zero to minutes if it's a single digit
  const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${formattedMinutes} ${ampm}`;

  return formattedDateTime;
};
