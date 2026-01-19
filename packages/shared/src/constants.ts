export const primaryColors = {
  '--color-primary-0': '#dbe6fe',
  '--color-primary-50': '#b9cdfc',
  '--color-primary-100': '#97b4f8',
  '--color-primary-200': '#769af3',
  '--color-primary-300': '#567fee',
  '--color-primary-400': '#567fee',
  '--color-primary-500': '#567fee',
  '--color-primary-600': '#3862e7',
  '--color-primary-700': '#2a4bb5',
  '--color-primary-800': '#1c3586',
  '--color-primary-900': '#0f2159',
  '--color-primary-950': '#050e30',
} as const

export const defaultGradient = [ primaryColors["--color-primary-900"], primaryColors["--color-primary-800"]] as const


export const userModes = ["Individual", "Agent", "Organisation"] as const

export const userRoles = ["general", "agent", "admin", "staff"] as const

export const tables = {users:"users", groups:"groups", "group_members":"group_members", "sos":"sos","sos_responses":"sos_responses", "agent_duty":"agent_duty", group_member_invites:"group_member_invites", messages:"messages", notifications:"notifications", subscriptions:"subscriptions", payments:"payments", settings:"settings"  } as const

export const days = ["monday", "tuesday", "wednesday", "thursday", "saturday", "sunday"] as const

export const storageBuckets = {public: "public-media"} as const

export const taraPaymentApps = [ "whatsappLink", "telegramLink", "dikaloLink" ] as const

export const languages = ["en", "fr"] as const

export const commonAsyncKey = {
    groupInvitation:"groupInvitation"
  } as const

export const mockLocationBonaberi = { latitude: 4.086168, longitude: 9.656306,     altitude: null,
            accuracy: 5,
            heading: 0,
            speed: 0,
            altitudeAccuracy: null, } as const
            
export const mockLocationYassa = { latitude: 3.994943, longitude: 9.784966, altitude: null,
            accuracy: 5,
            heading: 0,
            speed: 0,
            altitudeAccuracy: null, } as const