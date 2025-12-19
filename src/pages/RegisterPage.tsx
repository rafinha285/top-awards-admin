import {BasePage, BaseProps, BaseState} from "./BasePage.tsx";
import * as React from "react";
import User from "../types/User.ts";
import {UserContext} from "../context/UserContext.tsx";

type RegisterPageState = BaseState & {
    name: string,
    email: string,
    password: string,
};
export class RegisterPage extends BasePage<BaseProps, RegisterPageState>{
    static contextType = UserContext;
    declare context: React.ContextType<typeof UserContext>;

    state: RegisterPageState = {
        error: null,
        loading: false,
        title: "Registrar-se",
        name: "",
        email: "",
        password: "",
    };

    private handleSubmit = async() => {
        try{
            interface RegisterResponse {
                token: string;
                user: User
            }

            interface RegisterRequest {
                name: string,
                email: string,
                password: string,
                fingerprint: string,
            }

            const data: RegisterRequest = {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                fingerprint: (await this.getFingerprint()).visitorId,
            }
            const result = (await this.postToApi<RegisterResponse, RegisterRequest>("/auth/register", data)).data

            // if (!result.success) {
            //     throw new AlreadyExistsException(result.message);
            // }

            this.context.login(result.data.user, result.data.token);
            alert(`${result.message}`)
        }catch(error) {
            this.setError(error);
        }
    }

    protected renderContent(): React.ReactNode {
        return <div className={"main-login"}>
            <h2>Registrar-se</h2>
            <input
                className="login-input"
                type="text"
                placeholder="Nome"
                value={this.state.name}
                onChange={v=>this.setState({name:v.target.value})}
            />
            <input
                className="login-input"
                type="email"
                placeholder="E-mail"
                value={this.state.email}
                onChange={v=> this.setState({email: v.target.value})}
            />
            <input
                className="login-input"
                type="password"
                placeholder="Senha"
                value={this.state.password}
                onChange={v=> this.setState({password: v.target.value})}
            />
            <button onClick={this.handleSubmit}>Registrar</button>
        </div>
    }
}