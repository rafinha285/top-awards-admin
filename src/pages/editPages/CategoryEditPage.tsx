import {BaseEditPage, type EditPageProps} from "./BaseEditPage.tsx";
import type {FormOption, FormSchema} from "../../types/FromOption.ts";
import type {Category} from "../../types/Category.ts";
import type {BaseFormState} from "../BaseFormPage.tsx";
import type {BaseProps} from "../BasePage.tsx";
import {useParams} from "react-router-dom";
import type Event from "../../types/Event.ts";
import type {Nominee} from "../../types/Nominee.ts";
import {BaseException} from "../../exceptions/BaseException.ts";

interface CategoryPageState extends BaseFormState<Category> {
    eventOptions: FormOption[];
    nomineeOptions: FormOption[]; // 1. Nova lista de opções no estado
}

class CategoryEditPageInternal extends BaseEditPage<Category, FormSchema<Category>, EditPageProps, CategoryPageState>{
    constructor(props: EditPageProps) {
        super(props, {
            loading: true,
            error: null,
            title: "Editar Categoria",
            formData: {
                id: null,
                name: "",
                description: "",
                eventId: null,
                event: null,
                nomineeIds: [], // Inicializa vazio,
                nominees: []
            },
            eventOptions: [],
            nomineeOptions: []
        } as CategoryPageState);
    }
    protected getResourceName(): string {
        return "category"
    }

    async componentDidMount() {
        await super.componentDidMount()
        try {
            const id = this.props.params.id;

            const [categoryRes, eventRes, nomineeRes] = await Promise.all([
                this.getFromApi<Category>(`/${this.getResourceName()}/${id}`),
                this.getFromApi<Event[]>("/event"),
                this.getFromApi<Nominee[]>("/nominee")
            ]);

            if (!categoryRes.data.success) throw new BaseException(categoryRes.data);
            if (!eventRes.data.success) throw new BaseException(eventRes.data);
            if (!nomineeRes.data.success) throw new BaseException(nomineeRes.data);
            console.log("categorias", categoryRes.data.data);
            console.log("eventos", eventRes.data);
            console.log("nominee", nomineeRes.data);
            const categoryData = categoryRes.data.data; // O objeto categoria do banco
            const eventsData = eventRes.data.data;      // Lista de eventos
            const nomineesData = nomineeRes.data.data;  // Lista de indicados

            const evtOptions: FormOption[] = eventsData.map((evt: Event) => ({
                label: evt.name,
                value: evt.id?.toString() || ""
            }));

            const nomOptions: FormOption[] = nomineesData.map((nom: Nominee) => ({
                label: nom.name,
                value: nom.id?.toString() || ""
            }));

            const formData: Category = {
                id: categoryData.id,
                name: categoryData.name,
                description: categoryData.description,
                event: null, // Não usado no form visual

                // Extrai o ID do evento aninhado
                eventId: categoryData.event?.id || null,

                // Extrai os IDs da lista de indicados aninhada
                nomineeIds: categoryData.nominees
                    ? categoryData.nominees.map(n => n.id!)
                    : [],
                nominees:[]
            };

            this.setState({
                eventOptions: evtOptions,
                nomineeOptions: nomOptions,
                formData: formData, // Preenche os inputs com os dados do banco
                loading: false
            } as unknown as Pick<CategoryPageState, keyof CategoryPageState>);

        } catch (error) {
            console.error(error);
            this.setState({ loading: false });
            this.setError(error);
        }
    }

    protected getFormSchema(): FormSchema<Category> {
        const state = this.state
        return {
            id:{label: "Id", type: "readonly"},
            name:{label: "Nome", type: "text"},
            description: {label: "Descrição", type: "textarea"},
            eventId: {
                label: "Evento",
                type: "select",
                options: state.eventOptions,
            },
            event: null,
            nomineeIds: {
                label: "Indicados",
                type: "multiselect", // Certifique-se que implementou 'multiselect' na BaseFormPage
                options: state.nomineeOptions
            },
            nominees: null
        }
    }
}

export const CategoryEditPage = (props: BaseProps) => {
    // 2. Pegamos os params
    const params = useParams();

    // 3. Fazemos o Cast 'as { id: string }'
    // Isso resolve o erro "Property id is missing..."
    return (
        <CategoryEditPageInternal
            {...props}
            params={params as { id: string }}
        />
    );
};