export const getDataDifferenceFromNow = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime(); // Fixed typo here

  difference = difference / 1000;
  let hourDifference = Math.floor(difference / 3600);
  difference -= hourDifference * 3600;
  let minuteDifference = Math.floor(difference / 60);
  difference -= minuteDifference * 60;

  let message;

  if (hourDifference > 0) {
    message = `${hourDifference} hour${hourDifference > 1 ? "s" : ""}`;
  }
  if (minuteDifference > 0) {
    message = message
      ? `${message} ${minuteDifference} minute${
          minuteDifference > 1 ? "s" : ""
        }`
      : `${minuteDifference} minute${minuteDifference > 1 ? "s" : ""}`;
  }
  if (difference > 0) {
    message = message
      ? `${message} ${Math.round(difference)} second${
          Math.round(difference) > 1 ? "s" : ""
        }`
      : `${Math.round(difference)} second${
          Math.round(difference) > 1 ? "s" : ""
        }`;
  }

  return message;
};
