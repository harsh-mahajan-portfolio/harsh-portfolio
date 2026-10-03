/**
 * ============================================================================
 * ElevenLabs Official SDK Browser Interface
 * Package specifier: '@elevenlabs/elevenlabs-js' / 'elevenlabs'
 * 
 * Provides:
 *   import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
 * ============================================================================
 */

export class ElevenLabsClient {
  constructor(config = {}) {
    this.apiKey = config.apiKey || (typeof process !== "undefined" && process.env?.ELEVENLABS_API_KEY) || "";
    this.baseUrl = (config.baseUrl || "https://api.elevenlabs.io").replace(/\/$/, "");

    // Text-To-Speech API Module
    this.textToSpeech = {
      /**
       * Convert text to speech using ElevenLabs models
       * @param {string} voiceId - The voice ID (e.g. 'JBFqnCBsd6RMkjVDRZzb' or '21m00Tcm4TlvDq8ikWAM')
       * @param {Object} options - Options object
       * @param {string} options.text - Text script to synthesize
       * @param {string} [options.modelId='eleven_multilingual_v2'] - Model ID
       * @param {string} [options.outputFormat='mp3_44100_128'] - Output audio format
       * @param {Object} [options.voiceSettings] - Voice fine-tuning settings
       * @returns {Promise<{blob: Blob, url: string, size: number, format: string}>} Audio object
       */
      convert: async (voiceId, options = {}) => {
        if (!voiceId) {
          throw new Error("Voice ID is required for textToSpeech.convert()");
        }

        const text = options.text || "";
        if (!text.trim()) {
          throw new Error("Text content is required for textToSpeech.convert()");
        }

        if (!this.apiKey) {
          throw new Error("ElevenLabs API Key is required. Please set your apiKey in ElevenLabsClient.");
        }

        const modelId = options.modelId || options.model_id || "eleven_multilingual_v2";
        const outputFormat = options.outputFormat || options.output_format || "mp3_44100_128";
        const voiceSettings = options.voiceSettings || options.voice_settings;

        const endpoint = `${this.baseUrl}/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=${encodeURIComponent(outputFormat)}`;

        const payload = {
          text: text,
          model_id: modelId
        };

        if (voiceSettings) {
          payload.voice_settings = {
            stability: voiceSettings.stability ?? 0.5,
            similarity_boost: voiceSettings.similarity_boost ?? voiceSettings.similarityBoost ?? 0.75,
            style: voiceSettings.style ?? 0.0,
            use_speaker_boost: voiceSettings.use_speaker_boost ?? voiceSettings.useSpeakerBoost ?? true
          };
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "xi-api-key": this.apiKey,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg"
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          let errorMessage = `ElevenLabs API error (HTTP ${response.status})`;
          try {
            const errorJson = await response.json();
            if (errorJson.detail?.message) {
              errorMessage = errorJson.detail.message;
            } else if (errorJson.detail) {
              errorMessage = typeof errorJson.detail === "string" ? errorJson.detail : JSON.stringify(errorJson.detail);
            }
          } catch (_) {
            // fallback
          }
          throw new Error(errorMessage);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        return {
          blob: blob,
          url: url,
          size: blob.size,
          format: outputFormat,
          type: blob.type || "audio/mpeg",
          stream: () => blob.stream(),
          arrayBuffer: () => blob.arrayBuffer()
        };
      }
    };

    // Voices API Module
    this.voices = {
      getAll: async () => {
        if (!this.apiKey) throw new Error("API Key required to list voices");
        const res = await fetch(`${this.baseUrl}/v1/voices`, {
          headers: { "xi-api-key": this.apiKey }
        });
        if (!res.ok) throw new Error(`Failed to fetch voices: HTTP ${res.status}`);
        return await res.json();
      }
    };

    // Models API Module
    this.models = {
      getAll: async () => {
        if (!this.apiKey) throw new Error("API Key required to list models");
        const res = await fetch(`${this.baseUrl}/v1/models`, {
          headers: { "xi-api-key": this.apiKey }
        });
        if (!res.ok) throw new Error(`Failed to fetch models: HTTP ${res.status}`);
        return await res.json();
      }
    };

    // User Subscription Module
    this.user = {
      getSubscription: async () => {
        if (!this.apiKey) throw new Error("API Key required to fetch subscription details");
        const res = await fetch(`${this.baseUrl}/v1/user/subscription`, {
          headers: { "xi-api-key": this.apiKey }
        });
        if (!res.ok) throw new Error(`Failed to fetch subscription: HTTP ${res.status}`);
        return await res.json();
      }
    };
  }
}

/**
 * Play audio object, stream, Blob, or URL with custom player hooks
 * @param {Object|Blob|string|ReadableStream} audio - Audio to play
 * @returns {Promise<void>}
 */
export async function play(audio) {
  // If the studio player has registered an interactive player handler, dispatch to it
  if (typeof window !== "undefined" && typeof window.__elevenlabs_play_audio === "function") {
    return await window.__elevenlabs_play_audio(audio);
  }

  // Fallback standalone playback
  let audioUrl = "";
  if (audio && typeof audio === "object" && audio.url) {
    audioUrl = audio.url;
  } else if (audio instanceof Blob) {
    audioUrl = URL.createObjectURL(audio);
  } else if (audio?.blob instanceof Blob) {
    audioUrl = URL.createObjectURL(audio.blob);
  } else if (typeof audio === "string") {
    audioUrl = audio;
  } else {
    throw new Error("Unsupported audio format passed to play()");
  }

  const tempAudio = new Audio(audioUrl);
  return new Promise((resolve, reject) => {
    tempAudio.onended = () => resolve();
    tempAudio.onerror = (e) => reject(e);
    tempAudio.play().then(resolve).catch(reject);
  });
}

// Global browser window export for compatibility across file:// and local servers
if (typeof window !== "undefined") {
  window.ElevenLabsClient = ElevenLabsClient;
  window.play = play;
}
