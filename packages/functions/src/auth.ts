import {
  AuthHandler,
  GoogleAdapter,
  LinkAdapter,
  Session,
} from "sst/node/auth";
import { Config } from "sst/node/config";
import { StaticSite } from "sst/node/site";
import {
  createUser,
  findUserByEmail,
} from "@inventory-management-system/core/db/entities/user";

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userId: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: Config.GOOGLE_CLIENT_ID,
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();
        const redirect = process.env.IS_LOCAL
          ? "http://localhost:5173/oauth/google"
          : StaticSite.web.url;
        const name = claims.name as string;
        const user = await findUserByEmail(claims.email as string);
        if (!user) {
          const userId = await createUser({
            name,
            email: claims.email as string,
            avatar_url: claims.picture as string,
          });
          return Session.parameter({
            redirect,
            type: "user",
            properties: {
              userId: userId.toString(),
            },
          });
        }

        return Session.parameter({
          redirect,
          type: "user",
          properties: {
            userId: user.id.toString(),
          },
        });
      },
    }),
    link: LinkAdapter({
      onLink: async (link) => {
        return {
          statusCode: 200,
          body: link,
        };
      },
      onSuccess: async (claims) => {
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(claims),
        };
      },
      onError: async () => {
        return {
          statusCode: 500,
        };
      },
    }),
  },
});
