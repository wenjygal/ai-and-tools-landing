# AI & Tools — landing page

Signup landing page for the AI & Tools WhatsApp community mailing list ("התראות על הדרכות חדשות" in Brevo).

Built from the real **AI & Tools Design System** (claude.ai/design): dark/cyan palette, Assistant + Bauhaus fonts, the robot-coffee mascot (sourced from the "AI & Tools" Canva design, page 3).

## Status

- Visual + interaction: done (head tilts toward the cursor, sips coffee when you move to the form).
- Brevo signup: **wired and tested**. The form posts directly to Brevo's public embedded-form endpoint for list 31 ("התראות על הדרכות חדשות") — no secret API key in client code. New signups go through double opt-in (Brevo's default), so a confirmation email is sent before the contact actually lands on the list.

## Run locally

Just open `index.html` in a browser, no build step.
