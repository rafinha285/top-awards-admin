import {BaseFormPage, type BaseFormState} from "../BaseFormPage.tsx";
import type {BaseProps} from "../BasePage.tsx";
import type {FormSchema} from "../../types/FromOption.ts";

/**
 * Página base para criação de novos registros.
 * @template T  **Entity**: O tipo do objeto que será criado (ex: Category).
 * @template F  **Schema**: A estrutura do formulário (FormSchema<T>).
 * @template P  **Props**: As propriedades do componente (Padrão: BaseProps).
 * @template S  **State**: O estado do componente (Padrão: BaseFormState<T>).
 */
export abstract class BaseCreationPage<
    T extends object,
    F extends FormSchema<T>,
    P extends BaseProps = BaseProps,               // Valor padrão adicionado
    S extends BaseFormState<T> = BaseFormState<T>  // Valor padrão adicionado
> extends BaseFormPage<T, F, P, S> {
    protected abstract getResourceName(): string;

    protected async handleSubmit(): Promise<void> {
        const resource = this.getResourceName();
        // POST /event com o formData
        await this.postToApi(`/${resource}/new`, this.state.formData);

        alert("Criado com sucesso!");
        this.navigate("/home"); // Ou redirecionar para a lista
    }
}