"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import type { User } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { groupT } from "sgk-commanders-shared";
import { getGroups } from "sgk-commanders-shared/dist/supabase/groups";
import { useUsers } from "./UsersContext";

export default function UserDetails() {
  const params = useParams();
  const router = useRouter();
  const { users, updateUser, deleteUser } = useUsers();
  const [groups, setGroups] = useState<groupT[]>([]);
  const id = params?.id as string;

  const user = users.find((u) => u.id === id);

  const [editing, setEditing] = React.useState(false);

  const form = useForm<Partial<User>>();

  React.useEffect(() => {
    //@ts-ignore
    user && form.reset({ ...user });
    (async () => {
      if (!user) return;
      const res = await getGroups(user.id);
      setGroups(res);
    })();
  }, [user]);

  if (!user) {
    return <div className="p-4">User not found</div>;
  }

  async function onSubmit(values: Partial<User>) {
    // normalize types from form (strings -> numbers/booleans/arrays)
    const payload: Partial<User> = {
      ...values,
      phone: values.phone ? Number(values.phone as any) : undefined,
      emergency_phone: values.emergency_phone
        ? Number(values.emergency_phone as any)
        : null,
      accepted_terms: !!values.accepted_terms,
      subcriptionExpiration: values.subcriptionExpiration
        ? new Date(values.subcriptionExpiration as any).toISOString()
        : values.subcriptionExpiration,
      deviceIds:
        typeof (values as any).deviceIds === "string"
          ? (values as any).deviceIds
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : (values as any).deviceIds,
    };

    // handle nested lat/long if provided
    const lat = (values as any)?.last_known_location?.latitude;
    const long = (values as any)?.last_known_location?.longitude;
    if (lat && long) {
      payload.last_known_location = {
        latitude: Number(lat),
        longitude: Number(long),
      };
    }

    await updateUser(id, payload);
    setEditing(false);
  }

  async function handleDelete() {
    if (!confirm("Delete this user?")) return;
    await deleteUser(id);
    router.push("/dashboard/users");
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
              <Avatar>
                {user.profile_picture ? (
                  <AvatarImage src={user.profile_picture} alt={user.name} />
                ) : (
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
            </div>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergency_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Phone</FormLabel>
                      <FormControl>
                        {
                          //@ts-ignore
                          <Input {...field} />
                        }
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="home_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
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
                        <Input {...field} />
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
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accepted_terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start gap-3">
                      <FormControl>
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="flex-1">
                        <FormLabel>Accepted Terms</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={"deviceIds" as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Devices (comma separated)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name={"last_known_location.latitude" as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location Lat</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={"last_known_location.longitude" as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location Lon</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                  <div className="font-medium">{user.id}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="font-medium">{user.phone ?? "-"}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Address</div>
                  <div className="font-medium">{user.home_address ?? "-"}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Subscription
                  </div>
                  <div className="font-medium">{user.subcription ?? "-"}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Subscription Expires
                  </div>
                  <div className="font-medium">
                    {user.subcriptionExpiration
                      ? new Date(
                          user.subcriptionExpiration
                        ).toLocaleDateString()
                      : "-"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Emergency Phone
                  </div>
                  <div className="font-medium">
                    {user.emergency_phone ?? "-"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Accepted Terms
                  </div>
                  <div className="font-medium">
                    {user.accepted_terms ? "Yes" : "No"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Devices</div>
                  <div className="font-medium">
                    {user.deviceIds && user.deviceIds.length > 0
                      ? user.deviceIds.join(", ")
                      : "-"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium">
                    {user.last_known_location ? (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${user.last_known_location.latitude},${user.last_known_location.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open in Google Maps"
                        className="text-primary underline"
                      >
                        {`${user.last_known_location.latitude}, ${user.last_known_location.longitude}`}
                      </a>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Agent</div>
                  <div className="font-medium">
                    {user.is_agent ? "Yes" : "No"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Safe</div>
                  <div className="font-medium">
                    {user.is_safe === null ? "-" : user.is_safe ? "Yes" : "No"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div className="font-medium">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleString()
                      : "-"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">
                    {user.email ? (
                      <a
                        href={`mailto:${user.email}`}
                        className="text-primary underline"
                      >
                        {user.email}
                      </a>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Profile Picture
                  </div>
                  <div className="font-medium">
                    {user.profile_picture ?? "-"}
                  </div>
                </div>
              </div>
              <h2>Groups</h2>
              <ul>
                {groups.map((item) => (
                  <li key={item.id}>
                    <Link href={"/dashboard/groups/" + item.id}>
                      <div className=" flex gap-1 items-center">
                        <p className=" underline">{item.name}</p>
                        <ArrowRight size={10} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
