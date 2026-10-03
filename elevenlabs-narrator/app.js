/**
 * ElevenLabs Voice Narrator Studio — Application Core
 * Connects directly to ElevenLabs Text-to-Speech REST API.
 * Integrated with the official ElevenLabs JavaScript SDK interface:
 * import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
 */

import { ElevenLabsClient as SDKClient, play as sdkPlay } from '@elevenlabs/elevenlabs-js';

// Resolve SDK client and play() with universal support across ES Modules & browsers
const ElevenLabsClient = SDKClient || (typeof window !== "undefined" && window.ElevenLabsClient);
const play = sdkPlay || (typeof window !== "undefined" && window.play);

// ==========================================
// 1. Curated Data: Models & Default Voices
// ==========================================

const DEFAULT_MODELS = [
  {
    id: "eleven_multilingual_v2",
    name: "Eleven Multilingual v2",
    tag: "Recommended",
    badge: "29 Languages • High Emotional Depth • Best for Narration & Audiobooks",
    description: "State-of-the-art model with rich emotional nuance, ideal for voiceovers, fiction, and character performance across 29 languages."
  },
  {
    id: "eleven_flash_v2_5",
    name: "Eleven Flash v2.5",
    tag: "Ultra-Fast",
    badge: "~75ms Latency • 32 Languages • Super Fast Real-Time",
    description: "Next-gen ultra-fast latency model optimized for interactive voice response and real-time generation across 32 languages."
  },
  {
    id: "eleven_turbo_v2_5",
    name: "Eleven Turbo v2.5",
    tag: "Low Latency",
    badge: "High Quality • Low Latency • 32 Languages",
    description: "Balances exceptional audio quality with low latency across 32 languages."
  },
  {
    id: "eleven_flash_v2",
    name: "Eleven Flash v2",
    tag: "Fast English",
    badge: "~75ms Latency • English Only",
    description: "Ultra-low latency model tailored for English voice generation."
  },
  {
    id: "eleven_turbo_v2",
    name: "Eleven Turbo v2",
    tag: "Fast English",
    badge: "Quality + Speed • English",
    description: "Fast English-optimized model for conversational audio and quick responses."
  },
  {
    id: "eleven_monolingual_v1",
    name: "Eleven Monolingual v1",
    tag: "Classic",
    badge: "Classic English • Standard Quality",
    description: "The original ElevenLabs English model with classic clarity."
  }
];

