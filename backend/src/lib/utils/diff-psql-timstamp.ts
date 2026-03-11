type TimestampOperator = "==" | ">" | ">=" | "<" | "<=";

export function comparePostgresTimestamps(
  ts1: string,
  operator: TimestampOperator,
  ts2: string
): boolean {

  const d1 = new Date(ts1.replace(" ", "T"));
  const d2 = new Date(ts2.replace(" ", "T"));

  const t1 = d1.getTime();
  const t2 = d2.getTime();

  switch (operator) {
    case "==":
      return t1 === t2;
    case ">":
      return t1 > t2;
    case ">=":
      return t1 >= t2;
    case "<":
      return t1 < t2;
    case "<=":
      return t1 <= t2;
    default:
      throw new Error("Invalid operator");
  }
}