export const formatDateToString = (unformatedDate) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(unformatedDate);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};
