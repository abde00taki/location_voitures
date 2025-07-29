import { useEffect, useState } from "react";
import { FaHeart, FaStar, FaTrashAlt } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import NavBar from "../components/NavBar";

export default function Seved() {
    const [savedCars, setSavedCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // قراءة السيارات المحفوظة من localStorage
        const allKeys = Object.keys(localStorage);
        const carKeys = allKeys.filter((key) => key.startsWith("saved-"));
        const cars = carKeys.map((key) => JSON.parse(localStorage.getItem(key)));
        setSavedCars(cars);
    }, []);

    const handleRemove = (id_car) => {
        localStorage.removeItem(`saved-${id_car}`);
        setSavedCars((prev) => prev.filter((car) => car.id_car !== id_car));
    };

    return (
        <PageWrapper >
            <div className="d-none d-lg-flex">
                <NavBar show={true} />
            </div>
            <div className="container py-4 mt-4">
                <h2 className="mb-4 text-center mt-4" style={{ color: "rgba(251, 138, 1, 1)" }}>
                    Saved Cars
                </h2>
                {savedCars.length === 0 ? (
                    <div className="text-center text-muted">No saved cars yet.</div>
                ) : (
                    <div className="row">
                        {savedCars.map((car) => (
                            <div className="col-md-6 col-lg-4 mb-4" key={car.id_car}>
                                <div className="card shadow-sm h-100" style={{ position: "relative" }}>
                                    {/* النجمة */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "10px",
                                            left: "10px",
                                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                                            color: "white",
                                            padding: "2px 6px",
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            display: "flex",
                                            alignItems: "center",
                                            zIndex: 2
                                        }}
                                    >
                                        {car.star} <FaStar color="rgb(251,175,1)" style={{ marginLeft: "4px" }} />
                                    </div>

                                    <img
                                        src={`http://localhost:8888/uploads/${car.image}`}
                                        className="card-img-top"
                                        alt={car.marque}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-success">{car.marque}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{car.modele}</h6>
                                        <p className="mb-1"><strong>Fuel:</strong> {car.fuel}</p>
                                        <p className="mb-1"><strong>Price:</strong> {car.price}DH</p>
                                        <NavLink to={'/resrvation/' + car.id_car} className="mt-4"><MdAssignmentAdd size={35} /></NavLink>
                                        <button
                                            className="btn  mt-4"
                                            onClick={() => handleRemove(car.id_car)}
                                        >
                                            <FaHeart color="red" size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageWrapper>
    );
}
