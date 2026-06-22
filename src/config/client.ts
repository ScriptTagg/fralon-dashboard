import { clientEnv } from "./env/clientEnv";

export const clientConfig = {
  app: {
    env: clientEnv.NODE_ENV,
    siteUrl: clientEnv.NEXT_PUBLIC_SITE_URL,
  },
  api: {
    supabaseUrl: clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: clientEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  },
};
