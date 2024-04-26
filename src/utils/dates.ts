export const months = [
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

export const currentYear = new Date().getFullYear();
const currentMonthIndex = new Date().getMonth();
export const currentMonth = months[currentMonthIndex];

export function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const parts = formattedDate.split(" ");
  const day = parseInt(parts[1]);
  const ordinalDay = addOrdinalSuffix(day);
  return `${parts[0]} ${ordinalDay} ${parts[2]}`;
}

function addOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return day + "th";
  switch (day % 10) {
    case 1:
      return day + "st";
    case 2:
      return day + "nd";
    case 3:
      return day + "rd";
    default:
      return day + "th";
  }
}
