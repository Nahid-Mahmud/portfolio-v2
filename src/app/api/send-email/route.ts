import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL, // Sender address
      to: process.env.SEND_TO_EMAIL, // Recipient address (your email)
      subject: `Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #4a90e2; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">New Contact Form Submission</h2>
      
      <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
      <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
      <p style="font-size: 16px;"><strong>Message:</strong></p>
      <div style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #4a90e2; font-size: 15px; line-height: 1.5; white-space: pre-line;">
        ${message}
      </div>

      <p style="margin-top: 30px; font-size: 13px; color: #888;">This message was sent via your website's contact form.</p>
    </div>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}
