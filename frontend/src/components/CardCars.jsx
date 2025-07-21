import { NavLink } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import HoverRating from "./Rating";


export default function CardCars(props) {

    const handleDelete = () => {
        if (!window.confirm("Are you sure you want to delete this car?")) return;

        axios
            .delete(`http://localhost:8888/cars/${props.id_car}`)
            .then((res) => {
                alert("Car deleted successfully");
                if (props.onDeleteSuccess) props.onDeleteSuccess(); 
            })
            .catch((err) => {
                console.error(err);
                alert("Error deleting car");
            });
    };
    return (
        <div className="card mt-3" style={{ width: "100%" }}>
            <img src={`http://localhost:8888/uploads/${props.image}`} style={{ height: "25vh" }} className="card-img-top" alt={props.marque} />
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{props.marque}</h5>
                    <h5 className="card-title">{props.price}DH</h5>
                </div>
                <h6>{props.modele}</h6>
                <HoverRating/>
                <h6>{props.fuel}</h6>

                {props.rent === 'user' ? (
                    <NavLink to={'/resrvation/'+props.id} className="btn btn-primary">rent new</NavLink>
                ) : (
                    <div className="d-flex justify-content-between">
                        <NavLink to={`/update/${props.id}`} className="btn btn-outline-warning"><BsPencilSquare size={18} /></NavLink>
                        <button onClick={() => handleDelete()} className="btn btn-outline-danger"><MdDeleteForever /></button>
                    </div>
                )}
            </div>
        </div>
    );
}