const DEFAULT_VOICES = [
  {
    id: "21m00Tcm4TlvDq8ikWAM",
    name: "Rachel",
    category: "premade",
    labels: { accent: "American", style: "Calm", use_case: "Narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/21m00Tcm4TlvDq8ikWAM/df6788f9-1965-4d70-b374-eb36801bf339.mp3"
  },
  {
    id: "pNInz6obpgDQGcFmaJgB",
    name: "Adam",
    category: "premade",
    labels: { accent: "American", style: "Deep", use_case: "Narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/pNInz6obpgDQGcFmaJgB/6734d750-3fd5-43ee-9d60-547a40fb6945.mp3"
  },
  {
    id: "ErXwobaYiN019PkySvjV",
    name: "Antoni",
    category: "premade",
    labels: { accent: "American", style: "Warm", use_case: "Storytelling" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/ErXwobaYiN019PkySvjV/38d86f3b-7aa8-4a30-8451-24446549a1da.mp3"
  },
  {
    id: "EXAVITQu4vr4xnSDxMaL",
    name: "Bella",
    category: "premade",
    labels: { accent: "American", style: "Soft", use_case: "Audiobooks" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/EXAVITQu4vr4xnSDxMaL/046554e9-fffe-4bb4-9669-052a65d64fe3.mp3"
  },
  {
    id: "VR6AewLTigWG4xSOukaG",
    name: "Arnold",
    category: "premade",
    labels: { accent: "American", style: "Crisp", use_case: "Narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/VR6AewLTigWG4xSOukaG/66e83ae2-1aa2-4f59-994e-9a101f3088b9.mp3"
  },
  {
    id: "XB0fDUnXU5powFXDhCwa",
    name: "Charlotte",
    category: "premade",
    labels: { accent: "Swedish/English", style: "Seductive", use_case: "Characters" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/XB0fDUnXU5powFXDhCwa/942356dc-f10d-4d26-b999-5e827e8020fe.mp3"
  },
  {
    id: "N2lVS1w4EtoT3dr4eOWO",
    name: "Callum",
    category: "premade",
    labels: { accent: "Transatlantic", style: "Intense", use_case: "Characters" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/N2lVS1w4EtoT3dr4eOWO/28545831-2947-4e05-9309-8809ff048ad6.mp3"
  },
  {
    id: "IKne3meq5aSn9XLyUdCD",
    name: "Charlie",
    category: "premade",
    labels: { accent: "Australian", style: "Casual", use_case: "Conversational" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/IKne3meq5aSn9XLyUdCD/102de6f2-22ed-410a-93f0-466d5bfcf479.mp3"
  },
  {
    id: "JBFqnCBsd6RMkjVDRZzb",
    name: "George",
    category: "premade",
    labels: { accent: "British", style: "Warm", use_case: "Storyteller" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/JBFqnCBsd6RMkjVDRZzb/e6206d1a-0721-47bc-8025-62076ed5395b.mp3"
  },
  {
    id: "TxGEqnHWrfWFTfGW9XjX",
    name: "Josh",
    category: "premade",
    labels: { accent: "American", style: "Deep", use_case: "Narrator" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/TxGEqnHWrfWFTfGW9XjX/33948da6-ec47-4950-8b63-fa15e9858ec4.mp3"
  },
  {
    id: "pMsXgVXv3BLzUgSXRplE",
    name: "Serena",
    category: "premade",
    labels: { accent: "American", style: "Pleasant", use_case: "Narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/pMsXgVXv3BLzUgSXRplE/37841578-1a52-4467-8975-f09c62375841.mp3"
  },
  {
    id: "onwK4e9ZLuTAKqWW03F9",
    name: "Daniel",
    category: "premade",
    labels: { accent: "British", style: "Authoritative", use_case: "Broadcast" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/onwK4e9ZLuTAKqWW03F9/79ced891-b660-4965-9856-78720194a3ab.mp3"
  }
];

const SAMPLE_PRESETS = {
  firstMove: "The first move is what sets everything in motion.",
  fantasy: "Beyond the Whispering Ridge, the ancient clocktower tolled seven times. No gears turned within its rusted spire, yet each brass resonance echoed across the misty valley, stirring memories of an empire long forgotten.",
  tech: "Welcome to the next generation of generative AI audio. With neural voice synthesis, we can now sculpt emotion, cadence, and nuance in real time—delivering studio-grade narration directly from raw text.",
  meditation: "Take a slow, deep breath in... and gently let it go. Feel the weight lift from your shoulders. As the quiet settles in, allow your mind to find stillness in this present moment.",
  news: "Breaking developments today in artificial intelligence research: engineers have unveiled novel neural architecture achieving sub-100 millisecond voice generation while preserving studio acoustic fidelity."
};

// ==========================================
// 2. State Management
// ==========================================

const state = {
  apiKey: localStorage.getItem("elevenlabs_api_key") || "",
  selectedModel: "eleven_multilingual_v2",
  selectedVoice: "JBFqnCBsd6RMkjVDRZzb", // George (British Storyteller) matching official example
  voicesList: [...DEFAULT_VOICES],
  modelsList: [...DEFAULT_MODELS],
  voiceSettings: {
    stability: 0.50,
    similarity_boost: 0.75,
    style: 0.00,
    use_speaker_boost: true
  },
  isGenerating: false,
  isPlaying: false,
  currentAudioUrl: null,
  currentAudioBlob: null,
  playbackSpeed: 1.0,
  history: JSON.parse(localStorage.getItem("elevenlabs_history") || "[]")
};

// Audio & Visualizer components
let audioElement = new Audio();
let audioContext = null;
let analyserNode = null;
let audioSourceNode = null;
let previewAudioElement = new Audio();
let animationFrameId = null;

// ==========================================
// 3. DOM Elements Cache
// ==========================================

const elements = {
  // Header & API
  apiStatusPill: document.getElementById("apiStatusPill"),
  statusDot: document.getElementById("statusDot"),
  statusText: document.getElementById("statusText"),
  apiDrawer: document.getElementById("apiDrawer"),
  closeDrawerBtn: document.getElementById("closeDrawerBtn"),
  apiKeyInput: document.getElementById("apiKeyInput"),
  toggleKeyVisibilityBtn: document.getElementById("toggleKeyVisibilityBtn"),
  saveApiKeyBtn: document.getElementById("saveApiKeyBtn"),
  testKeyBtn: document.getElementById("testKeyBtn"),
  clearKeyBtn: document.getElementById("clearKeyBtn"),
  keyQuotaBadge: document.getElementById("keyQuotaBadge"),

  // Model & Voice
  modelSelect: document.getElementById("modelSelect"),
  modelMetaBadge: document.getElementById("modelMetaBadge"),
  modelDescription: document.getElementById("modelDescription"),
  voiceSelect: document.getElementById("voiceSelect"),
  previewVoiceBtn: document.getElementById("previewVoiceBtn"),
  refreshVoicesBtn: document.getElementById("refreshVoicesBtn"),

  // Voice Tuning
  tuningToggleBtn: document.getElementById("tuningToggleBtn"),
  tuningDrawer: document.getElementById("tuningDrawer"),
  stabilitySlider: document.getElementById("stabilitySlider"),
  stabilityVal: document.getElementById("stabilityVal"),
  similaritySlider: document.getElementById("similaritySlider"),
  similarityVal: document.getElementById("similarityVal"),
  styleSlider: document.getElementById("styleSlider"),
  styleVal: document.getElementById("styleVal"),
  speakerBoostCheckbox: document.getElementById("speakerBoostCheckbox"),
  resetTuningBtn: document.getElementById("resetTuningBtn"),

  // Text Input
  textInput: document.getElementById("textInput"),
  charCount: document.getElementById("charCount"),
  wordCount: document.getElementById("wordCount"),
  clearTextBtn: document.getElementById("clearTextBtn"),
  pasteTextBtn: document.getElementById("pasteTextBtn"),

  // Actions
  playNarrationBtn: document.getElementById("playNarrationBtn"),
  btnText: document.getElementById("btnText"),
  downloadBtn: document.getElementById("downloadBtn"),

  // Audio Player & Visualizer
  playerCard: document.getElementById("playerCard"),
  waveformCanvas: document.getElementById("waveformCanvas"),
  waveformPlaceholder: document.getElementById("waveformPlaceholder"),
  timelineProgressBar: document.getElementById("timelineProgressBar"),
  timelineFilled: document.getElementById("timelineFilled"),
  currentTimeDisplay: document.getElementById("currentTimeDisplay"),
  totalDurationDisplay: document.getElementById("totalDurationDisplay"),
  playerPlayBtn: document.getElementById("playerPlayBtn"),
  playerReplayBtn: document.getElementById("playerReplayBtn"),
  volumeSlider: document.getElementById("volumeSlider"),
  muteBtn: document.getElementById("muteBtn"),
  speedChips: document.querySelectorAll(".speed-chip"),
  playerModelBadge: document.getElementById("playerModelBadge"),
  playerVoiceBadge: document.getElementById("playerVoiceBadge"),

  // Status & History
  statusBar: document.getElementById("statusBar"),
  statusLogText: document.getElementById("statusLogText"),
  toastContainer: document.getElementById("toastContainer"),
  historyList: document.getElementById("historyList"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),

  // Presets
  presetChips: document.querySelectorAll(".preset-chip")
};

// ==========================================
// 4. Initialization
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initUI();
  setupEventListeners();
  renderModels();
  renderVoices();
  renderHistory();
  updateTextStats();
  setupCanvas();

  // If API key is saved, validate on start
  if (state.apiKey) {
    elements.apiKeyInput.value = state.apiKey;
    updateApiStatus(true, "API Key Configured");
    fetchAccountDetails(false);
  } else {
    updateApiStatus(false, "API Key Required");
  }
});

function initUI() {
  // Sync slider displays
  elements.stabilityVal.textContent = state.voiceSettings.stability.toFixed(2);
  elements.similarityVal.textContent = state.voiceSettings.similarity_boost.toFixed(2);
  elements.styleVal.textContent = state.voiceSettings.style.toFixed(2);
  elements.speakerBoostCheckbox.checked = state.voiceSettings.use_speaker_boost;
}

// ==========================================
// 5. Model & Voice Rendering
// ==========================================

function renderModels() {
  elements.modelSelect.innerHTML = "";
  state.modelsList.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = `${m.name} (${m.tag})`;
    if (m.id === state.selectedModel) opt.selected = true;
    elements.modelSelect.appendChild(opt);
  });
  updateModelInfo();
}

function updateModelInfo() {
  const model = state.modelsList.find(m => m.id === elements.modelSelect.value) || state.modelsList[0];
  state.selectedModel = model.id;
  elements.modelMetaBadge.textContent = model.badge;
  elements.modelDescription.textContent = model.description;
}

function renderVoices() {
  elements.voiceSelect.innerHTML = "";
  state.voicesList.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.id;
    const accent = v.labels?.accent || "Neutral";
    const useCase = v.labels?.use_case || v.labels?.style || "Narration";
    opt.textContent = `${v.name} — ${accent} (${useCase})`;
    if (v.id === state.selectedVoice) opt.selected = true;
    elements.voiceSelect.appendChild(opt);
  });
  state.selectedVoice = elements.voiceSelect.value;
}

// ==========================================
// 6. API Management & Key Verification
// ==========================================

function updateApiStatus(connected, label) {
  if (connected) {
    elements.statusDot.classList.add("active");
    elements.statusText.textContent = label || "Connected";
    elements.apiStatusPill.style.borderColor = "rgba(16, 185, 129, 0.4)";
  } else {
    elements.statusDot.classList.remove("active");
    elements.statusText.textContent = label || "API Key Required";
    elements.apiStatusPill.style.borderColor = "rgba(245, 158, 11, 0.4)";
  }
}

async function fetchAccountDetails(showToastOnSuccess = true) {
  if (!state.apiKey) return;
  try {
    showLog("Validating ElevenLabs API key and loading voices...");
    
    // 1. Fetch user subscription details via ElevenLabsClient
    const elevenlabs = new ElevenLabsClient({ apiKey: state.apiKey });
    const userData = await elevenlabs.user.getSubscription();

    const charCount = userData.character_count?.toLocaleString() || "0";
    const charLimit = userData.character_limit?.toLocaleString() || "10,000";
    const tier = userData.tier || "Free";

    elements.keyQuotaBadge.style.display = "inline-flex";
    elements.keyQuotaBadge.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
      <span>${tier.toUpperCase()} — ${charCount} / ${charLimit} chars used</span>
    `;

    updateApiStatus(true, `Active (${tier})`);

    // 2. Fetch custom + library voices
    await fetchRemoteVoices();

    if (showToastOnSuccess) {
      showToast("ElevenLabs connected successfully!", "success");
    }
    showLog("ElevenLabs ready. Enter text and select a model to narrate.");
  } catch (err) {
    console.error("API error:", err);
    updateApiStatus(false, "Connection Error");
    elements.keyQuotaBadge.style.display = "none";
    showToast(err.message, "error");
    showLog(`Authentication error: ${err.message}`);
  }
}

async function fetchRemoteVoices() {
  if (!state.apiKey) return;
  try {
    const elevenlabs = new ElevenLabsClient({ apiKey: state.apiKey });
    const data = await elevenlabs.voices.getAll();
    if (data.voices && Array.isArray(data.voices) && data.voices.length > 0) {
      state.voicesList = data.voices.map(v => ({
        id: v.voice_id,
        name: v.name,
        category: v.category,
        labels: v.labels || {},
        preview_url: v.preview_url
      }));
      renderVoices();
      showToast(`Loaded ${state.voicesList.length} voices from ElevenLabs account`, "info");
    }
  } catch (e) {
    console.warn("Could not fetch remote voices:", e);
  }
}

// ==========================================
// 7. Text-to-Speech Narration Generator
// ==========================================

async function generateSpeech() {
  const text = elements.textInput.value.trim();
  if (!text) {
    showToast("Please enter or paste text to narrate", "info");
    elements.textInput.focus();
    return;
  }

  if (!state.apiKey) {
    // Open API drawer and guide user
    elements.apiDrawer.classList.add("open");
    showToast("ElevenLabs API Key required. Enter your key to start.", "error");
    elements.apiKeyInput.focus();
    showLog("Awaiting ElevenLabs API Key...");
    return;
  }

  // Set loading state
  state.isGenerating = true;
  elements.playNarrationBtn.disabled = true;
  elements.playNarrationBtn.classList.add("loading");
  elements.btnText.textContent = "Synthesizing Speech...";
  showLog(`Contacting ElevenLabs API (${state.selectedModel})...`);

  try {
    const voiceId = elements.voiceSelect.value || state.selectedVoice;
    const modelId = elements.modelSelect.value || state.selectedModel;
    const startTime = performance.now();

    // ========================================================
    // Official ElevenLabs SDK Call:
    // const elevenlabs = new ElevenLabsClient({ apiKey });
    // const audio = await elevenlabs.textToSpeech.convert(...);
    // await play(audio);
    // ========================================================
    const elevenlabs = new ElevenLabsClient({
      apiKey: state.apiKey,
    });

    const audio = await elevenlabs.textToSpeech.convert(
      voiceId,
      {
        text: text,
        modelId: modelId,
        outputFormat: 'mp3_44100_128',
        voiceSettings: {
          stability: parseFloat(elements.stabilitySlider.value),
          similarity_boost: parseFloat(elements.similaritySlider.value),
          style: parseFloat(elements.styleSlider.value),
          use_speaker_boost: elements.speakerBoostCheckbox.checked
        }
      }
    );

    const durationMs = Math.round(performance.now() - startTime);

    if (state.currentAudioUrl) {
      URL.revokeObjectURL(state.currentAudioUrl);
    }

    state.currentAudioUrl = audio.url;
    state.currentAudioBlob = audio.blob;

    // Update download button
    elements.downloadBtn.href = audio.url;
    const voiceObj = state.voicesList.find(v => v.id === voiceId);
    const voiceName = voiceObj ? voiceObj.name : "elevenlabs";
    elements.downloadBtn.download = `narration-${voiceName.toLowerCase()}-${Date.now()}.mp3`;
    elements.downloadBtn.classList.remove("disabled");

    // Update badges
    elements.playerModelBadge.textContent = modelId;
    elements.playerVoiceBadge.textContent = voiceName;

    // Save to session history
    addToHistory({
      text: text,
      model: modelId,
      voiceName: voiceName,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationMs: durationMs,
      audioUrl: audio.url,
      blob: audio.blob
    });

    // ========================================================
    // Play using official play(audio)
    // ========================================================
    await play(audio);

    showToast(`Narration generated in ${(durationMs / 1000).toFixed(2)}s!`, "success");
    showLog(`Playback started • Audio received (${(audio.size / 1024).toFixed(1)} KB)`);

  } catch (err) {
    console.error("Narration generation failed:", err);
    showToast(`Synthesis failed: ${err.message}`, "error");
    showLog(`Error: ${err.message}`);
  } finally {
    state.isGenerating = false;
    elements.playNarrationBtn.disabled = false;
    elements.playNarrationBtn.classList.remove("loading");
    elements.btnText.textContent = "Start Narration";
  }
}

// ==========================================
// 8. Audio Playback & Web Audio Visualizer
// ==========================================

// Register play hook so await play(audio) seamlessly routes into the studio acoustic visualizer
if (typeof window !== "undefined") {
  window.__elevenlabs_play_audio = async (audio) => {
    const url = audio?.url || (audio instanceof Blob ? URL.createObjectURL(audio) : audio);
    return loadAndPlayAudio(url);
  };
}

function loadAndPlayAudio(url) {
  audioElement.src = url;
  audioElement.playbackRate = state.playbackSpeed;
  audioElement.volume = parseFloat(elements.volumeSlider.value);

  // Setup Web Audio API on first user gesture
  setupAudioContext();

  audioElement.play().then(() => {
    state.isPlaying = true;
    updatePlayerPlayBtn();
    elements.waveformPlaceholder.style.display = "none";
    startVisualizer();
  }).catch(e => {
    console.warn("Autoplay was prevented by browser policy:", e);
    state.isPlaying = false;
    updatePlayerPlayBtn();
  });
}

function setupAudioContext() {
  if (audioContext) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioCtx();
    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 128;
    analyserNode.smoothingTimeConstant = 0.8;

    audioSourceNode = audioContext.createMediaElementSource(audioElement);
    audioSourceNode.connect(analyserNode);
    analyserNode.connect(audioContext.destination);
  } catch (e) {
    console.warn("Web Audio API initialization error:", e);
  }
}

function setupCanvas() {
  const canvas = elements.waveformCanvas;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  drawIdleWave();
}

window.addEventListener("resize", () => {
  setupCanvas();
});

function drawIdleWave() {
  const canvas = elements.waveformCanvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;

  ctx.clearRect(0, 0, width, height);

  // Draw gentle static center line
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.strokeStyle = "rgba(99, 102, 241, 0.2)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function startVisualizer() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);

  const canvas = elements.waveformCanvas;
  const ctx = canvas.getContext("2d");
  const bufferLength = analyserNode ? analyserNode.frequencyBinCount : 64;
  const dataArray = new Uint8Array(bufferLength);

  function render() {
    animationFrameId = requestAnimationFrame(render);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    ctx.clearRect(0, 0, width, height);

    if (analyserNode && state.isPlaying) {
      analyserNode.getByteFrequencyData(dataArray);

      const barWidth = (width / bufferLength) * 2.2;
      let x = 0;

      // Create rich dynamic gradient
      const gradient = ctx.createLinearGradient(0, height, width, 0);
      gradient.addColorStop(0, "#6366f1");
      gradient.addColorStop(0.5, "#8b5cf6");
      gradient.addColorStop(1, "#06b6d4");

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * (height * 0.85);

        ctx.fillStyle = gradient;
        // Rounded bars oscillating from center
        const yTop = (height - barHeight) / 2;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, yTop, Math.max(barWidth - 2, 2), barHeight, 3);
        } else {
          ctx.rect(x, yTop, Math.max(barWidth - 2, 2), barHeight);
        }
        ctx.fill();

        x += barWidth;
      }
    } else {
      drawIdleWave();
      cancelAnimationFrame(animationFrameId);
    }
  }

  render();
}

function updatePlayerPlayBtn() {
  if (state.isPlaying) {
    elements.playerPlayBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="4" width="4" height="16" rx="1"></rect>
        <rect x="14" y="4" width="4" height="16" rx="1"></rect>
      </svg>`;
  } else {
    elements.playerPlayBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>`;
  }
}

// ==========================================
// 9. Voice Sample Preview Player
// ==========================================

function playVoicePreview() {
  const voiceId = elements.voiceSelect.value;
  const voiceObj = state.voicesList.find(v => v.id === voiceId);

  if (!voiceObj || !voiceObj.preview_url) {
    showToast("No sample preview available for this voice", "info");
    return;
  }

  if (previewAudioElement.src === voiceObj.preview_url && !previewAudioElement.paused) {
    previewAudioElement.pause();
    elements.previewVoiceBtn.classList.remove("playing");
    return;
  }

  // Pause main narration if playing
  if (!audioElement.paused) {
    audioElement.pause();
    state.isPlaying = false;
    updatePlayerPlayBtn();
  }

  previewAudioElement.src = voiceObj.preview_url;
  elements.previewVoiceBtn.classList.add("playing");
  previewAudioElement.play().catch(e => console.warn("Preview playback failed:", e));

  previewAudioElement.onended = () => {
    elements.previewVoiceBtn.classList.remove("playing");
  };
}

// ==========================================
// 10. History Log Management
// ==========================================

function addToHistory(item) {
  state.history.unshift(item);
  if (state.history.length > 20) state.history.pop();
  
  // Persist metadata (exclude blob)
  const historyToSave = state.history.map(h => ({
    text: h.text,
    model: h.model,
    voiceName: h.voiceName,
    timestamp: h.timestamp,
    durationMs: h.durationMs
  }));
  localStorage.setItem("elevenlabs_history", JSON.stringify(historyToSave));
  renderHistory();
}

function renderHistory() {
  if (state.history.length === 0) {
    elements.historyList.innerHTML = `
      <div style="text-align: center; color: var(--text-dim); padding: 24px; font-size: 0.86rem;">
        No narrations generated yet in this session.
      </div>`;
    return;
  }

  elements.historyList.innerHTML = "";
  state.history.forEach((h, idx) => {
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <div class="history-info">
        <div class="history-snippet">"${escapeHtml(h.text)}"</div>
        <div class="history-meta">
          <span><strong>${escapeHtml(h.voiceName)}</strong></span>
          <span>•</span>
          <span style="font-family: var(--font-mono);">${escapeHtml(h.model)}</span>
          <span>•</span>
          <span>${h.timestamp}</span>
        </div>
      </div>
      <div class="history-actions">
        <button class="btn-secondary-sm replay-item-btn" data-index="${idx}" title="Re-populate text and settings">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Load
        </button>
      </div>
    `;
    elements.historyList.appendChild(item);
  });

  // Attach load listeners
  elements.historyList.querySelectorAll(".replay-item-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(btn.dataset.index);
      const entry = state.history[idx];
      if (entry) {
        elements.textInput.value = entry.text;
        updateTextStats();
        // Set model
        const modelOpt = Array.from(elements.modelSelect.options).find(o => o.value === entry.model);
        if (modelOpt) {
          elements.modelSelect.value = entry.model;
          updateModelInfo();
        }
        showToast("Loaded narration settings into editor", "info");
      }
    });
  });
}

// ==========================================
// 11. Event Listeners Setup
// ==========================================

function setupEventListeners() {
  // API Drawer Toggles
  elements.apiStatusPill.addEventListener("click", () => {
    elements.apiDrawer.classList.toggle("open");
  });

  elements.closeDrawerBtn.addEventListener("click", () => {
    elements.apiDrawer.classList.remove("open");
  });

  elements.toggleKeyVisibilityBtn.addEventListener("click", () => {
    const type = elements.apiKeyInput.type === "password" ? "text" : "password";
    elements.apiKeyInput.type = type;
  });

  elements.saveApiKeyBtn.addEventListener("click", () => {
    const key = elements.apiKeyInput.value.trim();
    if (!key) {
      showToast("Please enter a valid API key", "error");
      return;
    }
    state.apiKey = key;
    localStorage.setItem("elevenlabs_api_key", key);
    fetchAccountDetails(true);
    elements.apiDrawer.classList.remove("open");
  });

  elements.testKeyBtn.addEventListener("click", () => {
    state.apiKey = elements.apiKeyInput.value.trim();
    fetchAccountDetails(true);
  });

  elements.clearKeyBtn.addEventListener("click", () => {
    state.apiKey = "";
    localStorage.removeItem("elevenlabs_api_key");
    elements.apiKeyInput.value = "";
    updateApiStatus(false, "API Key Cleared");
    elements.keyQuotaBadge.style.display = "none";
    showToast("API Key removed from browser storage", "info");
  });

  // Model & Voice Selectors
  elements.modelSelect.addEventListener("change", updateModelInfo);
  elements.previewVoiceBtn.addEventListener("click", playVoicePreview);

  elements.refreshVoicesBtn.addEventListener("click", () => {
    if (!state.apiKey) {
      showToast("API key required to sync account voices", "info");
      elements.apiDrawer.classList.add("open");
      return;
    }
    fetchRemoteVoices();
  });

  // Voice Tuning Accordion
  elements.tuningToggleBtn.addEventListener("click", () => {
    const isOpen = elements.tuningDrawer.classList.toggle("open");
    elements.tuningToggleBtn.classList.toggle("open", isOpen);
  });

  elements.stabilitySlider.addEventListener("input", (e) => {
    elements.stabilityVal.textContent = parseFloat(e.target.value).toFixed(2);
  });
  elements.similaritySlider.addEventListener("input", (e) => {
    elements.similarityVal.textContent = parseFloat(e.target.value).toFixed(2);
  });
  elements.styleSlider.addEventListener("input", (e) => {
    elements.styleVal.textContent = parseFloat(e.target.value).toFixed(2);
  });

  elements.resetTuningBtn.addEventListener("click", () => {
    elements.stabilitySlider.value = 0.50;
    elements.stabilityVal.textContent = "0.50";
    elements.similaritySlider.value = 0.75;
    elements.similarityVal.textContent = "0.75";
    elements.styleSlider.value = 0.00;
    elements.styleVal.textContent = "0.00";
    elements.speakerBoostCheckbox.checked = true;
    showToast("Voice tuning settings reset to default", "info");
  });

  // Textarea Actions
  elements.textInput.addEventListener("input", updateTextStats);

  elements.clearTextBtn.addEventListener("click", () => {
    elements.textInput.value = "";
    updateTextStats();
    elements.textInput.focus();
  });

  elements.pasteTextBtn.addEventListener("click", async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        elements.textInput.value = text;
        updateTextStats();
        showToast("Text pasted from clipboard", "info");
      }
    } catch (e) {
      showToast("Clipboard access denied. Please paste manually using Ctrl+V.", "info");
    }
  });

  // Sample Presets
  elements.presetChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const presetKey = chip.dataset.preset;
      if (SAMPLE_PRESETS[presetKey]) {
        elements.textInput.value = SAMPLE_PRESETS[presetKey];
        updateTextStats();
        showToast(`Loaded ${chip.textContent.trim()} prompt`, "info");
      }
    });
  });

  // Primary Narration Button
  elements.playNarrationBtn.addEventListener("click", generateSpeech);

  // Audio Player Listeners
  elements.playerPlayBtn.addEventListener("click", togglePlayback);
  elements.playerReplayBtn.addEventListener("click", () => {
    audioElement.currentTime = 0;
    if (!state.isPlaying) {
      audioElement.play();
      state.isPlaying = true;
      updatePlayerPlayBtn();
      startVisualizer();
    }
  });

  audioElement.addEventListener("timeupdate", updateTimeline);
  audioElement.addEventListener("ended", () => {
    state.isPlaying = false;
    updatePlayerPlayBtn();
  });

  elements.timelineProgressBar.addEventListener("click", seekAudio);

  // Volume
  elements.volumeSlider.addEventListener("input", (e) => {
    audioElement.volume = parseFloat(e.target.value);
    audioElement.muted = false;
  });

  elements.muteBtn.addEventListener("click", () => {
    audioElement.muted = !audioElement.muted;
    elements.volumeSlider.value = audioElement.muted ? 0 : audioElement.volume;
  });

  // Speed chips
  elements.speedChips.forEach(chip => {
    chip.addEventListener("click", () => {
      elements.speedChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const speed = parseFloat(chip.dataset.speed);
      state.playbackSpeed = speed;
      audioElement.playbackRate = speed;
    });
  });

  // Clear History
  elements.clearHistoryBtn.addEventListener("click", () => {
    state.history = [];
    localStorage.removeItem("elevenlabs_history");
    renderHistory();
    showToast("History cleared", "info");
  });
}

