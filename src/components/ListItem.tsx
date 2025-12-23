import * as React from "react";

export interface Column<T> {
    header?: string;
    accessor: keyof T;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
    width?: string;
}
interface ListItemProps<T> {
    item: T;
    columns: Column<T>[];
    onClick: (item: T) => void;
}

export class ListItem<T> extends React.PureComponent< ListItemProps<T>> {
    render() {
        const { item, columns, onClick } = this.props;

        return (
            <div
                className="list-item-row"
                onClick={() => onClick(item)}
            >
                {columns.map((col, index) => (
                    <div
                        key={index}
                        className="list-item-col"
                        style={{ width: col.width || '100%' }} // Flex basis
                    >
                        {/* Se tiver header definido e você quiser mostrar inline (tipo mobile), pode por aqui */}
                         <p className="mobile-label">{col.header}: </p>

                        <p className="col-content">
                            {col.render
                                ? col.render(item[col.accessor], item)
                                : String(item[col.accessor] || "")}
                        </p>
                    </div>
                ))}
            </div>
        );
    }
}