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

export const unformatPhoneNumber = (formatted: string): string => {
    // Check if the input is valid
    if (!formatted ||!formatted.startsWith("+7") || formatted.length > 18) {
        throw new Error("Invalid phone number format");
    }

    // Extract the numeric part of the formatted number
    const numericPart = formatted.replace(/\D/g, ''); // Remove non-digit characters

    // Ensure the numeric part has the correct length
    if (numericPart.length!== 11) {
        throw new Error("Invalid phone number format");
    }

    // Return the unformatted number
    return numericPart;
}

export const formatPhoneNumber = (unformatted: string) => {
    // Check if the input is valid
    if (!unformatted || unformatted.length!== 11) {
        throw new Error("Invalid phone number format");
    }

    // Convert the unformatted number to the desired format
    const formatted = `+7 (${unformatted.slice(1, 4)}) ${unformatted.slice(4, 7)}-${unformatted.slice(7, 9)}-${unformatted.slice(9, 11)}`;
    return formatted;
}