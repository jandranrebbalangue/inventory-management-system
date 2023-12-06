import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "../schema/users";
import { db } from "../access";

const insertUserSchema = createInsertSchema(users);
const findUserByIdSchema = z
  .union([z.string(), z.number()])
  .pipe(z.coerce.number());
const findUserByEmailSchema = z.string();
export const findUserById = z
  .function()
  .args(findUserByIdSchema)
  .implement(async (userId) => {
    await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
    });
  });

export const findUserByEmail = z
  .function()
  .args(findUserByEmailSchema)
  .implement(async (userEmail) => {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, userEmail),
    });
    return user;
  });

export const createUser = z
  .function()
  .args(insertUserSchema)
  .implement(async (newUser) => {
    const user = await db
      .insert(users)
      .values(newUser)
      .returning({ id: users.id });
    return user[0].id;
  });
