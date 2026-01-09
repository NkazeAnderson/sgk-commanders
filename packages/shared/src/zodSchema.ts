import { z } from "zod";

/**
 * Pure Zod schemas that correspond to the DB schema defined in `dbSchema.ts`.
 * These are plain `z.object` schemas (no drizzle helpers) and aim to match types,
 * required/optional semantics and simple constraints (lengths, ints, UUIDs).
 */

export const subscriptionGroupEnum = z.enum(["individuals", "groups", "organisations"]);
export const paymentStatusEnum = z.enum(["pending", "failed", "success"]);

const locationSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
});

export const subscriptionsSchema = z.object({
  id: z.string().uuid(), // defaultRandom in DB
  name: z.string().min(1).max(50),
  price: z.number().int(),
  maximumSubAccounts: z.number().int(),
  is_defualt: z.boolean().nullable().optional(),
  for: subscriptionGroupEnum.nullable().optional().default("individuals"),
});
export type Subscription = z.infer<typeof subscriptionsSchema>;

export const usersSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  phone: z.number().int(),
  emergency_phone: z.number().int().nullable().optional(),
  home_address: z.string().min(1).max(225),
  accepted_terms: z.boolean(),
  last_known_location: locationSchema.nullable().optional(),
  created_at: z.string().nullable().optional(), // DB timestamp defaultNow
  is_safe: z.boolean().nullable().optional().default(true),
  is_agent: z.boolean().nullable().optional().default(false),
  profile_picture: z.string().nullable().optional(),
  deviceIds: z.array(z.string()).nullable().optional(),
  subcription: z.string().uuid().describe("references a subscribtion in the subscriptions table"),
  subcriptionExpiration: z.string().nullable().optional(), // date string
});
export type User = z.infer<typeof usersSchema>;

export const groupsSchema = z.object({
  id: z.string().uuid(),
  admin_id: z.string().uuid().describe("references a user in the users table"),
  is_organisation: z.boolean().nullable().optional().default(false),
  name: z.string().min(1),
  subcription: z.string().uuid().nullable().optional().describe("references a subscribtion in the subscriptions table"),
  subcriptionExpiration: z.string().nullable().optional(),
});
export type Group = z.infer<typeof groupsSchema>;

export const groupMembersSchema = z.object({
  id: z.string().uuid(),
  group_id: z.string().uuid().describe("references a group in the groups table"),
  member_id: z.string().uuid().nullable().optional().describe("references a user in the users table"),
  role: z.string().min(1).max(50),
  invitation_accepted: z.boolean().nullable().optional(),
  created_at: z.string().nullable().optional(),
});
export type GroupMember = z.infer<typeof groupMembersSchema>;

export const sosSchema = z.object({
  id: z.string().uuid(),
  sent_by: z.string().uuid().describe("References a user in the user table"),
  message: z.string().nullable().optional(),
  resolved: z.boolean().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  location: locationSchema,
});
export type SOS = z.infer<typeof sosSchema>;

export const sosResponseSchema = z.object({
  id: z.string().uuid(),
  sos: z.string().uuid().describe("References an alert/sos in the sos table"),
  response_by: z.string().uuid().describe("References a user in the users table"),
  description: z.string().nullable().optional(),
  images: z.array(z.string()).nullable().optional(),
  created_at: z.string().nullable().optional(),
});
export type SOSResponse = z.infer<typeof sosResponseSchema>;

export const agentDutiesSchema = z.object({
  id: z.string().uuid(),
  agent_id: z.string().uuid(),
  assigned_location: locationSchema,
  purpose: z.string().nullable().optional(),
  days: z.array(z.string()).min(1),
  start_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Invalid time format"),
  end_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Invalid time format"),
  active: z.boolean().nullable().optional().default(true),
  created_at: z.string().nullable().optional(),
});
export type AgentDuty = z.infer<typeof agentDutiesSchema>;

export const messagesSchema = z.object({
  id: z.string().uuid(),
  text: z.string().min(1),
  sentTo: z.string().uuid(),
  sentBy: z.string().uuid(),
  created_at: z.string().nullable().optional(),
});
export type Message = z.infer<typeof messagesSchema>;

export const notificationsSchema = z.object({
  id: z.string().uuid(),
  text: z.string().min(1),
  userId: z.string().uuid(),
});
export type Notification = z.infer<typeof notificationsSchema>;

export const settingsSchema = z.object({
  settings: z.record(z.union([z.string(), z.number(), z.boolean()])),
  index: z.number().int().nullable().optional().default(0),
});
export type Settings = z.infer<typeof settingsSchema>;

export const paymentsSchema = z.object({
  id: z.string().uuid(),
  subscription: z.string().uuid(),
  by: z.string().uuid(),
  amount: z.number().int(),
  phone: z.number().int().nullable().optional(),
  status: paymentStatusEnum.nullable().optional().default("pending"),
  date: z.string().nullable().optional(),
  months: z.number().int().nullable().optional().default(1),
  group: z.string().uuid().nullable().optional(),
});
export type Payment = z.infer<typeof paymentsSchema>;

