import { isAfter, startOfDay, parse } from "date-fns";

const isDateInFuture = (dateString: string): boolean => {
  // Parse the date string (format: DD/MM/YYYY)
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  //   // Get current date without time component
  const today = startOfDay(new Date());
  //   // Compare dates
  return isAfter(parsedDate, today);
};

export { isDateInFuture };
