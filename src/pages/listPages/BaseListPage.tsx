import {BasePage, type BaseProps, type BaseState} from "../BasePage.tsx";
import * as React from "react";
import {type Column, ListItem} from "../../components/ListItem.tsx";
import {Link} from "react-router-dom";
import "../../css/listPage.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

export interface BaseListState<T> extends BaseState{
    itens: T[]
}

/**
 * Pagina base para lista
 * @template T Objeto que será exibido (ex: Category)
 * @template P Props (padrão BaseProps)
 * @template S State (padrão BaseListState<T>)
 */
export abstract class BaseListPage<
    T extends { id?: string | number | null },
    P extends BaseProps = BaseProps,
    S extends BaseListState<T> = BaseListState<T>
> extends BasePage<P, S>{
    constructor(props: P) {
        super(props, {
            itens: [],
            loading: true,
            error: null,
            title: "Lista",
        } as unknown as S);
    }

    componentDidMount() {
        super.componentDidMount();
        this.fetchItems();
    }

    protected abstract getResourceName(): string;
    protected abstract getColumns(): Column<T>[];

    protected async fetchItems() {
        try {
            this.setState({ loading: true });
            const resource = this.getResourceName();
            const response = await this.getFromApi<T[] | { data: T[] }>(`/${resource}`);
            const data = Array.isArray(response)
                ? response
                : (response.data as { data: T[] }).data || [];
            this.setState({ itens: data, loading: false } as unknown as Pick<S, keyof S>);
        } catch (error) {
            this.setError(error);
            this.setState({ loading: false });
        }
    }

    protected handleItemClick = (item: T) => {
        const resource = this.getResourceName();
        // Leva para /edit/nomeDoRecurso/id
        this.navigate(`/edit/${resource}/${item.id}`);
    }

    protected renderContent(): React.ReactNode {
        const columns = this.getColumns();

        return (
            <div className="list-page-wrapper">
                <div className="list-header">
                    <h1>{this.state.title}</h1>
                    <Link
                        to={`/create/${this.getResourceName()}`}
                        className={"btn create"}
                    >
                         <FontAwesomeIcon icon={faPlus}/> Novo
                    </Link>
                </div>

                {/* Cabeçalho da Lista (Opcional, estilo tabela) */}
                {/*<div className="list-header-row">*/}
                {/*    {columns.map((col, idx) => (*/}
                {/*        <div key={idx} className="list-header-col" style={{ width: col.width || '100%' }}>*/}
                {/*            {col.header}*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}

                {/* O Esqueleto da Lista */}
                <div className="list-container">
                    {this.state.loading ? (
                        <div className="loading">Carregando...</div>
                    ) : this.state.itens.length > 0 ? (
                        this.state.itens.map((item, index) => (
                            <ListItem
                                key={item.id || index}
                                item={item}
                                columns={columns}
                                onClick={this.handleItemClick} // Passa a função de clique
                            />
                        ))
                    ) : (
                        <div className="empty-state">Nenhum registro encontrado.</div>
                    )}
                </div>
            </div>
        );
    }
}