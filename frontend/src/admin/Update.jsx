import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    );
}
