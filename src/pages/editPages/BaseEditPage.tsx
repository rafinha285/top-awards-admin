import {type BaseProps} from "../BasePage.tsx";
import type {FormSchema} from "../../types/FromOption.ts";
import {BaseFormPage, type BaseFormState} from "../BaseFormPage.tsx";
import {BaseException} from "../../exceptions/BaseException.ts";
import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

export interface EditPageProps extends BaseProps {
    params: { id: string };
}

/**
 * Página base para edição de registros existentes.
 * * @template T  **Entity**: O tipo do objeto que está sendo editado (ex: Category).
 * @template F  **Schema**: A estrutura do formulário (FormSchema<T>).
 * @template P  **Props**: As propriedades do componente (Padrão: EditPageProps).
 * @template S  **State**: O estado do componente (Padrão: BaseFormState<T>).
 */
export abstract class BaseEditPage<
    T extends object,
    F extends FormSchema<T>,
    P extends EditPageProps = EditPageProps,       // Valor padrão adicionado
    S extends BaseFormState<T> = BaseFormState<T>  // Valor padrão adicionado
> extends BaseFormPage<T, F, P, S> {

    constructor(props: P, state: S) {
        super(props, state);
    }

    protected abstract getResourceName(): string;

    // No Edit, geralmente queremos buscar os dados assim que a tela abre
    async componentDidMount() {
        super.componentDidMount(); // Chama o do BasePage se tiver lógica lá
        await this.fetchDataToEdit();
    }

    protected async fetchDataToEdit(): Promise<void> {
        const resource = this.getResourceName();
        const id = this.props.params.id; // Pega o ID da URL

        if (!id) {
            console.error("ID não encontrado na URL");
            return;
        }

        try {
            this.setState({ loading: true });
            const response = await this.getFromApi<T>(`/${resource}/${id}`);

            this.setState({ formData: response.data.data, loading: false });
        } catch (e) {
            this.setError(e);
            this.setState({ loading: false });
        }
    }

    protected headerActions(): React.ReactNode {
        return (
            <button
                className="btn remove"
                onClick={()=>this.handleDelete()}
            >
                <FontAwesomeIcon icon={faTrash}/> Deletar
            </button>
        )
    }

    protected async handleDelete(): Promise<void> {
        const resource = this.getResourceName();
        const id = this.props.params.id;

        try{
            this.setState({loading:true})
            const response = await this.postToApi<null, null>(`/${resource}/${id}/delete`, null)
            if(!response.data.success){
                throw new BaseException(response.data);
            }
            alert("Deletado com sucesso!")
            this.navigate("/home")
        } catch (e) {
            this.setError(e);
        }finally {
            this.setState({loading: false})

        }
    }

    protected async handleSubmit(): Promise<void> {
        const resource = this.getResourceName();
        const id = this.props.params.id;

        try {
            this.setState({ loading: true });
            // Chama a API: PUT /event/123
            const response = await this.postToApi<T, T>(`/${resource}/${id}/update`, this.state.formData);
            if(!response.data.success) {
                throw new BaseException(response.data);
            }
            alert("Atualizado com sucesso!");
            this.navigate("/home");
        } catch (e) {
            this.setError(e);
            this.setState({ loading: false });
        }
    }
}