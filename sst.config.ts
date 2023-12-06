import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";
import { WebStack } from "./stacks/WebStack";
import { AuthStack } from "./stacks/AuthStack";

export default {
  config(_input) {
    return {
      name: "inventory-management-system",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.setDefaultRemovalPolicy(app.mode === "dev" ? "destroy" : "retain");
    app.stack(ApiStack).stack(WebStack).stack(AuthStack);
  },
} satisfies SSTConfig;
