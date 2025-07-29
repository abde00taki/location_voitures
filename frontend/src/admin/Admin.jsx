import { IoCarSportOutline } from "react-icons/io5";
import { BsPlusCircle, BsPencilSquare } from "react-icons/bs";
import PrimarySearchAppBar from "../components/test";
import { useEffect, useState } from "react";
import axios from "axios";
import HelloAdmin from "../components/HelloAdmin";
import CardCars from "../components/CardCars";
import Reserve from "./Reserv";
import Accepted from "./Accept";
import Rejected from "./Rejected";
import { Autocomplete, TextField, Alert } from "@mui/material";


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
        setChenge('post');
    };
    const handelChengeAcceptComond = (e) => {
        e.preventDefault();
        setChenge('accept');
    };
    const handelChengeRefuse = (e) => {
        e.preventDefault();
        setChenge('refuse');
    };

    const [pendingCount, setPendingCount] = useState(0);
    const fetchPendingCount = () => {
        axios.get("http://localhost:8888/rent")
            .then(res => {
                const count = res.data.filter(r => r.status === "pending").length;
                setPendingCount(count);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchPendingCount();
        const interval = setInterval(fetchPendingCount, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleClearNotifications = (e) => {
        e.preventDefault();
        setChenge('comond');
        setPendingCount(0);
    };

    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [marques, setMarques] = useState([]);
    const [search, setSearch] = useState("");

    const fetchCars = () => {
        axios
            .get("http://localhost:8888/cars")
            .then((response) => {
                setCars(response.data);
                setFilteredCars(response.data);
                const uniqueMarques = [...new Set(response.data.map(car => car.marque))];
                setMarques(uniqueMarques);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des voitures:", error);
            });
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleSearchChange = (event, value) => {
        setSearch(value);
        if (!value) {
            setFilteredCars(cars);
            return;
        }
        const filtered = cars.filter(car =>
            car.marque.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredCars(filtered);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("marque", marque);
        formData.append("modele", modele);
        formData.append("matricule", matricule);
        formData.append("price", price);
        formData.append("fuel", fuel);
        formData.append("image", image);

        axios
            .post("http://localhost:8888/cars", formData)
            .then(() => {
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
            <PrimarySearchAppBar
                pendingCount={pendingCount}
                changeAccept={handelChengeAcceptComond}
                changeRefuse={handelChengeRefuse}
                handleClearNotifications={handleClearNotifications}
            />
            <br /><br />

            <div className="row">
                <div className="sidebar col-md-3 d-none d-lg-flex bg-dark " style={{ zIndex: 1, backgroundAttachment: "fixed" }}>
                    <div className="w-100 vh-100 position-fixed">
                        <br /><br /><br />
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

                <div className="col-md-9 bg-dark vh-100 "
                    style={{
                        backgroundImage: "url(/admin.png)",
                        backgroundAttachment: "fixed",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        zIndex: 2,
                        position: "relative",
                    }}
                >
                    <div className={chenge === "home" ? "" : "d-none"}>
                        <HelloAdmin />
                        
                    </div>


                    <div className={chenge === "post" ? "" : "d-none"}>
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
                                    <h4>
                                        <IoCarSportOutline /> Add New Car
                                    </h4>
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
                                                <BsPlusCircle /> Add Car
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={chenge === "update" ? "" : "d-none"}>
                        <div className="d-flex justify-content-center  mt-4">
                            <div style={{ width: "300px" }} className="mt-4">
                                {/* search bar */}
                                <Autocomplete
                                    freeSolo
                                    options={marques}
                                    inputValue={search}
                                    onInputChange={handleSearchChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="dearsh by marque"
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    )}
                                />
                            </div>
                            <div className="mt-4">
                                <button onClick={handelChengePost} className="btn btn-primary mx-4">
                                    <BsPlusCircle size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="container d-flex justify-content-center mt-4">
                            <div className="row w-100 mt-4">
                                {filteredCars.length > 0 ? (
                                    filteredCars.map((car) => (
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
                                    ))
                                ) : (
                                    <div className="col-12">
                                        <Alert severity="info" className="mt-3">
                                            we dont have this car
                                        </Alert>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={chenge === 'accept' ? "" : "d-none"}>
                        <Accepted />
                    </div>
                    <div className={chenge === 'refuse' ? "" : "d-none"}>
                        <Rejected />
                    </div>
                    <div className={chenge === 'comond' ? "" : "d-none"}>
                        <Reserve />
                    </div>
                </div>
            </div>
        </>
    );
}
