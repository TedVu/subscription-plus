import { isAfter, startOfDay, parse } from "date-fns";

const isDateInFuture = (dateString: string): boolean => {
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  const today = startOfDay(new Date());
  return isAfter(parsedDate, today);
};

export { isDateInFuture };
