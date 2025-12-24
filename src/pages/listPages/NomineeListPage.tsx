import {BaseListPage} from "./BaseListPage.tsx";
import type {Nominee} from "../../types/Nominee.ts";
import type { Column } from "../../components/ListItem.tsx";

export class NomineeListPage extends BaseListPage<Nominee> {
    protected getResourceName(): string {
        return "nominee"
    }
    protected getColumns(): Column<Nominee>[] {
        return [
            {
                header: "Nome",
                accessor: "name"
            },
            {
                header: "Id",
                accessor: "id"
            }
        ]
    }

}