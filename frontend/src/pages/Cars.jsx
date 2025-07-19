import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import Video2 from "../components/Video2";
import CardCars from "../components/CardCars";


export default function Cars() {

    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8888/cars')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des utilisateurs:', error);
            });
    }, []);

    return (
        <>
            <div className="d-none d-lg-flex">
                <NavBar show={true} />
            </div>
            <Video2 />

            <div className="container d-flex justify-content-center">
                <div className="row w-100">
                    {cars && cars.map(car => (
                        <div className="col-md-4" key={car.id_car}>
                            <CardCars rent="user" marque={car.marque} modele={car.model} price={car.price} fuel={car.fuel} image={car.image} />
                        </div>
                    ))}
                </div>
            </div>


                   
        </>
    )
}