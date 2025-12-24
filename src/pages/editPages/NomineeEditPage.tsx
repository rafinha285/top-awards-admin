import {BaseEditPage} from "./BaseEditPage.tsx";
import type {Nominee} from "../../types/Nominee.ts";
import type {FormSchema} from "../../types/FromOption.ts";
import type {BaseProps} from "../BasePage.tsx";
import {useParams} from "react-router-dom";

class NomineeEditPageInternal extends BaseEditPage<Nominee, FormSchema<Nominee>>{
    protected getResourceName(): string {
        return "nominee"
    }
    protected getFormSchema(): FormSchema<Nominee> {
        return {
            id: {label: "Id", type: "readonly"},
            name: {label: "Nome", type: "text"}
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