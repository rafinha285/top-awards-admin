import {BaseComponent} from "./BaseComponent.tsx"
import type {BaseState} from "../pages/BasePage.tsx";
import type {Category} from "../types/Category.ts";

type CatProps = {
    category: Category
}

type CatState = BaseState & {}

export class CategoryComponent extends BaseComponent<CatProps, CatState>{
    render() {
        return <div>

        </div>
    }

}