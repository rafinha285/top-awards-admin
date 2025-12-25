import { BaseFormPage, type BaseFormState } from "../BaseFormPage.tsx";
import type { BaseProps } from "../BasePage.tsx";
import type { FormSchema } from "../../types/FromOption.ts";
import { BaseException } from "../../exceptions/BaseException.ts";

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

        try {
            this.setState(prevState => ({ ...prevState, loading: true }));

            const response = await this.postToApi<T, T>(`/${resource}/new`, this.state.formData);

            if (!response.data.success) {
                throw new BaseException(response.data);
            }

            alert("Criado com sucesso!");
            this.navigate("/home");
        } catch (e) {
            this.setError(e);
        } finally {
            this.setState(prevState => ({ ...prevState, loading: false }));
        }
    }
}