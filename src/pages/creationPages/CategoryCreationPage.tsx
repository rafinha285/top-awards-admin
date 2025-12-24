import { BaseCreationPage } from "./BaseCreationPage.tsx";
import type { Category } from "../../types/Category.ts";
import type Event from "../../types/Event";
import type { BaseProps } from "../BasePage.tsx";
import type { FormOption, FormSchema } from "../../types/FromOption.ts";
import type { BaseFormState } from "../BaseFormPage.tsx";
import { BaseException } from "../../exceptions/BaseException.ts";
import type {Nominee} from "../../types/Nominee.ts";

interface CategoryPageState extends BaseFormState<Category> {
    eventOptions: FormOption[];
    nomineeOptions: FormOption[]; // 1. Nova lista de opções no estado
}

export class CategoryCreationPage extends BaseCreationPage<Category, FormSchema<Category>, BaseProps, CategoryPageState> {

    constructor(props: BaseProps) {
        super(props, {
            error: null,
            title: "Criar categoria",
            loading: true,
            formData: {
                id: null,
                name: "",
                description: "",
                eventId: null,
                event: null,

                // 2. IMPORTANTE: Inicializar array vazio para o backend aceitar
                nomineeIds: [],
                nominees: []
            },
            eventOptions: [],
            nomineeOptions: [] // Inicializa vazio
        } as CategoryPageState);
    }

    async componentDidMount() {
        try {
            // Não precisa setar loading: true (já vem do construtor)

            // 3. Busca Eventos E Nomeados ao mesmo tempo (Paralelo)
            const [eventRes, nomineeRes] = await Promise.all([
                this.getFromApi<Event[]>("/event"),
                this.getFromApi<Nominee[]>("/nominee") // Ajuste a URL conforme sua API
            ]);

            // Verifica erros
            if (!eventRes.data.success) throw new BaseException(eventRes.data);
            if (!nomineeRes.data.success) throw new BaseException(nomineeRes.data);

            const events = eventRes.data.data;
            const nominees = nomineeRes.data.data;

            // Transforma Eventos em Opções
            const evtOptions: FormOption[] = events.map((evt: Event) => ({
                label: evt.name,
                value: evt.id?.toString() || ""
            }));

            // Transforma Nomeados em Opções
            const nomOptions: FormOption[] = nominees.map((nom: Nominee) => ({
                label: nom.name, // Ajuste se o campo for diferente (ex: nom.title)
                value: nom.id?.toString() || ""
            }));

            // Lógica do Auto-Select para o Evento (opcional, mas útil)
            const initialEventId = evtOptions.length > 0 ? evtOptions[0].value : null;

            this.setState(prevState => ({
                eventOptions: evtOptions,
                nomineeOptions: nomOptions, // Salva as opções de nomeados
                loading: false,
                formData: {
                    ...prevState.formData,
                    eventId: initialEventId // Define o primeiro evento como padrão
                }
            } as unknown as Pick<CategoryPageState, keyof CategoryPageState>));

        } catch (error) {
            console.error(error);
            this.setState({ loading: false });
            this.setError(error);
        }
    }

    protected getFormSchema(): FormSchema<Category> {
        const state = this.state as CategoryPageState;

        return {
            name: { label: "Nome", type: "text" },
            description: { label: "Descrição", type: "textarea" },

            // Campos nulos (auxiliares ou controlados por outros inputs)
            event: null,
            id: null,

            // Select Único de Evento
            eventId: {
                label: "Evento",
                type: "select",
                options: state.eventOptions
            },

            // 4. Select Múltiplo de Nomeados
            nomineeIds: {
                label: "Indicados",
                type: "multiselect", // Certifique-se que implementou 'multiselect' na BaseFormPage
                options: state.nomineeOptions
            },
            nominees: null
        };
    }

    protected getResourceName(): string {
        return "category";
    }
}