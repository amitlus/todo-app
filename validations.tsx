export const isDateNotEarlierThanToday = (selectedDate: Date) => {
  const today = new Date();
  //Handle time zone differences or precision in comparing dates with times
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};
