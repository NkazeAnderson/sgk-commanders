export const notificationTypes ={
    "IVA": "Invitation accepted",
    "PS": "payment status",
    "AR": "agent response",
    "GMR": "group member rescued"
    } as const


export const tables = {users:"users", groups:"groups", "group_members":"group_members", "sos":"sos","sos_responses":"sos_responses", "agent_duty":"agent_duty", group_member_invites:"group_member_invites", messages:"messages", notifications:"notifications", subscriptions:"subscriptions", payments:"payments", settings:"settings"  } as const

export const userModes = ["Individual", "Agent", "Organisation"] as const

export const userRoles = ["general", "agent", "admin", "staff"] as const


export const languages = ["en", "fr"] as const