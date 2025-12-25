import { BaseEditPage } from "./BaseEditPage.tsx";
import type { Nominee } from "../../types/Nominee.ts";
import type { FormSchema } from "../../types/FromOption.ts";
import type { BaseProps } from "../BasePage.tsx";
import { useParams } from "react-router-dom";
import type {BaseFormState} from "../BaseFormPage.tsx";

class NomineeEditPageInternal extends BaseEditPage<Nominee, FormSchema<Nominee>> {
    protected getResourceName(): string {
        return "nominee"
    }
    protected getFormSchema(): FormSchema<Nominee> {
        return {
            id: { label: "Id", type: "readonly" },
            name: { label: "Nome", type: "text" },
            imageUrl: { label: "Imagem", type: "image" },
        }
    }

    state: BaseFormState<Nominee> = {
        title: "Editar Nomeado",
        error: null,
        loading: false,
        formData:{
            id: null,
            name: "",
            imageUrl: "",
        }
    }

}

export const NomineeEditPage = (props: BaseProps) => {
    // 2. Pegamos os params
    const params = useParams();

    // 3. Fazemos o Cast 'as { id: string }'
    // Isso resolve o erro "Property id is missing..."
    return (
        <NomineeEditPageInternal
            {...props}
            params={params as { id: string }}
        />
    );
};