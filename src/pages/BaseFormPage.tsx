import {BasePage, type BaseProps, type BaseState} from "./BasePage.tsx";
import type {FormSchema, FormState} from "../types/FromOption.ts";
import  {type ChangeEvent, type JSX} from "react";
import "../css/creationPage.scss"
import * as React from "react";

export interface BaseFormState<T> extends BaseState, FormState<T> {}

export abstract class BaseFormPage<
    T extends object,
    F extends FormSchema<T>,
    P extends BaseProps,
    S extends BaseFormState<T>
> extends BasePage<P, S>{
    public constructor(props: P, initialState: S);
    public constructor(initialState: S);
    public constructor(arg1: P | S, arg2?: S) {
        if (arg2) {
            super(arg1 as P, arg2);
        } else {
            super({} as P, arg1 as S);
        }
    }

    private typedEntries<O extends object>(obj: O): [keyof O, O[keyof O]][] {
        return Object.entries(obj) as [keyof O, O[keyof O]][];
    }

    protected handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {id, value} = e.target;
        this.setState(prevState => ({
            ...prevState,
            formData: {
                ...prevState.formData,
                [id]: value
            }
        }));
    }

    protected renderForm(schema: F): React.ReactNode {
        if(!this.state.formData) {
            return null
        }
        return this.typedEntries(schema).map(([key, field]) => {
            const fieldKey = key as keyof T;
            // Usa 'any' aqui pontualmente ou string para evitar erro de indexação,
            // mas mantendo a segurança do T no state
            const value = this.state.formData[fieldKey];
            let inputElement: JSX.Element;

            if (field) {
                switch (field.type) {
                    case 'textarea':
                        inputElement = <textarea id={key as string} value={String(value)} onChange={this.handleChange}/>
                        break
                    case 'select':
                        inputElement = (
                            <select id={key as string} value={String(value)} onChange={this.handleChange}>
                                <option value="" disabled>Selecione...</option>
                                {field.options?.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        );
                        break;
                    case 'date':
                        inputElement = <input id={key as string} value={String(value)} type="date" onChange={this.handleChange}/>;
                        break;
                    case 'readonly':
                        inputElement = (
                            <input
                                id={key as string}
                                value={String(value)}
                                type="text"
                                disabled
                                style={{ backgroundColor: "#e9ecef" , cursor: "not-allowed", color: '#6c757d'}}
                            />
                        )
                        break;
                    case 'text':
                    default:
                        inputElement = <input id={key as string} value={String(value)} onChange={this.handleChange}/>;
                        break;
                }
                return (
                    <div className="section" key={key as string}>
                        <label htmlFor={key as string}>{field.label}</label>
                        {inputElement}
                    </div>
                )
            } else {
                return null
            }
        })
    }
    protected headerActions(): React.ReactNode {
        return null
    }

    protected abstract getFormSchema(): F;

    protected abstract handleSubmit(): Promise<void>;

    protected renderContent(): React.ReactNode {
        const schema = this.getFormSchema();
        return (
            <div className="form-wrapper">
                <div className="form-header">
                    <h1>{this.state.title}</h1>
                    <div className="header-actions">
                        {this.headerActions()}
                    </div>
                </div>
                <main className='fields'>
                    {this.renderForm(schema)}
                    <button
                        // Botão desabilita se estiver carregando (herdado de BaseState)
                        disabled={this.state.loading}
                        onClick={() => this.handleSubmit()}
                    >
                        {this.state.loading ? "Salvando..." : "Salvar"}
                    </button>
                </main>
            </div>
        )
    }
}