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
      allowHeaders: ["*"],
      allowMethods: ["ANY"],
      allowOrigins: ["http://localhost:5173"],
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "POST /products": "packages/functions/src/product/create.handler",
      "GET /products": "packages/functions/src/product/list.handler",
      "DELETE /products/{id}": "packages/functions/src/product/delete.handler",
      "GET /products/{id}": "packages/functions/src/product/read.handler",
      "PUT /products/{id}": "packages/functions/src/product/update.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api };
}
