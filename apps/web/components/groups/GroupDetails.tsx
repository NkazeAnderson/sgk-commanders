"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { groupT as Group } from "sgk-commanders-shared";
import {
  getGroupMembers,
  groupMembersJoinedSchemaT,
} from "sgk-commanders-shared/dist/supabase/groups";
import UserCard from "../users/UserCard";
import { useGroups } from "./GroupsContext";

export default function GroupDetails() {
  const params = useParams();
  const router = useRouter();
  const { groups, updateGroup, deleteGroup } = useGroups();
  const [groupMembers, setGroupMembers] = useState<groupMembersJoinedSchemaT[]>(
    []
  );
  const id = params?.id as string;

  const group = groups.find((g) => g.id === id);

  const [editing, setEditing] = React.useState(false);

  const form = useForm<Partial<Group>>();

  React.useEffect(() => {
    group && form.reset({ ...group });
    (async () => {
      if (!group) return;
      const members = await getGroupMembers(group.id);
      setGroupMembers(members);
    })();
  }, [group]);

  if (!group) return <div className="p-4">Group not found</div>;

  async function onSubmit(values: Partial<Group>) {
    const payload: Partial<Group> = {
      ...values,
      is_organisation: !!values.is_organisation,
      subcriptionExpiration: values.subcriptionExpiration
        ? new Date(values.subcriptionExpiration).toISOString()
        : values.subcriptionExpiration,
    };

    await updateGroup(id, payload);
    setEditing(false);
  }

  async function handleDelete() {
    if (!confirm("Delete this group?")) return;
    await deleteGroup(id);
    router.push("/dashboard/groups");
  }

  return (
    <div className="p-4 max-w-3xl h-full overflow-y-scroll">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div
              className=" font-semibold"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeft />
            </div>

            <div>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>
                {group.is_organisation ? "Organisation" : "Group"}
              </CardDescription>
            </div>

            <div className="ml-auto flex gap-2">
              <Button variant="ghost" onClick={() => setEditing((e) => !e)}>
                {editing ? "Cancel" : "Edit"}
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {editing ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="admin_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subcription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription</FormLabel>
                      <FormControl>
                        {
                          
                          <Input  {...field} value={field.value?.toString()} />
                        }
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subcriptionExpiration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Expires</FormLabel>
                      <FormControl>
                        {
                          
                          <Input type="date" {...field} value={field.value?.toString()} />
                        }
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_organisation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start gap-3">
                      <FormControl>
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="flex-1">
                        <FormLabel>Is Organisation</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 mt-2">
                  <Button type="submit">Save</Button>
                  <Button variant="ghost" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">ID</div>
                  <div className="font-medium">{group.id}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Admin ID</div>
                  <div className="font-medium">{group.admin_id ?? "-"}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Subscription
                  </div>
                  <div className="font-medium">{group.subcription ?? "-"}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Subscription Expires
                  </div>
                  <div className="font-medium">
                    {group.subcriptionExpiration
                      ? new Date(
                          group.subcriptionExpiration
                        ).toLocaleDateString()
                      : "-"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Is Organisation
                  </div>
                  <div className="font-medium">
                    {group.is_organisation ? "Yes" : "No"}
                  </div>
                </div>

                {/* <div>
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div className="font-medium">
                    {group.created_at
                      ? new Date(group.created_at).toLocaleString()
                      : "-"}
                  </div>
                </div> */}

                <div>
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-medium">{group.name}</div>
                </div>
              </div>
              <h2>Group Members</h2>
              {groupMembers.map((item) => {
                return item.member_id ? (
                  <Link href={"/dashboard/users/" + item.member_id.id}>
                    <div className=" p-4 border-y border-blue-300 flex gap-3 items-center">
                      <UserCard user={item.member_id} />
                      <p>{item.role}</p>
                      <p>{item.member_id.is_safe ? "Safe" : "Not safe"}</p>
                    </div>
                  </Link>
                ) : null;
              })}
            </div>
          )}
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
