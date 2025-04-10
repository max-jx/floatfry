import "../../../style/pages/dashboard.css"
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {AppContext} from "../../../AppContext";
import {Supplier} from "../../../data/suppliers/Supplier";
import {Table} from "../../../Table";
import {Suppliers} from "../../../index";
import {SuppliersRepository} from "../../../data/suppliers/SuppliersRepository";

export function SuppliersList() {
    const navigate = useNavigate()

    // const {suppliersRepository} = useContext(AppContext)!

    const [page, setPage] = useState(0)
    const [pagesCount, setPagesCount] = useState(1)
    const [suppliers, setSuppliers] = useState<Supplier[]>([])


    const cols = [
        "Name", "Website", "Email", "Telephone", "Address", "Supplies"
    ]

    // const [rows, setRows] = useState<string[][]>([])

    useEffect(() => {
        const update = async () => {
            const response = await SuppliersRepository.getSuppliers(page)

            if (response) {
                const result = response.result
                const count = response.count

                setSuppliers(result)
                setPagesCount(count)
            }
        }

        update()
    }, [page])

    const showSuppliers = () => {
        console.log("SUPPLIERS", suppliers.length, suppliers)

        if (suppliers.length > 0) {
            const rows = suppliers.map((supplier) => {
                const materials = supplier.materials.length === 1 ? supplier.materials[0].name : `${supplier.materials.length} materials`

                return [
                    supplier.name, supplier.website, supplier.email, supplier.telephone, supplier.address, materials
                ]
            })

            return <Table cols={cols} rows={rows} onSelected={(rowIndex) => {
                const supplierId = suppliers[rowIndex].id

                navigate(`?supplierId=${supplierId}`)
            }}/>
        } else {
            return <p>Nothing to see</p>
        }
    }

    return (
        <div className="container">
            <h2 style={{
                margin: 0
            }}>Suppliers</h2>
            <p>Click on a supplier to view details.</p>

            <div>
                <button className="filled"
                        onClick={(e) => {
                            navigate("./?action=new")
                        }}
                >Add new
                </button>
            </div>

            {showSuppliers()}
        </div>
    )
}