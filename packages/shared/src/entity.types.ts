import type { Database } from "./database.types.js";

export type User = Database["public"]["Tables"]["users"]["Row"];
