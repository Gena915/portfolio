#!/usr/bin/env python
"""Genera las locuciones del agente anfitrión con ElevenLabs.
La API key se lee de la env var ELEVENLABS_API_KEY (nunca se hardcodea).
Uso:  ELEVENLABS_API_KEY=xxx python voice-src/gen_eleven.py
"""
import json
import os
import sys
import urllib.request
from pathlib import Path

API_KEY = os.environ.get("ELEVENLABS_API_KEY")
if not API_KEY:
    sys.exit("Falta ELEVENLABS_API_KEY en el entorno.")

# Voz del anfitrión (George — Warm, Captivating Storyteller). Cambiar acá para probar otra.
VOICE_ID = os.environ.get("ELEVEN_VOICE_ID", "JBFqnCBsd6RMkjVDRZzb")
MODEL_ID = "eleven_multilingual_v2"

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "voice-src"
OUT = ROOT / "public" / "voice"
OUT.mkdir(parents=True, exist_ok=True)

CLIPS = ["welcome", "proyectos", "stack", "sobre-mi", "contacto"]

settings = {"stability": 0.45, "similarity_boost": 0.8, "style": 0.15, "use_speaker_boost": True}

for name in CLIPS:
    text = (SRC / f"{name}.txt").read_text(encoding="utf-8").strip()
    body = json.dumps({"text": text, "model_id": MODEL_ID, "voice_settings": settings}).encode("utf-8")
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}?output_format=mp3_44100_128"
    req = urllib.request.Request(url, data=body, method="POST", headers={
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
    })
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            audio = resp.read()
        (OUT / f"{name}.mp3").write_bytes(audio)
        print(f"OK  {name}.mp3  ({len(audio)//1024} KB)")
    except urllib.error.HTTPError as e:
        print(f"ERR {name}: HTTP {e.code} {e.read().decode('utf-8', 'ignore')[:200]}")
        sys.exit(1)
