export * as groups from "./groups.js"
export * as messages from "./messages.js"
export * as payments from "./payments.js"
export * as realtime from "./realtime.js"
export * as settings from "./settings.js"
export * as sos from "./sos.js"
export * as subscriptions from "./subscriptions.js"
export * as users from "./users.js"

// Export the raw client and setup helper so callers can initialize the public client in browser runtime
export { setUpSupabase, supabase } from "./instance.js"

