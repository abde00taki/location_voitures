import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PrimarySearchAppBar from "../components/test";
import { IoCarSportOutline } from "react-icons/io5";
import { BsPencilSquare, BsPlusCircle, BsTrash } from "react-icons/bs";

export default function UpdateCar({ onUpdateSuccess }) {
    const { id } = useParams();
    const [marque, setMarque] = useState("");
    const [modele, setModele] = useState("");
    const [matricule, setMatricule] = useState("");
    const [price, setPrice] = useState("");
    const [fuel, setFuel] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8888/cars/${id}`)
            .then((res) => {
                const car = res.data;
                setMarque(car.marque);
                setModele(car.modele);
                setMatricule(car.matricule);
                setPrice(car.price);
                setFuel(car.fuel);
            })
            .catch((err) => {
                console.error(err);
                alert("Error fetching car data");
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("marque", marque);
        formData.append("modele", modele);
        formData.append("matricule", matricule);
        formData.append("price", price);
        formData.append("fuel", fuel);

        if (image) {
            formData.append("image", image);
        }

        axios
            .put(`http://localhost:8888/cars/${id}`, formData)
            .then((res) => {
                alert("Car updated successfully");
                if (onUpdateSuccess) onUpdateSuccess();
            })
            .catch((err) => {
                console.error(err);
                alert("Error updating car");
            });
    };

    return (


        <>
            <PrimarySearchAppBar />
            <br />
            <br />

            <div className="row vh-100">
                {/* Sidebar */}
                <div
                    className="sidebar col-md-3 d-none d-lg-flex bg-dark p-0"
                    style={{ zIndex: 1 }} // make sidebar behind content
                >
                    <div className="w-100 vh-100 position-fixed">
                        <br />
                        <br />
                        <br />
                        <div className="d-flex flex-column mt-4 align-items-start vh-100 p-3">
                            <button
                                onClick={() => setChenge("home")}
                                style={{ width: "20%" }}
                                className="btn btn-outline-light mx-4"
                            >
                                <Link to={'/admin'}><IoCarSportOutline size={20} /> H o m e</Link>
                            </button>

                            <button
                                onClick={() => setChenge("post")}
                                style={{ width: "20%" }}
                                className="btn btn-outline-light mt-4 mx-4"
                            >
                                <BsPlusCircle size={18} /> P O S T
                            </button>

                            <button
                                onClick={() => setChenge("update")}
                                style={{ width: "20%" }}
                                className="btn btn-outline-light mt-4 mx-4"
                            >
                                <BsPencilSquare size={18} /> U P D A T E
                            </button>

                            <button
                                onClick={() => setChenge("delete")}
                                style={{ width: "20%" }}
                                className="btn btn-outline-light mt-4 mx-4"
                            >
                                <BsTrash size={18} /> D E L E T E
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div
                    className="col-md-9 bg-dark"
                    style={{
                        backgroundImage: "url(/admin.png)",
                        backgroundAttachment: "fixed",
                        backgroundPosition: "center",
                        zIndex: 2,
                        position: "relative", // bring content above sidebar
                    }}
                >

                    <div className="container mt-4">
                        <h2>Update Car</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Marque</label>
                            <input
                                type="text"
                                className="form-control"
                                value={marque}
                                onChange={(e) => setMarque(e.target.value)}
                            />

                            <label className="mt-3">Modele</label>
                            <input
                                type="text"
                                className="form-control"
                                value={modele}
                                onChange={(e) => setModele(e.target.value)}
                            />

                            <label className="mt-3">Matricule</label>
                            <input
                                type="text"
                                className="form-control"
                                value={matricule}
                                onChange={(e) => setMatricule(e.target.value)}
                            />

                            <label className="mt-3">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <label className="mt-3">Fuel</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fuel}
                                onChange={(e) => setFuel(e.target.value)}
                            />

                            <label className="mt-3">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setImage(e.target.files[0])}
                            />

                            <button type="submit" className="btn btn-primary mt-4">
                                Update Car
                            </button>
                        </form>
                    </div>



                </div>
            </div>
        </>

    );
}
