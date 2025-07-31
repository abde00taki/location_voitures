import { NavLink, useNavigate } from "react-router-dom";
import { MdAssignmentAdd, MdDeleteForever } from "react-icons/md";
import { BsFillFuelPumpFill, BsPencilSquare } from "react-icons/bs";
import { FaStar, FaRegHeart, FaHeart, FaShareAlt } from "react-icons/fa";
import axios from "axios";
import RatingComponent from "./Rating";
import { useState } from "react";
import { PiBagSimpleFill, PiCarSimpleBold } from "react-icons/pi";
import { GiCarSeat } from "react-icons/gi";

export default function CardCars(props) {
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);

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

    const handleSave = () => {
        setSaved(true);
        localStorage.setItem(`saved-${props.id_car}`, JSON.stringify(props));
        navigate("/seved");
    };

    const handleShare = () => {
        const shareText = `Check out this car: ${props.marque} - ${props.price}DH`;
        const shareUrl = window.location.href;
        navigator.share
            ? navigator.share({ title: props.marque, text: shareText, url: shareUrl })
            : window.open(`mailto:?subject=${props.marque}&body=${shareText} ${shareUrl}`);
    };

    return (
        <div className="card custom-card mt-3" style={{ width: "100%", position: "relative", borderRadius: "10px", transition: "0.3s" }}>
            {/* النجمة فوق الصورة */}
            <div style={{
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
            }}>
                {props.star} <FaStar color="rgb(251,175,1)" style={{ marginLeft: "4px" }} />
            </div>

            {/* ✅ الوسم الجديد Rented إذا كانت مقبولة */}
            {props.status === "accepted" && (
                <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "rgba(251, 138, 1, 1)",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    zIndex: 2
                }}>
                    Rented
                </div>
            )}

            <img src={`http://localhost:8888/uploads/${props.image}`} style={{ height: "25vh", objectFit: "cover" }} className="card-img-top" alt={props.marque} />

            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title text-success">{props.marque}</h5>
                    <h6 className="card-title mt-1 ">{props.price}DH</h6>
                </div>
                <RatingComponent id_car={props.id_car} />
                <div className="d-flex justify-content-between">
                    <div>
                        <h6 className="text-secondary"><PiCarSimpleBold /> {props.modele}</h6>
                        <h6 className="text-secondary"><BsFillFuelPumpFill /> {props.fuel}</h6>
                    </div>
                    <div>
                        <h6 className="text-secondary"><GiCarSeat /> chairs</h6>
                        <h6 className="text-secondary"><PiBagSimpleFill /> 2 bags</h6>
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-3">
                    <button onClick={handleShare} className="btn btn-sm" style={{ color: "rgba(251, 138, 1, 1)" }}><FaShareAlt size={20} /></button>
                    <button onClick={handleSave} className="btn btn-sm" style={{ color: "rgba(251, 138, 1, 1)" }}>
                        {saved ? <FaHeart color="red" size={20} /> : <FaRegHeart color="red" size={20} />}
                    </button>
                </div>
                {props.rent === 'user' ? (
                    <div className="d-flex justify-content-center">
                        <div >
                            <NavLink to={'/resrvation/' + props.id} className={props.status === "accepted" ? "invisible" : ""}><MdAssignmentAdd size={35} /></NavLink>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex justify-content-between mt-3">
                        <NavLink to={`/update/${props.id}`} className="btn btn-outline-warning"><BsPencilSquare size={18} /></NavLink>
                        <button onClick={handleDelete} className="btn btn-outline-danger"><MdDeleteForever /></button>
                    </div>
                )}
            </div>
        </div>
    );
}
