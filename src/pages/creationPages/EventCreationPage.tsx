import {BaseCreationPage, type BaseCreationPageState} from "./BaseCreationPage.tsx";
import type Event from "../../types/Event.ts"
import type {FormSchema} from "../../types/FromOption.ts";
import type {BaseProps} from "../BasePage.tsx";

const EVENT_FORM_SCHEMA: FormSchema<Event> = {
    name: {label:"Nome", type: "text"},
    endDate: {label: "Fim do evento", type: "date"},
    startDate: {label: "Inicio do evento", type: "date"},
    id : null
}

export class EventCreationPage extends BaseCreationPage<Event, typeof EVENT_FORM_SCHEMA, BaseProps>{
    state: BaseCreationPageState<Event> = {
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

    protected async handleCreation(): Promise<void> {
        const event: Event = this.state.formData;
        const response = await this.postToApi<Event, object>("/event/new", event);
        if(response && response.data.success) {
            console.log(response);
        }
    }
    protected getFormSchema(): typeof EVENT_FORM_SCHEMA {
        return EVENT_FORM_SCHEMA;
    }


}