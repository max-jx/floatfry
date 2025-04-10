import "../../../style/pages/dashboard.css"
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {AppContext} from "../../../AppContext";
import {Supplier} from "../../../data/suppliers/Supplier";
import {Table} from "../../../Table";
import {Materials, Products, Suppliers} from "../../../index";
import {Material} from "../../../data/materials/Material";
import {MaterialsRepository} from "../../../data/materials/MaterialsRepository";

export function MaterialsList() {
    const navigate = useNavigate()

    // const {suppliersRepository} = useContext(AppContext)!

    const [page, setPage] = useState(0)
    const [pagesCount, setPagesCount] = useState(1)
    const [materials, setMaterials] = useState<Material[]>([])


    const cols = [
        "Name", "Current stock", "Required quantity", "Suppliers", "Used in"
    ]

    // const [rows, setRows] = useState<string[][]>([])

    useEffect(() => {
        const update = async () => {
            const response = await MaterialsRepository.getMaterials()

            console.log("MATERIALS response", response)

            if (response) {
                const materials = response.result
                setMaterials(materials)
                console.log("MATERIALS, set", materials)
            }
        }

        update()
    }, [page])

    const showMaterials = () => {
        console.log("SUPPLIERS", materials.length, materials)

        if (materials.length > 0) {
            const rows = materials.map((material) => {
                const currentStockText = `${material.availableQuantity}${material.quantityUnit}`
                const requiredStockText = `${material.requiredQuantity}${material.quantityUnit}`
                const suppliersText = material.suppliers.length === 1 ? `${material.suppliers[0].name}` : `${material.suppliers.length} suppliers`
                const productsText = material.products.length === 1 ? material.products[0].name : `${material.products.length} products`

                console.log("MATERIALS products", productsText, material.products)

                return [
                    material.name, currentStockText, requiredStockText, suppliersText, productsText
                ]
            })

            return <Table cols={cols} rows={rows} onSelected={(rowIndex) => {
                const materialId = materials[rowIndex].id

                navigate(`?materialId=${materialId}`)
            }}/>
        } else {
            return <p>Nothing to see</p>
        }
    }

    return (
        <div className="container">
            <h2 style={{
                margin: 0
            }}>Materials</h2>
            <p>Click on a material to view details.</p>

            <div>
                <button className="filled"
                        onClick={(e) => {
                            navigate("./?action=new")
                        }}
                >Add new
                </button>
            </div>

            {showMaterials()}
        </div>
    )
}