import { isAfter, startOfDay, parse, isBefore, isEqual } from "date-fns";

const isDateInFuture = (dateString: string): boolean => {
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  const today = startOfDay(new Date());
  return isAfter(parsedDate, today);
};

const isDateInPast = (dateString: string): boolean => {
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  const today = startOfDay(new Date());

  console.log(parsedDate, today);
  return isBefore(parsedDate, today) || isEqual(parsedDate, today);
};

export { isDateInFuture, isDateInPast };
