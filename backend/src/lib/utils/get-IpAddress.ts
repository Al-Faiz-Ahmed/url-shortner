/**
 * Gets the client public IP from a Fetch Request. Relies on headers:
 * - x-forwarded-for (first entry when behind a proxy)
 * - x-real-ip (set by Express middleware or reverse proxy)
 * When using Express + GraphQL Yoga, the IP is set by ip-address middleware
 * from req.ip / req.socket.remoteAddress so it's available here.
 */
export function getClientIp(req: Request): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    
    console.log(xff, "ip address from context");
    return xff.split(",")[0]?.trim() ?? null
  };
    
    const xRealIp = req.headers.get("x-real-ip");
    if (xRealIp)  {
    console.log(xRealIp, "ip address from context");
    return xRealIp.trim()
  };


  return null;
}
