export function generatePsqlDate(daysToAdd: 0 | 7 | 14 | 30 = 0) {
  const d = new Date();

  if (daysToAdd) {
    d.setDate(d.getDate() + daysToAdd);
  }

  return d.toISOString();
}
