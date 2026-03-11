export function generatePostgresTimestamp(daysToAdd = 0) {
  const d = new Date();

  // add days if provided
  if (daysToAdd) {
    d.setDate(d.getDate() + daysToAdd);
  }

  const pad = (n = 0, z = 2) => ("00" + n).slice(-z);

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds()) +
    "." +
    pad(d.getMilliseconds(), 3)
  );
}


