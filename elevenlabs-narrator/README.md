# ElevenLabs Voice Narrator Studio

A modern, fast, and feature-rich Text-to-Speech (TTS) web application built using **HTML5, CSS3, and Vanilla JavaScript**, powered by the **ElevenLabs REST API**.

---

## 🌟 Key Features

1. **Full ElevenLabs Model Selection**:
   - `eleven_multilingual_v2` (Eleven Multilingual v2 — 29 Languages, emotional nuance, ideal for audiobooks & long-form narration)
   - `eleven_flash_v2_5` (Eleven Flash v2.5 — Ultra-low latency ~75ms, 32 Languages)
   - `eleven_turbo_v2_5` (Eleven Turbo v2.5 — Quality + low latency, 32 Languages)
   - `eleven_flash_v2` (Eleven Flash v2 — ~75ms Real-time, English)
   - `eleven_turbo_v2` (Eleven Turbo v2 — Fast Conversational, English)
   - `eleven_monolingual_v1` (Eleven Monolingual v1 — Classic English)

2. **Persona & Voice Selection with Live Previews**:
   - Curated default library of top ElevenLabs voices (Rachel, Adam, Antoni, Bella, Arnold, Charlotte, Callum, Charlie, George, Josh, Serena, Daniel).
   - Instant audio preview button to audition each voice tone and accent before generating narration.
   - Real-time account voice synchronization (`GET /v1/voices`) to access your custom and cloned voices.

3. **Fine-Tuning Controls (Accordion)**:
   - Stability slider (0.0 to 1.0)
   - Clarity & Similarity Boost slider (0.0 to 1.0)
   - Style Exaggeration slider (0.0 to 1.0)
   - Speaker Boost toggle

4. **Ergonomic Text Input & Presets**:
   - Large auto-sizing textarea with word and character counters.
   - Quick one-click prompt presets (Story Narration, Keynote Speech, Mindfulness, News Broadcast).
   - "Paste Clipboard" and "Clear" utility buttons.

5. **Studio Acoustic Audio Player & Real-Time Waveform Visualizer**:
   - Live Canvas spectrum visualizer powered by the Web Audio API (`AudioContext` + `AnalyserNode`).
   - Interactive draggable seek scrubber.
   - Playback speed chips (0.8x, 1.0x, 1.25x, 1.5x).
   - Volume slider and one-click mute.
   - Direct MP3 download button with dynamic timestamps.

6. **History & Session Library**:
   - Keeps recent narration clips in local session storage with text snippet, model, voice name, and 1-click reload.

7. **API Key Security**:
   - Direct browser connection to `api.elevenlabs.io`.
   - Show/hide key toggle with local storage persistence.
   - Character quota and subscription tier telemetry badge.

---

## 🚀 How to Run

### Method 1: Direct Browser Launch
Double-click `elevenlabs-narrator/index.html` or `narrator.html` in File Explorer. It opens instantly in Google Chrome, Microsoft Edge, or Firefox.

### Method 2: Local Server via PowerShell
From the workspace root, run:
```powershell
.\server.ps1 -Port 8080
```
Then visit:
`http://localhost:8080/elevenlabs-narrator/index.html` or `http://localhost:8080/narrator.html`
