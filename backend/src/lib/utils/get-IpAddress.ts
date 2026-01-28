export function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");

  console.log(xff,"From xff");
  if (xff) {
    return xff.split(",")[0]?.trim();
  }

  const xRealIp = req.headers.get("x-real-ip");
  console.log(xRealIp,"From X Real IP");
  if (xRealIp) return xRealIp.trim();

  // In pure Web Request you usually don't have socket IP; return null/fallback
  return null;
}
