type TimestampOperator = "==" | ">" | ">=" | "<" | "<=";

export function comparePsqlDates(
  ts1: string,
  operator: TimestampOperator,
  ts2: string
): boolean {

  const normalize = (ts: string) => new Date(ts.replace(" ", "T")).getTime();

  const t1 = normalize(ts1);
  const t2 = normalize(ts2);

  switch (operator) {
    case "==": return t1 === t2;
    case ">": return t1 > t2;
    case ">=": return t1 >= t2;
    case "<": return t1 < t2;
    case "<=": return t1 <= t2;
  }
}