export function formatDateTime(dateTimeString: Date) {
  const date = new Date(dateTimeString);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const ampm = date.getHours() >= 12 ? "pm" : "am";

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();

  const formattedDateTime = `${day} ${month} ${year}, ${hours}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
  const dateMonthYear = `${day} ${month} ${year}`;
  const hoursAndMinutes = `${hours}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
  
  return {
    dateMonthYear,
    hoursAndMinutes,
    formattedDateTime,
    day,
    month,
    year,
    hours,
    minutes,
    ampm,
  };
}
