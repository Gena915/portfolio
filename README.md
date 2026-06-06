# Genaro García — Portfolio de IA

Portfolio personal de **Genaro García**, desarrollador especializado en **inteligencia artificial
aplicada**: automatización de procesos de empresas con sistemas de agentes, computer vision e
integración end-to-end.

No es una landing más: es una experiencia que **respira IA por la vista y el oído**.

🔗 **Live:** _(próximamente)_ · 💼 [LinkedIn](https://www.linkedin.com/in/genaro-garcia-46b36b331/)

---

## ✨ Qué tiene de especial

- 🎙️ **Agente anfitrión con voz** — una IA te da la bienvenida y **narra cada sección** mientras
  scrolleás, con un orbe que reacciona en tiempo real a la amplitud del audio (Web Audio API).
- 🤖 **Chat-agente embebido** — un asistente que responde preguntas sobre el perfil, con guard de
  confidencialidad (DeepSeek / Claude, configurable).
- 🎨 **Visuales generados con IA** — hero y pósters de cada proyecto creados con modelos generativos
  (Higgsfield Soul), más una animación de la arquitectura agéntica renderizada por código.
- 🎬 **Cinematografía de scroll** — entradas con desenfoque, parallax y barra de progreso.

## 🛠️ Stack

- **Framework:** Next.js 16 (App Router) · React 19 · TypeScript
- **Estilos:** Tailwind CSS v4
- **IA / Voz:** Web Audio API · TTS neuronal (edge-tts) · API de chat (DeepSeek / Anthropic)
- **Deploy:** Vercel

## 🚀 Correr localmente

```bash
npm install
npm run dev
# http://localhost:3000
```

Para habilitar el chat, creá un `.env.local`:

```bash
DEEPSEEK_API_KEY=tu_key        # o ANTHROPIC_API_KEY
```

## 📁 Estructura

```
app/            # rutas (página única + /api/chat)
components/     # Hero, Projects, Stack, AIHost (voz), ChatAgent, ScrollFX…
lib/content.ts  # todo el contenido del portfolio (una sola fuente)
public/gen/     # visuales generados con IA
public/voice/   # locuciones del agente anfitrión
```

---

_Hecho con Next.js. Los proyectos de empresa se presentan anonimizados por su sector._
