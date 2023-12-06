import { StackContext, StaticSite, use } from "sst/constructs";
import { ApiStack } from "./ApiStack";

export function WebStack({ stack }: StackContext) {
  const api = use(ApiStack);
  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "pnpm run build",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  });
  stack.addOutputs({
    Web: web.url,
  });
}
