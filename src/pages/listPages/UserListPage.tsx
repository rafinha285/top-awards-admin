import {BaseListPage} from "./BaseListPage.tsx";
import type {User} from "../../types/User.ts";
import type { Column } from "../../components/ListItem.tsx";

export class UserListPage extends BaseListPage<User> {
    protected getResourceName(): string {
        return "users"
    }

    protected canCreate(): boolean {
        return false
    }

    protected getColumns(): Column<User>[] {
        return [
            {
                header: "Id",
                accessor: "id",
            },
            {
                header: "Nome",
                accessor: "name"
            },
            {
                header: "Email",
                accessor: "email",
            },
            {
                header: "Tipo",
                accessor: "type",
            }
        ]
    }

}