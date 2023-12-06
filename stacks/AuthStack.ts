import { StackContext, use, Auth } from "sst/constructs";
import { ApiStack } from "./ApiStack";
import { WebStack } from "./WebStack";

export function AuthStack({ stack }: StackContext) {
  const { api } = use(ApiStack);
  const { web } = use(WebStack);

  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth.handler",
      bind: [web],
    },
  });
  auth.attach(stack, {
    api,
    prefix: "/auth",
  });
  return { auth };
}
