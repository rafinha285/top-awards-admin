import {BasePage, type BaseProps, type BaseState} from "../BasePage.tsx";
import * as React from "react";
import "../../css/creationPage.scss"
import type {FormSchema, FormState} from "../../types/FromOption.ts";
import type {ChangeEvent, JSX} from "react";

export type BaseCreationPageProps = BaseProps & {
    type: string
}

export type BaseCreationPageState<T> = BaseState & FormState<T>

export abstract class BaseCreationPage<T extends object, F extends FormSchema<T>, P extends BaseProps> extends BasePage<P, FormState<T>> {
    public constructor(props: P, initialState: FormState<T>);
    public constructor(initialState: FormState<T>);
    public constructor(arg1: P| FormState<T>, arg2?: FormState<T>) {
        if(arg2){
            super(arg1 as P, arg2);
        }else{
            super({} as P, arg1 as FormState<T>);
        }
    }
    private typedEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
        return Object.entries(obj) as [keyof T, T[keyof T]][];
    }

    private handleChange = (e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement| HTMLSelectElement>) =>{
        const {id, value} = e.target;
        this.setState(prevState =>({
            ...prevState,
            formData: {
                ...prevState.formData,
                [id]: value
            }
        }))
    }


    protected renderForm(schema: F): React.ReactNode{
        return this.typedEntries(schema).map(([key, field])=> {
            const fieldKey = key as keyof T;
            const value = this.state.formData[fieldKey];
            let inputElement: JSX.Element;

            if(field){
                switch (field.type) {
                    case 'textarea':
                        inputElement = <textarea id={key as string} value={String(value)} onChange={this.handleChange} />
                        break
                    case 'select':
                        inputElement = (
                            <select id={key as string} value={String(value)} onChange={this.handleChange}>
                                {field.options?.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        );
                        break;
                    case 'date':
                        inputElement = <input id={key as string} value={String(value)} type="date" onChange={this.handleChange}/>;
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
            }else{
                return null
            }
        })
    }

    protected abstract handleCreation(): Promise<void>;
    protected abstract getFormSchema(): F;

    protected renderContent(): React.ReactNode {
        const schema = this.getFormSchema();
        return (
            <div className="creation-wrapper">
                <div className="creation-header">
                    <h1>{this.state.title}</h1>
                </div>
                <main className='creation-fields'>
                    {this.renderForm(schema)}
                    <button
                        onClick={()=> this.handleCreation()}
                    >Salvar</button>
                </main>
            </div>
        )
    }
}