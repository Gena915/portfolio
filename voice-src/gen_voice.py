#!/usr/bin/env python
"""Genera las locuciones del agente anfitrión con edge-tts (Microsoft, GRATIS, sin API key).
Voz argentina neural: es-AR-TomasNeural (M) o es-AR-ElenaNeural (F).
Uso:  python voice-src/gen_voice.py            (Tomás por defecto)
      VOICE=es-AR-ElenaNeural python voice-src/gen_voice.py
Requiere:  pip install edge-tts
"""
import os
import subprocess
from pathlib import Path

VOICE = os.environ.get("VOICE", "es-AR-TomasNeural")
RATE = os.environ.get("RATE", "-4%")
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "voice-src"
OUT = ROOT / "public" / "voice"
OUT.mkdir(parents=True, exist_ok=True)

CLIPS = ["welcome", "proyectos", "stack", "sobre-mi", "contacto"]

for name in CLIPS:
    txt = SRC / f"{name}.txt"
    mp3 = OUT / f"{name}.mp3"
    subprocess.run(
        ["python", "-m", "edge_tts", "--voice", VOICE, f"--rate={RATE}",
         "-f", str(txt), "--write-media", str(mp3)],
        check=True,
    )
    print(f"OK {name}.mp3  ({mp3.stat().st_size // 1024} KB)")
print(f"Listo con voz {VOICE}")
