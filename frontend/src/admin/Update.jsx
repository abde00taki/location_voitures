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
                                
                                style={{ width: "20%" }}
                                className="btn btn-outline-light mx-4"
                            >
                                <Link to={'/admin'}><IoCarSportOutline size={20} /> H o m e</Link>
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
                        <div className="d-flex justify-content-center align-items-center vh-100 text-light">
                            <div
                                className="card shadow-lg"
                                style={{
                                    width: "75%",
                                    backgroundColor: "#2c2f33",
                                    borderRadius: "12px",
                                }}
                            >
                                <div className="card-header text-center bg-dark text-light">
                                    <h4>Update Car</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} className="text-light">
                                        <div className="mb-3">
                                            <label className="form-label">Marque</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="e.g. BMW"
                                                value={marque}
                                                onChange={(e) => setMarque(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Modele</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="e.g. X5"
                                                value={modele}
                                                onChange={(e) => setModele(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Matricule</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="e.g. 1234-ABC"
                                                value={matricule}
                                                onChange={(e) => setMatricule(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Price</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Price per day"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Fuel</label>
                                            <select
                                                className="form-select"
                                                value={fuel}
                                                onChange={(e) => setFuel(e.target.value)}
                                            >
                                                <option value="">-- Select fuel type --</option>
                                                <option value="essence">Essence</option>
                                                <option value="diesel">Diesel</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                onChange={(e) => setImage(e.target.files[0])}
                                            />
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary w-100">
                                                Update Car
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
            </div>
        </>

    );
}
