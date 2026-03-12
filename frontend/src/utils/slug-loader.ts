import { envConfig } from "@/config/env-config";
import { redirect, type LoaderFunctionArgs } from "react-router-dom";

export async function slugLoader({
    params,
  }: LoaderFunctionArgs) {
    const { slug } = params;
  
    const res = await fetch(`${envConfig}/${slug}`); // 👈 adjust to your API endpoint
    
  
    if (res.status === 404) {
      throw new Response("Short URL not found", { status: 404 });
    }
  
    if (!res.ok) {
      throw new Response("Something went wrong", { status: res.status });
    }
  
    const data = await res.json(); // expects { originalUrl: "https://..." }
    console.log('calling',res)
    // Hard redirect — the browser never even renders the page
    return redirect(data.originalUrl);
  
    // ── ALTERNATIVE: soft redirect inside the component ──────────────────────
    // If you want to show a "redirecting…" screen first, comment out the line
    // above and return the data instead:
    //
    //   return data;   // { originalUrl: "https://..." }
    //
    // Then use `useLoaderData()` + `useEffect` in the component below.
  }
  