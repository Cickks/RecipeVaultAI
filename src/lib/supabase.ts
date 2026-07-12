import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabaseConfig = supabaseUrl && supabaseAnonKey ? { anonKey: supabaseAnonKey, url: supabaseUrl } : null;

export const isSupabaseConfigured = Boolean(supabaseConfig);

export const supabase =
  supabaseConfig
    ? createClient(supabaseConfig.url, supabaseConfig.anonKey, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      })
    : null;
