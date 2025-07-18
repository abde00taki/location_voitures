import { IoCarSportOutline } from "react-icons/io5";
import PrimarySearchAppBar from "../components/test";
import { useState } from "react";
import axios from "axios";

export default function Admin() {
    const [marque, setMarque] = useState("")
    const [modele, setModele] = useState("")
    const [matricule, setMatricule] = useState("")
    const [price, setPrice] = useState("")
    const [fuel, setFuel] = useState("")
    const [image, setImage] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("marque", marque);
        formData.append("modele", modele);
        formData.append("matricule", matricule);
        formData.append("price", price);
        formData.append("fuel", fuel);
        formData.append("image", image);

        axios.post("http://localhost:8888/cars", formData)
            .then(res => {
                alert("Car added successfully!");
                setMarque("")
                setModele("")
                setMatricule("")
                setPric("")
                setFuel("")
                setImage("")
                console.log(res.data);
            })
            .catch(err => {
                
                console.error(err);
                alert("Error adding car");
            });
    }

    return (
        <>
            <div className="row w-100">
                <div className="col-md-3 d-none d-lg-flex ">
                    <div className="bg-dark w-25 vh-100 position-fixed">
                        <div>
                            <h5 className="text-light mt-3 mx-4">
                                <IoCarSportOutline className="fs-1" /> LOCATION
                            </h5>
                            <hr className="text-light w-100 mt-0" />
                        </div>
                    </div>
                </div>

                <div className="col-md-9"
                    style={{
                        backgroundImage: "url(admin.png)",
                        backgroundPosition: "right",
                        backgroundAttachment: "fixed"
                    }}>
                    <PrimarySearchAppBar />

                    <div className="d-flex justify-content-center align-items-center vh-100 text-light">
                        <form
                            onSubmit={handleSubmit}
                            className="w-75"
                            style={{
                                boxShadow: "0 0 3px black",
                                borderRadius: "10px",
                                padding: "15px",
                                backgroundColor: "rgba(0, 0, 0, 0.500)"
                            }}
                        >
                            <label>add marque</label>
                            <input type="text" className="form-control"
                                value={marque} onChange={(e) => setMarque(e.target.value)} />

                            <label className="mt-4">add modele</label>
                            <input type="text" className="form-control"
                                value={modele} onChange={(e) => setModele(e.target.value)} />

                            <label className="mt-4">add matricule</label>
                            <input type="text" className="form-control"
                                value={matricule} onChange={(e) => setMatricule(e.target.value)} />

                            <label className="mt-4">add price</label>
                            <input type="number" className="form-control"
                                value={price} onChange={(e) => setPrice(e.target.value)} />

                            <label className="mt-4">add fuel</label>
                            <input type="text" className="form-control"
                                value={fuel} onChange={(e) => setFuel(e.target.value)} />

                            <label className="mt-4">add image</label>
                            <input type="file" className="form-control"
                                onChange={(e) => setImage(e.target.files[0])} />

                            <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary">
                                    add new car
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