// ==========================================
// 12. Helpers & Utilities
// ==========================================

function updateTextStats() {
  const text = elements.textInput.value;
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  elements.charCount.textContent = chars.toLocaleString();
  elements.wordCount.textContent = words.toLocaleString();

  // Character limit coloring (ElevenLabs typically allows up to 5,000 chars per standard request)
  if (chars > 4500) {
    elements.charCount.style.color = "var(--accent-rose)";
  } else if (chars > 3000) {
    elements.charCount.style.color = "var(--accent-amber)";
  } else {
    elements.charCount.style.color = "var(--text-muted)";
  }
}

function togglePlayback() {
  if (!audioElement.src) {
    generateSpeech();
    return;
  }

  setupAudioContext();

  if (state.isPlaying) {
    audioElement.pause();
    state.isPlaying = false;
  } else {
    audioElement.play().then(() => {
      state.isPlaying = true;
      startVisualizer();
    }).catch(e => console.error("Playback error:", e));
  }
  updatePlayerPlayBtn();
}

function updateTimeline() {
  if (!audioElement.duration) return;
  const current = audioElement.currentTime;
  const duration = audioElement.duration;
  const percent = (current / duration) * 100;

  elements.timelineFilled.style.width = `${percent}%`;
  elements.currentTimeDisplay.textContent = formatTime(current);
  elements.totalDurationDisplay.textContent = formatTime(duration);
}

function seekAudio(e) {
  if (!audioElement.duration) return;
  const rect = elements.timelineProgressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = Math.max(0, Math.min(1, clickX / rect.width));
  audioElement.currentTime = percent * audioElement.duration;
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds === Infinity) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function showLog(text) {
  elements.statusLogText.textContent = text;
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let icon = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>`;

  if (type === "success") {
    icon = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>`;
  } else if (type === "error") {
    icon = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>`;
  }

  toast.innerHTML = `
    <div style="flex-shrink: 0; display: flex; align-items: center;">${icon}</div>
    <div style="flex: 1;">${escapeHtml(message)}</div>
  `;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px) scale(0.95)";
    setTimeout(() => toast.remove(), 250);
  }, 4000);
}

function escapeHtml(string) {
  const div = document.createElement("div");
  div.textContent = string;
  return div.innerHTML;
}
