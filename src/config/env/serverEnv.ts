import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.log("Invalid Env variables");
  console.log(parsedEnv.error);
  process.exit(1);
}

export const serverEnv = parsedEnv.data;
