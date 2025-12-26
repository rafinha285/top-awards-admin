import {BaseCreationPage} from "./BaseCreationPage.tsx";
import type Event from "../../types/Event.ts"
import type {FormSchema} from "../../types/FromOption.ts";
import type {BaseProps} from "../BasePage.tsx";
import type {BaseFormState} from "../BaseFormPage.tsx";

const EVENT_FORM_SCHEMA: FormSchema<Event> = {
    name: {label:"Nome", type: "text"},
    startDate: {label: "Inicio do evento", type: "date"},
    endDate: {label: "Fim do evento", type: "date"},
    id : null
}

type EventCreationState = BaseFormState<Event>

export class EventCreationPage extends BaseCreationPage<Event, typeof EVENT_FORM_SCHEMA, BaseProps, EventCreationState>{
    protected getResourceName(): string {
        return "event";
    }
    state: BaseFormState<Event> = {
        error: null,
        loading: false,
        title: "Novo Evento",
        formData: {
            name: "",
            endDate: null,
            startDate: null,
            id: null
        }
    }

    protected getFormSchema(): typeof EVENT_FORM_SCHEMA {
        return EVENT_FORM_SCHEMA;
    }


}