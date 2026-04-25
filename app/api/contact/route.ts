import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Kontakt <noreply@milazimmustafa.com>',
    to: 'avokat@milazimmustafa.com',
    replyTo: email,
    subject: `Mesazh i ri nga ${name}`,
    text: [
      `Emri: ${name}`,
      `Email: ${email}`,
      `Telefoni: ${phone || 'N/A'}`,
      '',
      `Mesazhi:`,
      message,
    ].join('\n'),
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
