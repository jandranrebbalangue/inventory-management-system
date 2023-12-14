import axios from "axios";
import { API_TOKEN } from "@/constants";

const token = localStorage.getItem(API_TOKEN);
export const fetcher = <T>(endpoint: string): Promise<T> =>
  axios
    .get(`${import.meta.env.VITE_API_ENDPOINT}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
