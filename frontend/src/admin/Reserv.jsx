import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import PrimarySearchAppBar from "../components/test";

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

    const handleUpdateStatus = (rent, status) => {
        axios
            .put(`http://localhost:8888/rent/${rent.id_rent}`, {
                status: status,
                idUser: rent.id_user, // باش notification تعرف شكون
            })
            .then(() => {
                alert(
                    status === "accepted"
                        ? "Reservation accepted and user notified"
                        : "Reservation rejected and user notified"
                );
                fetchRents();
            })
            .catch((err) => {
                console.error(err);
                alert("Error updating reservation");
            });
    };

    return (
        <>
        {/* <PrimarySearchAppBar /> */}
            <div className="row">
                <div className="col-md-3 bg-dark vh-100 "></div>
                <div className="col-md-9 bg-danger">
                    <Container className="py-4">
                        <h2 className="mb-4">Reservations</h2>
                        <Row>
                            {rents.map((rent) => (
                                <Col md={4} key={rent.id_rent} className="mb-4">
                                    <Card>
                                        <Card.Body>
                                            <h5>User Info</h5>
                                            <p>
                                                <strong>Name:</strong> {rent.name} {rent.lastname} <br />
                                                <strong>Email:</strong> {rent.email}
                                            </p>

                                            <h5>Car Info</h5>
                                            <p>
                                                <strong>Marque:</strong> {rent.marque} <br />
                                                <strong>Matricule:</strong> {rent.matricule}
                                            </p>

                                            <h5>Dates</h5>
                                            <p>
                                                <strong>From:</strong> {rent.date_depart} <br />
                                                <strong>To:</strong> {rent.date_fin}
                                            </p>

                                            <h5>Status</h5>
                                            <p>
                                                <span
                                                    className={`badge ${rent.status === "pending"
                                                        ? "bg-warning"
                                                        : rent.status === "accepted"
                                                            ? "bg-success"
                                                            : "bg-danger"
                                                        }`}
                                                >
                                                    {rent.status}
                                                </span>
                                            </p>

                                            {rent.status === "pending" && (
                                                <div className="d-flex justify-content-between mt-3">
                                                    <Button
                                                        variant="success"
                                                        onClick={() => handleUpdateStatus(rent, "accepted")}
                                                    >
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleUpdateStatus(rent, "rejected")}
                                                    >
                                                        Reject
                                                    </Button>
                                                </div>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            </div>






        </>
    );
}
