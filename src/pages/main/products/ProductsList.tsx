import "../../../style/pages/dashboard.css"
import {useContext, useEffect, useState} from "react";
import {Product} from "../../../data/products/Product";
import "../../../style/card.css"
import {useNavigate} from "react-router";
import {ProductsRepository} from "../../../data/products/ProductsRepository";
import {DateString} from "../../../utils/DateUtils";
import {Table} from "../../../Table";

export function ProductsList() {
    const navigate = useNavigate()

    const [page, setPage] = useState(0)
    const [pagesCount, setPagesCount] = useState(1)
    const [products, setProducts] = useState<Product[]>([])

    const cols = [
        "Name", "Date created", "Technical drawing", "Design specification", "Manufacturing instruction",
        "Color options", "Lid material options", "Handle material options", "Status"
    ]

    useEffect(() => {
        const update = async () => {
            const response = await ProductsRepository.getProducts(page)

            if (response) {
                console.log("PRODUCTS update", response.result)
                setProducts(response.result)
            } else {
                console.log("PRODUCTS no")
            }
        }

        update()
    }, [page])

    const showProducts = () => {
        if (products.length > 0) {

            const rows = products.map((product) => {
                const dateCreatedText = DateString(product.dateCreated)
                const technicalDrawingText = product.technicalDrawings.length === 1 ? "1 file" : `${product.technicalDrawings.length} files`
                const designSpecText = product.designSpec.supportingDocuments.length === 1 ? "1 file" : `${product.designSpec.supportingDocuments.length} files`
                const manufacturingInstructionText = product.manufacturingInstruction.supportingDocuments.length === 1 ? "1 file" : `${product.manufacturingInstruction.supportingDocuments.length} files`
                const colorOptionsText = product.colors.length.toString()
                const lidMaterialOptionsText = product.lidMaterials.length.toString()
                const handleMaterialOptionsText = product.handleMaterials.length.toString()
                const statusText = product.status === "approved" ? "Approved" : "Draft"

                return [
                    product.name, dateCreatedText, technicalDrawingText, designSpecText, manufacturingInstructionText,
                    colorOptionsText, lidMaterialOptionsText, handleMaterialOptionsText, statusText
                ]
            })

            return <Table cols={cols} rows={rows} onSelected={(rowIndex) => {
                const productId = products[rowIndex].id

                navigate(`./?productId=${productId}`)
            }}/>
        } else {
            return <p>Nothing to see</p>
        }
    }

    return (
        <div className="container">
            <h2 style={{
                margin: 0
            }}>Products</h2>
            <p>Click on a product to view details.</p>

            <div>
                <button className="filled"
                        onClick={(e) => {
                            navigate("./?action=new")
                        }}
                >Upload new
                </button>
            </div>

            <div style={{
                marginTop: 24,
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12
            }}>
                {showProducts()}
            </div>
        </div>
    )
}