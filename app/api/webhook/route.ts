/* eslint-disable camelcase */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import {
  createUser,
  deleteUser,
  updateUser,
} from "@/lib/actions/users-action ";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.WEBHOOK_SECRET!);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response(`Error occured , ${err}`, {
      status: 400,
    });
  }

  // Get the ID and type

  // const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, username, image_url } =
      evt.data;

    const mongoUser = await createUser({
      clerkId: id,
      name: `${first_name}${last_name ? `${last_name}` : ""}`,
      username: username!,
      email: email_addresses[0].email_address,
      picture: image_url,
    });

    return NextResponse.json({ message: "ok", user: mongoUser });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, username, image_url } =
      evt.data;

    const mongoUser = await updateUser({
      clerkId: id,
      updateData: {
        name: `${first_name}${last_name ? `${last_name}` : ""}`,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url,
      },
      path: `/profile/${id}`,
    });

    return NextResponse.json({ message: "ok", user: mongoUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const deletedUser = await deleteUser({ clerkId: id! });

    return NextResponse.json({ message: "ok", user: deletedUser });
  }

  return NextResponse.json({ message: "ok" });
}
