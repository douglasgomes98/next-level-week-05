import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function formatDate(date: string | Date, template: string) {
  if (typeof date === "string") {
    return format(parseISO(date), template, {
      locale: ptBR,
    });
  }

  return format(date, template, {
    locale: ptBR,
  });
}
