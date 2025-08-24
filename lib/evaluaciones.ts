
import evaluacionesData from "../content/evaluaciones.json";

export type Evaluacion = {
  id: string;
  nombre: string;
  descripcion: string;
  url: string;
  activo: boolean;
  preguntas: string[];
};

export const EVALUACIONES: Evaluacion[] = evaluacionesData as Evaluacion[];

export const byId = (id: string) => EVALUACIONES.find(e => e.id === id);
