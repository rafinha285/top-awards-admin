import {BaseListPage, type BaseListState} from "./BaseListPage.tsx";
import type {Category} from "../../types/Category.ts";
import type {BaseProps} from "../BasePage.tsx";
import type { Column } from "../../components/ListItem.tsx";
import type Event from "../../types/Event.ts";

export class CategoryListPage extends BaseListPage<Category, BaseProps, BaseListState<Category>> {
    protected getResourceName(): string {
        return "category"
    }
    protected getColumns(): Column<Category>[] {
        return [
            {
                header: "Id",
                accessor: "id",
            },
            {
                header: "Nome",
                accessor: "name",
                // width: "40%" // Essa coluna ocupa 40%
            },
            {
                header: "Descrição",
                accessor: "description",
            },
            {
                header: "Evento",
                accessor: "event",
                render: (val) => (val as Event)?.name || "Sem evento"
            }
        ]
    }

}