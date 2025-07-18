

export default function CardCars(props) {
    return (
        <div className="card" style={{width: "20rem"}}>
            <img src={`http://localhost:8888/uploads/${props.image}`} className="card-img-top" alt={props.marque} />
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{props.marque}</h5>
                    <h5 className="card-title">{props.price}DH</h5>
                </div>
                <h6> {props.modele} </h6>
                <h6> {props.fuel} </h6>
                
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    );
}
