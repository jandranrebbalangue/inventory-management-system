import { API_TOKEN } from "@/constants";

const get = async ({
  apiName,
  id,
  path = "/",
  pathSuffix = "",
  qs = {},
}: {
  apiName: string;
  id?: string;
  path?: string;
  pathSuffix?: string;
  qs?: Record<string, string>;
}) => {
  try {
    const myHeaders = new Headers();
    const token = localStorage.getItem(API_TOKEN);
    myHeaders.set("Authorization", `Bearer ${token}`);
    const queryString = Object.keys(qs)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(qs[key])}`)
      .join("&");
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT as string;
    const idSegment = id ? `/${id}` : "";
    const pathSuffixSegment = pathSuffix ? pathSuffix : "";
    const queryStringSegment = queryString ? `?${queryString}` : "";
    const response = await fetch(
      `${apiEndpoint}${path}${apiName}${idSegment}${pathSuffixSegment}${queryStringSegment}`,
      {
        headers: myHeaders,
      },
    );
    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
};
export default get;
