import { IoCarSportOutline } from "react-icons/io5";
import { BsPlusCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import PrimarySearchAppBar from "../components/test";
import { useEffect, useState } from "react";
import axios from "axios";
import HelloAdmin from "../components/HelloAdmin";
import CardCars from "../components/CardCars";
import Reservation from "../pages/reservation";

export default function Admin() {
    const [marque, setMarque] = useState("");
    const [modele, setModele] = useState("");
    const [matricule, setMatricule] = useState("");
    const [price, setPrice] = useState("");
    const [fuel, setFuel] = useState("");
    const [image, setImage] = useState(null);

    const [chenge, setChenge] = useState("home");
    const handelChengePost = (e) => {
        e.preventDefault();
        setChenge('post')
    }

    const [cars, setCars] = useState([]);


    const fetchCars = () => {
        axios
            .get("http://localhost:8888/cars")
            .then((response) => {
                setCars(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des voitures:", error);
            });
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const formData = new FormData();
        formData.append("marque", marque);
        formData.append("modele", modele);
        formData.append("matricule", matricule);
        formData.append("price", price);
        formData.append("fuel", fuel);
        formData.append("image", image);

        axios
            .post("http://localhost:8888/cars", formData)
            .then((res) => {
                alert("Car added successfully!");
                setMarque("");
                setModele("");
                setMatricule("");
                setPrice("");
                setFuel("");
                setImage("");
                fetchCars();
            })
            .catch((err) => {
                console.error(err);
                alert("Error adding car");
            });
    };

    return (
        <>
            <PrimarySearchAppBar />
            <br />
            <br />

            <div className="row">
                {/* Sidebar */}
                <div
                    className="sidebar col-md-3 d-none d-lg-flex bg-dark p-0"
                    style={{ zIndex: 1 }}
                >
                    <div className="w-100 vh-100 position-fixed">
                        <br />
                        <br />
                        <br />
                        <div className="d-flex flex-column mt-4 align-items-start vh-100 p-3">
                            <button onClick={() => setChenge("home")} style={{ width: "20%" }} className="btn btn-outline-light mx-4">
                                <IoCarSportOutline size={20} /> H o m e
                            </button>
                            <button onClick={() => setChenge("update")} style={{ width: "20%" }} className="btn btn-outline-light mt-4 mx-4">
                                <BsPencilSquare size={18} /> MY C A R S
                            </button>


                        </div>
                    </div>
                </div>

                {/* Content */}
                <div
                    className="col-md-9 bg-dark"
                    style={{
                        backgroundImage: "url(admin.png)",
                        backgroundAttachment: "fixed",
                        backgroundPosition: "center",
                        zIndex: 2,
                        position: "relative",
                    }}
                >
                    <div className={chenge === "home" ? "" : "d-none"}>
                        <HelloAdmin />
                    </div>

                    <div className={chenge === "post" ? "" : "d-none"}>
                        <div className="d-flex justify-content-center align-items-center vh-100 text-light">
                            <form
                                onSubmit={handleSubmit}
                                className="w-75"
                                style={{
                                    boxShadow: "0 0 3px black",
                                    borderRadius: "10px",
                                    padding: "15px",
                                    backgroundColor: "#212529",
                                }}
                            >
                                <label>add marque</label>
                                <input type="text" className="form-control" value={marque} onChange={(e) => setMarque(e.target.value)} />

                                <label className="mt-4">add modele</label>
                                <input type="text" className="form-control" value={modele} onChange={(e) => setModele(e.target.value)} />

                                <label className="mt-4">add matricule</label>
                                <input type="text" className="form-control" value={matricule} onChange={(e) => setMatricule(e.target.value)} />

                                <label className="mt-4">add price</label>
                                <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />

                                <label className="mt-4">add fuel</label>
                                <input type="text" className="form-control" value={fuel} onChange={(e) => setFuel(e.target.value)} />

                                <label className="mt-4">add image</label>
                                <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />

                                <div className="d-flex justify-content-center mt-3">
                                    <button type="submit" className="btn btn-primary">
                                        add new car
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={chenge === "update" ? "" : "d-none"}>
                        <div className="d-flex justify-content-center sticky-top">
                            <form className="d-flex  w-50 mt-4" role="search">
                                <input className="form-control me-2 mt-4" type="search" placeholder="Search" aria-label="Search" />
                                <div className="mt-4 d-flex">
                                    <div>
                                        <button className="btn btn-success" type="submit">Search</button>
                                    </div>
                                    <div>
                                        <button onClick={handelChengePost} className="btn btn-outline-primary  mx-4">
                                            <BsPlusCircle size={18} />
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="container d-flex justify-content-center mt-4">
                            <div className="row w-100 mt-4">
                                {cars &&
                                    cars.map((car) => (
                                        <div className="col-md-4" key={car.id_car}>
                                            <CardCars
                                                rent="update"
                                                marque={car.marque}
                                                modele={car.model}
                                                price={car.price}
                                                fuel={car.fuel}
                                                image={car.image}
                                                id={car.id_car}
                                                id_car={car.id_car}
                                                onDeleteSuccess={fetchCars}
                                            />
                                        </div>
                                    ))}

                            </div>
                        </div>
                        
                    </div>


                </div>
            </div>







        </>
    );
}
