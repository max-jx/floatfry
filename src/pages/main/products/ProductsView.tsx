import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import {Product} from "../../../data/products/Product";
import "../../../style/card.css"
import App from "../../../App";
import {AppContext} from "../../../AppContext";
import {useParams, useSearchParams} from "react-router";
import {ProductDetails} from "./ProductDetails";
import {ProductsList} from "./ProductsList";
import {ProductColorOptionDetails} from "./ProductColorOptionDetails";
import {ProductEdit} from "./ProductEdit";
import {ProductColorOptionDetailsEdit} from "./ProductColorOptionDetailsEdit";
import {ProductLidMaterialOptionDetailsEdit} from "./ProductLidMaterialOptionDetailsEdit";
import {ProductHandleMaterialOptionDetailsEdit} from "./ProductHandleMaterialOptionDetailsEdit";
import {ProductLidMaterialOptionDetails} from "./ProductLidMaterialOptionDetails";
import {ProductHandleMaterialOptionDetails} from "./ProductHandleMaterialOptionDetails";

export function ProductsView() {
    const [params] = useSearchParams()

    const action = params.get("action")

    if (action === "new" || action === "edit" || action === "newColorOption" || action === "newLidMaterialOption" || action === "newHandleMaterialOption") {
        if (params.has("colorOptionId") || action === "newColorOption") {
            return <ProductColorOptionDetailsEdit/>
        }
        else if (params.has("lidMaterialOptionId") || action === "newLidMaterialOption") {
            return <ProductLidMaterialOptionDetailsEdit/>
        }
        else if (params.has("handleMaterialOptionId") || action === "newHandleMaterialOption") {
            return <ProductHandleMaterialOptionDetailsEdit/>
        }
        return <ProductEdit/>
    }
    else {
        if (params.has("productId")) {
            if (params.has("colorOptionId")) {
                return <ProductColorOptionDetails/>
            }
            else if (params.has("lidMaterialOptionId")) {
                return <ProductLidMaterialOptionDetails/>
            }
            else if (params.has("handleMaterialOptionId")) {
                return <ProductHandleMaterialOptionDetails/>
            }
            else {
                return <ProductDetails/>
            }
        }
        else {
            return <ProductsList/>
        }
    }
}