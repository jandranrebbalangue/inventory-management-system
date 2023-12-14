import { API_TOKEN } from "@/constants";

const post = async ({
  apiName,
  data,
  path = "/",
}: {
  apiName: string;
  path?: string;
  data: Record<string, string>;
}) => {
  try {
    const myHeaders = new Headers();
    myHeaders.set("Content-Type", "application/json");
    const token = localStorage.getItem(API_TOKEN);
    myHeaders.set("Authorization", `Bearer ${token}`);
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT as string;
    const response = await fetch(`${apiEndpoint}${path}${apiName}`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
};
export default post;
