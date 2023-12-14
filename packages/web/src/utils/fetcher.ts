import { API_TOKEN } from "@/constants";

const token = localStorage.getItem(API_TOKEN);
export const fetcher = <T>(endpoint: string): Promise<T> =>
  fetch(`${import.meta.env.VITE_API_ENDPOINT}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
