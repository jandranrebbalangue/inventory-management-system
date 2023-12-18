import axios from "axios";

export const fetcher = async <T>(
  endpoint: string,
  token: string,
): Promise<T> => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};
