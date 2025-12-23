import {type BaseProps} from "../BasePage.tsx";
import type {FormSchema} from "../../types/FromOption.ts";
import {BaseFormPage, type BaseFormState} from "../BaseFormPage.tsx";
import {BaseException} from "../../exceptions/BaseException.ts";

export interface EditPageProps extends BaseProps {
    params: { id: string };
}

export abstract class BaseEditPage<T extends object, F extends FormSchema<T>, P extends EditPageProps>
    extends BaseFormPage<T, F, P, BaseFormState<T>> {

    constructor(props: P) {
        super(props, {
            loading: true, // Começa carregando para evitar renderizar form vazio
            error: null,
            title: "Carregando...", // Título temporário
            formData: {} as T // Objeto vazio para não dar undefined
        });
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