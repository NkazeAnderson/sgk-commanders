ALTER TABLE "group_members" DROP CONSTRAINT "group_members_member_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "groups" DROP CONSTRAINT "groups_admin_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "groups" DROP CONSTRAINT "groups_subcription_subscriptions_id_fk";
--> statement-breakpoint
ALTER TABLE "sos_responses" DROP CONSTRAINT "sos_responses_sos_sos_id_fk";
--> statement-breakpoint
ALTER TABLE "sos" DROP CONSTRAINT "sos_sent_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_member_id_users_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_subcription_subscriptions_id_fk" FOREIGN KEY ("subcription") REFERENCES "public"."subscriptions"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sos_responses" ADD CONSTRAINT "sos_responses_sos_sos_id_fk" FOREIGN KEY ("sos") REFERENCES "public"."sos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sos" ADD CONSTRAINT "sos_sent_by_users_id_fk" FOREIGN KEY ("sent_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;