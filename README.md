# AI & Tools — landing page

Signup landing page for the AI & Tools WhatsApp community mailing list ("התראות על הדרכות חדשות" in Brevo).

Built from the real **AI & Tools Design System** (claude.ai/design): dark/cyan palette, Assistant + Bauhaus fonts, the robot-coffee mascot (sourced from the "AI & Tools" Canva design, page 3).

## Status

- Visual + interaction: done (head tilts toward the cursor, sips coffee when you move to the form).
- Brevo signup: **not wired yet**. See the `TODO` in `script.js` — needs either a Brevo embedded form (Brevo dashboard > Forms) or a small serverless function holding the API key, since the secret key can't live in client-side code.

## Run locally

Just open `index.html` in a browser, no build step.
