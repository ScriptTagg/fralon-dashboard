import { clientConfig } from "@/config/client";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./database.types";

const supabaseUrl = clientConfig.api.supabaseUrl;
const supabaseKey = clientConfig.api.supabaseKey;

export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseKey);
