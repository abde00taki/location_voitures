import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

export default function Reserve() {
    const [rents, setRents] = useState([]);

    const fetchRents = () => {
        axios
            .get("http://localhost:8888/rent")
            .then((res) => setRents(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchRents();
    }, []);

    const handleAccept = (id_car) => {
        axios
            .put(`http://localhost:8888/cars/${id_car}`, { status: "rented" })
            .then(() => {
                alert("Car marked as rented");
                fetchRents();
            })
            .catch((err) => console.error(err));
    };

    const handleRefuse = (id_rent) => {
        axios
            .delete(`http://localhost:8888/rent/${id_rent}`)
            .then(() => {
                alert("Reservation refused and deleted");
                fetchRents();
            })
            .catch((err) => console.error(err));
    };

    return (
        <Container className="py-4">
            <h2 className="mb-4">Reservations</h2>
            <Row>
                {rents.map((rent) => (
                    <Col md={4} key={rent.id_rent} className="mb-4">
                        <Card>
                            <Card.Body>
                                <h5>User Info</h5>
                                <p>
                                    <strong>Name:</strong> {rent.name} <br />
                                    <strong>Email:</strong> {rent.email}
                                </p>

                                <h5>Car Info</h5>
                                <p>
                                    <strong>Marque:</strong> {rent.marck} <br />
                                    <strong>Matricule:</strong> {rent.matricule}
                                </p>

                                <h5>Dates</h5>
                                <p>
                                    <strong>From:</strong> {rent.date_depart} <br />
                                    <strong>To:</strong> {rent.date_fin}
                                </p>

                                <div className="d-flex justify-content-between mt-3">
                                    <Button
                                        variant="success"
                                        onClick={() => handleAccept(rent.id_car)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleRefuse(rent.id_rent)}
                                    >
                                        Refuse
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
