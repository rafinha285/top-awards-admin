import {BaseListPage, type BaseListState} from "./BaseListPage.tsx";
import type Event from "../../types/Event.ts"
import type {BaseProps} from "../BasePage.tsx";
import type {Column} from "../../components/ListItem.tsx";

export class EventListPage extends BaseListPage<Event, BaseProps, BaseListState<Event>>{
    protected getColumns(): Column<Event>[] {
        return [
            {
                header: "Nome",
                accessor: "name",
                // width: "40%" // Essa coluna ocupa 40%
            },
            {
                header: "Data",
                accessor: "startDate",
                // width: "30%",
                render: (val) => new Date(String(val)).toLocaleDateString()
            },
        ];
    }

    protected getResourceName(): string {
        return "event";
    }

}