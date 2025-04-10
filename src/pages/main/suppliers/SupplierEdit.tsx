import "../../../style/form.css"
import React, {FormEvent, useContext, useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import {AppContext} from "../../../AppContext";
import {Supplier} from "../../../data/suppliers/Supplier";
import BackIcon from "../../../back.svg";
import {SuppliersRepository} from "../../../data/suppliers/SuppliersRepository";


export function SupplierEdit() {
    const {suppliersRepository} = useContext(AppContext)!
    const ref = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const action = params.get("action")
    const supplierId = params.get("supplierId")!

    const [supplier, setSupplier] = useState<Supplier | null>(null)


    const [name, setName] = useState("")
    const [website, setWebsite] = useState("")
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")
    const [address, setAddress] = useState("")

    useEffect(() => {
        const update = async () => {
            if (action === "edit") {
                const response = await SuppliersRepository.getSupplier(supplierId)

                if (response) {
                    const result = response.result

                    setSupplier(result)

                    setName(result.name)
                    setWebsite(result.website)
                    setEmail(result.email)
                    setTelephone(result.telephone)
                    setAddress(result.address)

                    console.log("SUPPLIER exists")
                }
                else {
                    console.log("SUPPLIER no")
                }
            }
        }

        update()
    }, [action, supplierId]);

    const [errorVisible, setErrorVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const showErrorMessage = () => {
        if (errorVisible) {
            return <p className="error">{errorMessage}</p>
        }
    }

    return (
        <div className="container" style={{
            display: "flex",
            flexDirection: "column",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12
            }}>
                <button className="text icon"
                        onClick={(e) => navigate("./")}
                ><img src={BackIcon}/></button>

                <button className="filled"
                        onClick={(e) => {
                            e.preventDefault()
                            const formData = new FormData(ref.current!)

                            const data = Array.from(formData.entries())
                            const isValid = !data.some(([_, value]) => value === '')

                            if (isValid) {
                                const supplier = {
                                    name: formData.get("name")!.toString(),
                                    website: formData.get("website")!.toString(),
                                    email: formData.get("email")!.toString(),
                                    telephone: formData.get("telephone")!.toString(),
                                    address: formData.get("address")!.toString(),
                                }

                                let response: Promise<number>

                                if (action === "edit") {
                                    response = SuppliersRepository.updateSupplier(supplierId, supplier)
                                }
                                else {
                                    response = SuppliersRepository.addSupplier(supplier)
                                }

                                response.then((status) => {
                                    console.log("suppliers", action, status)
                                })
                            }
                            else {
                                setErrorMessage("Please fill out all fields")
                                setErrorVisible(true)
                            }
                        }}
                >Done
                </button>
            </div>

            <h2>{action === "edit" ? "Edit supplier" : "Add new supplier"}</h2>
            {showErrorMessage()}
            <form ref={ref}
                  onChange={(e) => setErrorVisible(false)}
            >
                <label>Name</label>
                <input name="name" type="text" defaultValue={name}/>
                <label>Website</label>
                <input name="website" type="text" defaultValue={website}/>
                <label>Email address</label>
                <input name="email" type="email" defaultValue={email}/>
                <label>Telephone</label>
                <input name="telephone" type="text" defaultValue={telephone}/>
                <label>Address</label>
                <input name="address" type="text" defaultValue={address}/>
            </form>

        </div>
    )
}