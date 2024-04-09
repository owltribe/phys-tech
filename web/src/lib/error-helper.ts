import { ErrorModel } from "@/types/generated";

const formatObjectToString = (obj: Record<string, string | number>): string => {
  return Object.entries(obj).reduce((result, [key, value], index, array) => {
    const formattedPair = `${key}: ${value}`;
    result += formattedPair;

    // Add a comma and space if it's not the last key-value pair
    if (index < array.length - 1) {
      result += ", ";
    }

    return result;
  }, "");
};

export const getFormattedError = (
  errorDetail: ErrorModel["detail"]
): string => {
  if (
    typeof errorDetail === "object" &&
    !Array.isArray(errorDetail) &&
    errorDetail !== null
  ) {
    formatObjectToString(errorDetail);
  }

  return String(errorDetail);
};
