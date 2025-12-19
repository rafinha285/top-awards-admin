import {BasePage, type BaseProps, type BaseState} from "./BasePage.tsx";
import "../css/homePage.scss"

type HomeState = BaseState & {
}

export class HomePage extends BasePage<BaseProps, HomeState>{
    protected renderContent(): React.ReactNode {
        return (
            <div className="main-home-wrapper">
                <div className="main-home">
                    <div className="menu">
                        <button className="menu-item">
                            <p>Criar Evento</p>
                        </button>
                        <a className="menu-item">
                            <p>Criar Nomeado</p>
                        </a>
                        <a className="menu-item">
                            <p>Criar Categoria</p>
                        </a>
                        <a className="menu-item">
                            <p>Gerenciar usuários</p>
                        </a>
                    </div>
                    <div className="graphs">

                    </div>
                    <div className="details">

                    </div>
                </div>
            </div>
        )
    }

}