import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";

export default function Reservation() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [date_depart, setDateDepart] = useState("");
    const [date_fin, setDateFin] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user || user.role !== "user") {
            alert("You must log in as a user to make a reservation.");
            navigate("/signin");
            return;
        }

        axios
            .get(`http://localhost:8888/cars/${id}`)
            .then((res) => setCar(res.data))
            .catch((err) => {
                console.error(err);
                alert("Failed to load car details");
                navigate("/cars");
            });
    }, [id, navigate]);

    const  handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8888/rent", {
                date_depart,
                date_fin,
                id_car: id,
                id_user: user.id_user,
            })
            .then(() => {
                alert("Reservation request sent successfully!");
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to send reservation.");
            });
    };

    if (!car) return <div className="text-center mt-5">Loading...</div>;

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow">
                        <Row>
                            <Col md={6}>
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:8888/uploads/${car.image}`}
                                    style={{ height: "100%", objectFit: "cover" }}
                                />
                            </Col>
                            <Col md={6} className="p-4">
                                <h3>{car.marque} - {car.modele}</h3>
                                <p><strong>Price:</strong> {car.price} MAD/day</p>
                                <p><strong>Fuel:</strong> {car.fuel}</p>
                                <p><strong>Matricule:</strong> {car.matricule}</p>

                                <Form onSubmit={handleSubmit} className="mt-4">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            value={date_depart}
                                            onChange={(e) => setDateDepart(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            value={date_fin}
                                            onChange={(e) => setDateFin(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button type="submit" variant="primary" className="w-100">
                                        Reserve Now
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
