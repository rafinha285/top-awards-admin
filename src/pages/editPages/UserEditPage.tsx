import {BaseEditPage} from "./BaseEditPage.tsx";
import {type User, UserType} from "../../types/User.ts";
import type {FormOption, FormSchema} from "../../types/FromOption.ts";
import type {BaseProps} from "../BasePage.tsx";
import {useParams} from "react-router-dom";
import type {BaseFormState} from "../BaseFormPage.tsx";

class UserEditPageInternal extends BaseEditPage<User, FormSchema<User>>{
    protected getResourceName(): string {
        return "users"
    }

    state: BaseFormState<User> = {
        error: null,
        title: "Editar usuario",
        loading: false,
        formData: {
            id: null,
            name: "",
            email: "",
            type: UserType.USER
        }
    };

    canDelete(): boolean {
        return false
    }

    protected getFormSchema(): FormSchema<User> {
        const typeOptions: FormOption[] = Object.values(UserType).map(val => ({
            label: val,
            value: val
        }));
        return {
            id: {label: "Id", type:"readonly"},
            email: {label: "Email", type: "readonly"},
            name: {label: "Nome", type: "text"},
            type: {label: "Tipo", type: "select", options: typeOptions},
        }
    }

}

export const UserEditPage = (props: BaseProps) => {
    // 2. Pegamos os params
    const params = useParams();

    // 3. Fazemos o Cast 'as { id: string }'
    // Isso resolve o erro "Property id is missing..."
    return (
        <UserEditPageInternal
            {...props}
            params={params as { id: string }}
        />
    );
};