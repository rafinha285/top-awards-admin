import {BasePage, type BaseProps, type BaseState} from "./BasePage.tsx";
import "../css/homePage.scss"
import {Link} from "react-router-dom";

type HomeState = BaseState & {
}

export class HomePage extends BasePage<BaseProps, HomeState>{
    protected renderContent(): React.ReactNode {
        return (
            <>
                <div className="menu">
                    <Link to={"/edit/event"} className="menu-item">
                        <p>Eventos</p>
                    </Link>
                    <Link to={"/edit/nominee"} className="menu-item">
                        <p>Nomeados</p>
                    </Link>
                    <Link to={"/edit/category"} className="menu-item">
                        <p>Categorias</p>
                    </Link>
                    <Link to={"/moderate/users"} className="menu-item">
                        <p>Gerenciar usuários</p>
                    </Link>
                    <Link to={"/moderate/votes"} className="menu-item">
                        <p>Gerenciar votos</p>
                    </Link>
                </div>
                <div className="graphs">

                </div>
                <div className="details">

                </div>
            </>
        )
    }

}