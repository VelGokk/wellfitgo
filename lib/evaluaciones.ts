export type EvalKey =
  | "escaner-corporal-virtual"
  | "perfil-nutricional"
  | "evaluacion-bienestar"
  | "autoevaluacion";

export type EvalDef = {
  key: EvalKey;
  title: string;
  subtitle: string;
  cta?: string;
  questions: Array<
    | { type: "text" | "textarea" | "number" | "select"; name: string; label: string; placeholder?: string; required?: boolean; options?: string[] }
    | { type: "radio"; name: string; label: string; required?: boolean; options: string[] }
  >;
};

export const EVALUACIONES: EvalDef[] = [
  {
    key: "escaner-corporal-virtual",
    title: "Escáner Corporal Virtual",
    subtitle: "Obtené una estimación de tu composición corporal y puntos de mejora.",
    questions: [
      { type: "number", name: "edad", label: "Edad", required: true, placeholder: "Ej: 32" },
      { type: "select",  name: "sexo", label: "Sexo", required: true, options: ["Femenino", "Masculino", "Prefiero no decir"] },
      { type: "number", name: "altura_cm", label: "Altura (cm)", required: true, placeholder: "Ej: 165" },
      { type: "number", name: "peso_kg",  label: "Peso (kg)", required: true, placeholder: "Ej: 63" },
      { type: "radio",   name: "actividad", label: "Nivel de actividad", required: true,
        options: ["Bajo", "Moderado", "Alto"] },
      { type: "textarea", name: "objetivos", label: "Objetivos específicos", placeholder: "Ej: mejorar core, aumentar masa magra…" }
    ]
  },
  {
    key: "perfil-nutricional",
    title: "Perfil Nutricional",
    subtitle: "Evaluá tu alimentación actual para detectar oportunidades.",
    questions: [
      { type: "radio", name: "habitos", label: "¿Comés 3+ porciones de frutas/verduras por día?", required: true, options: ["Sí", "No"] },
      { type: "radio", name: "agua", label: "¿Tomás 2 litros de agua al día?", required: true, options: ["Sí", "No"] },
      { type: "radio", name: "ultraprocesados", label: "¿Consumís ultraprocesados frecuentemente?", required: true, options: ["Sí", "No", "A veces"] },
      { type: "textarea", name: "restricciones", label: "Restricciones o preferencias", placeholder: "Ej: vegetariano, celiaquía, intolerancias…" }
    ]
  },
  {
    key: "evaluacion-bienestar",
    title: "Evaluación de Bienestar",
    subtitle: "Chequeo rápido de sueño, estrés y energía.",
    questions: [
      { type: "radio", name: "sueno", label: "Calidad del sueño", required: true, options: ["Baja", "Media", "Alta"] },
      { type: "radio", name: "estres", label: "Nivel de estrés", required: true, options: ["Bajo", "Medio", "Alto"] },
      { type: "radio", name: "energia", label: "Energía diaria", required: true, options: ["Baja", "Media", "Alta"] },
      { type: "textarea", name: "comentarios", label: "Comentarios", placeholder: "Algo que quieras sumar…" }
    ]
  },
  {
    key: "autoevaluacion",
    title: "Autoevaluación",
    subtitle: "Conocé tu punto de partida para los próximos 30 días.",
    questions: [
      { type: "textarea", name: "fortalezas", label: "Fortalezas actuales" },
      { type: "textarea", name: "obstaculos", label: "Obstáculos a resolver" },
      { type: "textarea", name: "plan30", label: "¿Qué te comprometés a hacer en 30 días?" }
    ]
  }
];

export const byKey = (key: string) => EVALUACIONES.find(e => e.key === key);
