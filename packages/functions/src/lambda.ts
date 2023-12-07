import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";

export const handler = ApiHandler(async (_evt) => {
  const session = useSession();
  if (session.type !== "user") throw new Error("Not authenticated");
  return {
    statusCode: 200,
    body: session.properties.userId,
  };
});
