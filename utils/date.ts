export const MONTHS = [
  "January", //31
  "February",
  "March", //31
  "April",
  "May", //31
  "June",
  "July", //31
  "August", //31
  "September",
  "October", //31
  "November",
  "December", //31
];
export const hasThisManyDays = (year: number, month: string) => {
  const upperMonth = month.toUpperCase();
  if (upperMonth === "FEBRUARY") {
    if (year % 4 === 0) {
      if (year % 100 === 0 && year % 400 === 0) {
        return 29;
      } else if (year % 100 === 0) {
        return 28;
      }
      return 29;
    }
    return 28;
  }
  if (
    upperMonth === "APRIL" ||
    upperMonth === "JUNE" ||
    upperMonth === "SEPTEMBER" ||
    upperMonth === "NOVEMBER"
  ) {
    return 30;
  }
  return 31;
};
