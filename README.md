# ÖSD A1 Simulator

> AI-powered practice platform for the ÖSD A1 Zertifikat (Austrian German A1 exam) — Sprechen (picture description, role-play conversation) and Schreiben (email reply), graded by Gemini.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-AI-4285F4?logo=google&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-deployed-222222?logo=github&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

## Screenshots

![ÖSD A1 Simulator - Sprechen Aufgabe 2](docs/screenshots/sprechen_interface.png)
![ÖSD A1 Simulator - Inline Corrections and Idealversion](docs/screenshots/sprechen_interface_inline.png)
![ÖSD A1 Simulator - Detailed Feedback](docs/screenshots/sprechen_interface_grade.png)

## About

The [ÖSD A1 Zertifikat](https://www.osd.at/) is the entry-level German language certificate issued by the Österreichisches Sprachdiplom Deutsch. This simulator currently covers three of its tasks:

- **Sprechen Aufgabe 2 — "Ein Bild beschreiben"**: describe an everyday-scene picture in German.
- **Sprechen Aufgabe 3 — "Miteinander sprechen"**: a live role-play conversation, based on a picture, with an AI conversation partner (shopkeeper, neighbor, colleague, etc.).
- **Schreiben Aufgabe 2 — "Nachricht/E-Mail beantworten"**: reply in German to a short informal email containing embedded questions.

All three are graded against ÖSD A1-appropriate criteria, with inline corrections and an A1-level-capped "Idealversion" showing what to improve.

This project is a sibling of [ielts-simulator](https://github.com/raulito1500/ielts-simulator), reusing the same architecture — a client-only React SPA that calls the Gemini API directly from the browser to generate practice material and grade responses — adapted for the ÖSD A1 exam. The entire UI and exam content are in **German**; this README is in English to stay consistent with the sibling project and standard OSS convention.

## Live Demo

🔗 **[Try it live](https://raulito1500.github.io/osd-a1-simulator)**

## Modules

| Section | Status |
|---------|--------|
| Sprechen — Aufgabe 2 (Bildbeschreibung) | ✅ Live |
| Sprechen — Aufgabe 3 (Miteinander sprechen) | ✅ Live |
| Schreiben — Aufgabe 2 (Nachricht beantworten) | ✅ Live |
| Sprechen — Aufgabe 1 | 🚧 In development |
| Schreiben — Aufgabe 1 | 🚧 In development |
| Lesen | 🚧 In development |
| Hören | 🚧 In development |

## Features

**Sprechen — Aufgabe 2 (Bildbeschreibung)**
- A wide catalog of everyday-scene prompts (shops, restaurants, workshops, pharmacies, barbecues, hiking, family life at home, the office, moving house), each rendered as a fresh image via **Gemini 2.5 Flash Image**, or picked from a set of locally cached images to save quota
- Free-text German description, side by side with the picture — no timer, no audio, keeping the MVP focused on reading a scene and writing about it
- Grading knows this is a *spoken* task simulated as text: typos/spelling slips that would be imperceptible aloud (e.g. a doubled letter) are corrected but never lower the score

**Sprechen — Aufgabe 3 (Miteinander sprechen)**
- A live, multi-turn role-play conversation: Gemini plays the counterpart (Verkäuferin, Nachbar/in, Kollege/in, …) from a catalog of everyday negotiation scenarios, in character, in simple spoken A1 German
- The candidate replies turn by turn (chat interface) to achieve stated goals (e.g. ask for a different size, agree on a time), then ends the conversation to get graded
- The graded transcript shows both sides of the conversation, but only the candidate's own lines carry corrections/suggestions

**Schreiben — Aufgabe 2 (Nachricht beantworten)**
- A short informal email with 2-3 embedded questions, either AI-generated or picked from a catalog of cached messages
- Reply in German in ~30 words, answering all questions and closing with a greeting — with a live word counter against that target

**All three tasks share the same grading approach:**
- AI grading across 3 ÖSD A1-appropriate criteria — **Gemini 2.5 Flash** — Aufgabenerfüllung (task fulfillment), Wortschatz (vocabulary), Grammatik (grammar)
- Handwritten-style inline corrections (red/violet) in the graded text
- A green "Idealversion" showing what to add for a perfect score — strictly capped at A1 vocabulary/grammar, so it never suggests anything beyond what the exam expects
- Score out of 15 with a detailed, per-criterion feedback panel

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 |
| Styling | Tailwind CSS 3 |
| AI Grading & Conversation | Google Gemini 2.5 Flash |
| Image Generation | Google Gemini 2.5 Flash Image |
| Deployment | GitHub Pages |

## Getting Started

```bash
git clone https://github.com/raulito1500/osd-a1-simulator.git
cd osd-a1-simulator
npm install
cp .env.example .env   # then add your API key
npm start
```

## API Keys

This app requires a **Google AI Studio** API key for grading and image generation.

1. Go to [Google AI Studio](https://aistudio.google.com/) and create an API key.
2. Add it to your `.env` file:

```
REACT_APP_GEMINI_API_KEY=your_key_here
```

> **Free tier note:** Grading and role-play conversation (`gemini-2.5-flash`, text-only) work reliably on the free tier. Image generation (`gemini-2.5-flash-image`) has occasionally required linking a billing account to the underlying Google Cloud project even to get free-tier quota — if you hit a `429 RESOURCE_EXHAUSTED` error with `limit: 0`, check [Google Cloud Console → Billing](https://console.cloud.google.com/billing) for the project behind your API key. This is exactly why the app also offers a "use a cached image/message" option everywhere — it works with zero API calls.

> **Note on the public demo:** GitHub Pages is static hosting, and Create React App bakes any `REACT_APP_*` variable into the public JS bundle it ships. To avoid leaking a real key, the live demo is built **without** one — AI features are local-only by design. Clone the repo and add your own free key to use them.

## How It Works

### Sprechen Aufgabe 2 — Bildbeschreibung

1. Click **Mit KI generieren** for a fresh AI-generated picture, or **Vorgeladenes Bild verwenden** to instantly reuse one of the locally cached images (no API call, saves quota).
2. Describe the picture in German in the text panel on the right: who's in it, what they're doing, where it is.
3. Click **Bewerten** — Gemini grades your description across 3 criteria and returns a score out of 15.
4. Click the score card to open detailed, per-criterion feedback with an inline-corrected version of your text, plus a green "Idealversion" showing what to add for a perfect score.
5. Click **Zurücksetzen** to try a new picture.

### Sprechen Aufgabe 3 — Miteinander sprechen

1. Click **Mit KI generieren** or **Vorgeladenes Bild verwenden** to get a role-play scenario and picture (e.g. a clothing shop, a house move).
2. Read your role, your conversation partner's role, and the goals you need to achieve.
3. Reply to your partner's opening line in German; they respond in character, turn by turn.
4. Once you've covered your goals, click **Bewerten** to end the conversation and grade it.
5. Review the full transcript with your lines corrected/improved — your partner's lines stay untouched.

### Schreiben Aufgabe 2 — Nachricht beantworten

1. Click **Mit KI generieren** or **Vorgeladene Nachricht verwenden** to get a short informal email with embedded questions.
2. Write your reply in German in the panel on the right — answer all the questions and close with a greeting. A live word counter tracks your progress toward ~30 words.
3. Click **Bewerten** — Gemini grades your reply across the same 3 criteria.
4. Review the corrected and "ideal" versions of your reply, same as above.

## License

MIT — see [LICENSE](LICENSE).
