import {BaseFormPage, type BaseFormState} from "../BaseFormPage.tsx";
import type {BaseProps} from "../BasePage.tsx";
import type {FormSchema} from "../../types/FromOption.ts";

export abstract class BaseCreationPage<T extends object, F extends FormSchema<T>, P extends BaseProps> extends BaseFormPage<T, F, P, BaseFormState<T>> {
    protected abstract getResourceName(): string;

    protected async handleSubmit(): Promise<void> {
        const resource = this.getResourceName();
        // POST /event com o formData
        await this.postToApi(`/${resource}/new`, this.state.formData);

        alert("Criado com sucesso!");
        this.navigate("/home"); // Ou redirecionar para a lista
    }
}