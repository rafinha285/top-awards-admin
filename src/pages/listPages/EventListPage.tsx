import { BaseListPage } from "./BaseListPage.tsx";
import type Event from "../../types/Event.ts"
import type { Column } from "../../components/ListItem.tsx";

// Formata data sem conversão de timezone (YYYY-MM-DD -> DD/MM/YYYY)
const formatDate = (dateStr: unknown): string => {
    if (!dateStr) return "";
    const str = String(dateStr);
    // Se já está no formato YYYY-MM-DD, converte diretamente
    const match = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
        return `${match[3]}/${match[2]}/${match[1]}`;
    }
    // Fallback para outros formatos
    return str;
};

export class EventListPage extends BaseListPage<Event> {
    protected getColumns(): Column<Event>[] {
        return [
            {
                header: "Id",
                accessor: "id",
            },
            {
                header: "Nome",
                accessor: "name",
                // width: "40%" // Essa coluna ocupa 40%
            },
            {
                header: "Data de inicio",
                accessor: "startDate",
                // width: "30%",
                render: (val) => formatDate(val)
            },
            {
                header: "Data de fim",
                accessor: "endDate",
                render: (val) => formatDate(val)
            }
        ];
    }

    protected getResourceName(): string {
        return "event";
    }

}