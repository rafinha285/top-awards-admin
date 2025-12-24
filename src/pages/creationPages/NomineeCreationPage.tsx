import {BaseCreationPage} from "./BaseCreationPage.tsx";
import type {Nominee} from "../../types/Nominee.ts";
import type {FormSchema} from "../../types/FromOption.ts";
import type {BaseFormState} from "../BaseFormPage.tsx";

export class NomineeCreationPage extends BaseCreationPage<Nominee, FormSchema<Nominee>>{
    protected getResourceName(): string {
        return "nominee"
    }
    protected getFormSchema(): FormSchema<Nominee> {
        return {
            id: null,
            name: {label: "Nome", type: "text"},
        }
    }

    state: BaseFormState<Nominee> = {
        error: null,
        loading: false,
        title: "Criar Nomeado",
        formData:{
            id: null,
            name: ""
        }
    }

}