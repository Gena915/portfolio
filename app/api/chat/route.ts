import { NextResponse } from "next/server";
import { profile, projects, stackGroups, about, education } from "@/lib/content";

// Conocimiento del agente sobre Genaro (se arma del mismo contenido del sitio).
function systemPrompt() {
  const proj = projects
    .map((p) => `- ${p.title} (${p.sector}): ${p.summary}`)
    .join("\n");
  const stack = stackGroups.map((g) => `- ${g.label}: ${g.items.join(", ")}`).join("\n");
  const edu = education.map((e) => `- ${e.title} — ${e.place} (${e.date})`).join("\n");
  return `Sos el asistente de IA del portfolio de ${profile.name}, desarrollador de IA especializado
en automatizar procesos completos de empresas con sistemas de agentes.
Hablás en español rioplatense (vos), tono profesional, cercano y conciso. Respondés SOLO sobre
el perfil profesional de Genaro: su experiencia, proyectos, stack, enfoque, formación y cómo contactarlo.
Tu objetivo es ayudar a un reclutador o empresa a entender qué puede aportar Genaro.

REGLAS DURAS:
- Respuestas breves (2-4 frases salvo que pidan detalle). Cálido pero profesional.
- NUNCA inventes datos que no estén acá. Si no sabés algo, decí que escriban a Genaro.
- NUNCA compartas información privada, confidencial ni sensible: nombres reales de clientes,
  credenciales, datos internos, arquitecturas detalladas de los agentes, ni nada que no esté en este texto.
  Los clientes se mencionan SIEMPRE anonimizados por sector.
- Si preguntan algo fuera del perfil profesional, redirigí con amabilidad al contacto.

QUIÉN ES: ${profile.intro}
${about.join(" ")}
Su foco: automatizar procesos completos (ventas, cobranzas, soporte, administración, etc.) con equipos
de agentes integrados a las herramientas que la empresa ya usa — no chatbots sueltos. Trabajó en 9+ sectores.

PROYECTOS (clientes anonimizados por sector; en varios fue el creador a cargo, en otros participó en el equipo):
${proj}

STACK:
${stack}

FORMACIÓN:
${edu}

CONTACTO: email ${profile.email}, LinkedIn ${profile.linkedin}. Open to Work (presencial/híbrido/remoto), ${profile.location}.`;
}

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = (body.messages || []).slice(-10);
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const sys = systemPrompt();
  const deepseek = process.env.DEEPSEEK_API_KEY;
  const anthropic = process.env.ANTHROPIC_API_KEY;

  try {
    if (deepseek) {
      const r = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${deepseek}` },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{ role: "system", content: sys }, ...messages],
          temperature: 0.6,
          max_tokens: 400,
        }),
      });
      const d = await r.json();
      const text = d?.choices?.[0]?.message?.content ?? "";
      return NextResponse.json({ text });
    }

    if (anthropic) {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropic,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 400,
          system: sys,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const d = await r.json();
      const text = d?.content?.[0]?.text ?? "";
      return NextResponse.json({ text });
    }

    return NextResponse.json({
      text: "El chat todavía no está configurado (falta la API key). Mientras tanto, escribime a " + profile.email + ".",
    });
  } catch {
    return NextResponse.json({ text: "Tuve un problema para responder. Probá de nuevo o escribime a " + profile.email + "." }, { status: 200 });
  }
}
