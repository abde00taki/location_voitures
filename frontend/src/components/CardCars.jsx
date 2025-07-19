import { NavLink } from "react-router-dom";

export default function CardCars(props) {
    return (
        <div className="card mt-3" style={{ width: "100%", zIndex: "5000" }}>
            <img src={`http://localhost:8888/uploads/${props.image}`} className="card-img-top" alt={props.marque} />
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{props.marque}</h5>
                    <h5 className="card-title">{props.price}DH</h5>
                </div>
                <h6>{props.modele}</h6>
                <h6>{props.fuel}</h6>

                {props.rent === 'user' && (
                    <button className="btn btn-primary">rent</button>
                )}
                {props.rent === 'update' && (
                    <NavLink to={`/update/${props.id}`} className="btn btn-warning">update</NavLink>
                )}
                {props.rent === 'delete' && (
                    <button className="btn btn-danger">delete</button>
                )}
            </div>
        </div>
    );
}
