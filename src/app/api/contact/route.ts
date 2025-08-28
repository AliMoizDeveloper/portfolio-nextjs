// src/app/api/contact/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_4s4ZXKv2_C3TtSe5e5p77TVj3RHpj6jtG");

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Resend <onboarding@resend.dev>", // replace with verified sender
      to: ["alimoiz1510@gmail.com"], // your email
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${email}\n${message}`,
    });
    console.log("Email sent successfully",process.env.EMAIL_TO!,"Api called",process.env.RESEND_API_KEY);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}