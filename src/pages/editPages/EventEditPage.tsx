import {BaseEditPage, type EditPageProps} from "./BaseEditPage.tsx";
import type Event from "../../types/Event.ts"
import type {FormSchema} from "../../types/FromOption.ts";
import type {BaseProps} from "../BasePage.tsx";
import {useParams} from "react-router-dom";
import type {BaseFormState} from "../BaseFormPage.tsx";

const EVENT_FORM_SCHEMA: FormSchema<Event> = {
    id : {label: "Id", type: "readonly"},
    name: {label:"Nome", type: "text"},
    startDate: {label: "Inicio do evento", type: "date"},
    endDate: {label: "Fim do evento", type: "date"},
}

class EventEditPageInternal extends BaseEditPage<Event, typeof EVENT_FORM_SCHEMA, EditPageProps> {
    state: BaseFormState<Event> ={
        title: "Editar Evento",
        loading: false,
        error: null,
        formData: {
            name: "",
            endDate: null,
            startDate: null,
            id: null
        }
    }

    // Configuração 1: Qual o nome do recurso na API?
    protected getResourceName(): string {
        return "event";
    }

    // Configuração 2: Qual o formulário?
    protected getFormSchema() {
        return EVENT_FORM_SCHEMA;
    }
}

// Wrapper continua necessário por causa das Classes + React Router v6
export const EventEditPage = (props: BaseProps) => {
    // 2. Pegamos os params
    const params = useParams();

    // 3. Fazemos o Cast 'as { id: string }'
    // Isso resolve o erro "Property id is missing..."
    return (
        <EventEditPageInternal
            {...props}
            params={params as { id: string }}
        />
    );
};