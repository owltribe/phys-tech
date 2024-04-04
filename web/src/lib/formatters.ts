export const formatPrice = (value: string | number) => {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₸`;
};

export const formatMinutesToHoursMinutes = (totalMinutes: number): string => {
  const hours: number = Math.floor(totalMinutes / 60);
  const minutes: number = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} ${minutes > 1 ? "минут" : "минута"}`;
  } else if (minutes === 0) {
    return `${hours} ${hours > 1 ? "часов" : "час"} `;
  } else {
    return `${hours} ${hours > 1 ? "часов" : "час"}  часов и ${minutes} ${
      minutes > 1 ? "минут" : "минута"
    } `;
  }
};
