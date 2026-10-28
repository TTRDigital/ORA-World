/** Confirmation email via Resend's REST API, behind EMAIL_ENABLED. No SDK, no secrets in the client. */
export async function sendConfirmationEmail({ to, name, locale }: { to: string; name: string; locale: "en" | "es" }) {
  if (process.env.EMAIL_ENABLED !== "true" || !process.env.RESEND_API_KEY) return;
  const es = locale === "es";
  const subject = es ? "Gracias por su interés en ORA World" : "Thank you for your interest in ORA World";
  const html = `
    <div style="font-family:Georgia,serif;color:#2a2825;max-width:560px;margin:0 auto;padding:40px 24px">
      <p style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#7a5c2e">ORA World · Dorado, Puerto Rico</p>
      <h1 style="font-weight:400;font-size:28px;margin:16px 0">${es ? "Gracias" : "Thank you"}, ${escapeHtml(name)}.</h1>
      <p style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6">${
        es
          ? "Hemos recibido su consulta. Un miembro del equipo de ventas de ORA World se comunicará con usted en breve para organizar una presentación privada."
          : "We have received your inquiry. A member of the ORA World sales team will be in touch shortly to arrange a private presentation."
      }</p>
      <hr style="border:0;border-top:1px solid #c9b99e;margin:32px 0">
      <p style="font-family:Helvetica,Arial,sans-serif;font-size:11px;line-height:1.6;color:#5a5650">This advertisement is not an offering. It is a solicitation of interest in the advertised property. No offering of the advertised units can be made and no deposits can be accepted, or reservations, binding or non - binding, can be made until an offering plan is filed with the New York State Department of Law. Attorney General File No.: CP25-0047. Sponsor: TRPbuildco LLC.</p>
    </div>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "ORA World <onboarding@resend.dev>",
      to: [to],
      bcc: process.env.EMAIL_BCC ? [process.env.EMAIL_BCC] : undefined,
      subject,
      html,
    }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
}

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}
