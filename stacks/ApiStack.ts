import { StackContext, Api, Config } from "sst/constructs";

export function ApiStack({ stack }: StackContext) {
  const secrets = Config.Secret.create(
    stack,
    "DATABASE_URL",
    "DATABASE_AUTH_TOKEN",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
  );
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [
          secrets.DATABASE_URL,
          secrets.DATABASE_AUTH_TOKEN,
          secrets.GOOGLE_CLIENT_ID,
          secrets.GOOGLE_CLIENT_SECRET,
        ],
      },
    },
    cors: {
      allowCredentials: true,
      allowHeaders: ["content-type"],
      allowMethods: ["ANY"],
      allowOrigins: ["http://localhost:5173"],
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api };
}
