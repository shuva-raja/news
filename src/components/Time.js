const date = (timestamp) => {
  const date = new Date(timestamp);

  // Extract the date components
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();

  // Create the formatted date string
  const formattedDate = `${day}th September ${year}`;

  return formattedDate;
};
export default date;
