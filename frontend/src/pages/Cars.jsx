import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import Video2 from "../components/Video2";
import CardCars from "../components/CardCars";
import { Autocomplete, TextField, Alert } from "@mui/material";

export default function Cars() {
    const [cars, setCars] = useState([]);
    const [marques, setMarques] = useState([]); // لائحة الماركات
    const [search, setSearch] = useState(""); // اللي كتب المستخدم
    const [filteredCars, setFilteredCars] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8888/cars')
            .then(response => {
                setCars(response.data);
                setFilteredCars(response.data);
                // جبد لائحة الماركات فقط
                const uniqueMarques = [...new Set(response.data.map(car => car.marque))];
                setMarques(uniqueMarques);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des utilisateurs:', error);
            });
    }, []);

    // لما كيتبدل الكتابة في search
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

    return (
        <>
            <div className="d-none d-lg-flex">
                <NavBar show={true} />
            </div>
            <Video2 />

            <div className="container py-3">
                {/* 🔷 Search bar */}
                <div className="row mb-3">
                    <div className="col-md-6 offset-md-3">
                        <Autocomplete
                            freeSolo
                            options={marques}
                            inputValue={search}
                            onInputChange={handleSearchChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="searsh by marque"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                </div>

                {/* 🔷 Cars or message */}
                <div className="row">
                    {filteredCars.length > 0 ? (
                        filteredCars.map(car => (
                            <div className="col-md-4 mb-3" key={car.id_car}>
                                <CardCars
                                    rent="user"
                                    marque={car.marque}
                                    modele={car.model}
                                    id={car.id_car}
                                    price={car.price}
                                    fuel={car.fuel}
                                    image={car.image}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <Alert severity="info">we thasent have thid cars</Alert>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
