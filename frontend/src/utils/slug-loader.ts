import { envConfig } from "@/config/env-config";
import { redirect, type LoaderFunctionArgs } from "react-router-dom";

export async function slugLoader({
    params,
  }: LoaderFunctionArgs) {
    const { slug } = params;
  
    const res = await fetch(`${envConfig.BACKEND_API_URL}/find/${slug}`); // 👈 adjust to your API endpoint

    if (res.status === 404) {
      throw new Response("Short URL not found", { status: 404 });
    }
    if (!res.ok) {
      throw new Response("Something went wrong", { status: res.status });
    }
    const data = await res.json();
    return redirect(data.data);
  }
  