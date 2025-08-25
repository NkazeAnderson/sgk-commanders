import { z } from "zod";
import { languages, userModes } from "./constants";
import { groupMembersSchema, groupsSchema, messagesSchema, notificationsSchema, paymentsSchema, settingsSchema, sosResponseSchema, sosSchema, subscriptionsSchema, usersSchema } from "./zodSchema";

export type userModesT = typeof userModes[number]
export type locationT = {longitude:number, latitude:number}

export type userT = z.infer<typeof usersSchema>
export type groupT = z.infer<typeof groupsSchema>
export type groupMemberT = z.infer<typeof groupMembersSchema>
export type sosT =z.infer<typeof sosSchema>
export type sosResponseT =z.infer<typeof sosResponseSchema>
export type messageT =z.infer<typeof messagesSchema> & { pending?: boolean, unread?: boolean }
export type notificationT =z.infer<typeof notificationsSchema>
export type subscriptionT =z.infer<typeof subscriptionsSchema>
export type paymentT =z.infer<typeof paymentsSchema>
export type settingsT =z.infer<typeof settingsSchema>
export type languageT =typeof languages[number]
export type withoutIdT<T> = Omit<T, "id">
export type groupInvitationDataT = {phone:string, membership_id:string}