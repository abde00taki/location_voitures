import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Card,
  Typography,
  Alert,
  Snackbar,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import axios from "axios";

const steps = [
  { label: "Check Login", icon: <AccountCircleIcon /> },
  { label: "Select Dates", icon: <CalendarMonthIcon /> },
  { label: "Bank Info", icon: <CreditCardIcon /> },
];

export default function Reservation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1); // Skip login check step
  const [car, setCar] = useState(null);
  const [date_depart, setDateDepart] = useState("");
  const [date_fin, setDateFin] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "", type: "success" });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "user") {
      navigate("/signin");
      return;
    }

    axios
      .get(`http://localhost:8888/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => {
        console.error(err);
        setAlert({ open: true, message: "Failed to load car details.", type: "error" });
        navigate("/cars");
      });
  }, [id, navigate]);

  const handleNext = () => {
    if (activeStep === 1) {
      if (!date_depart || !date_fin) {
        return setAlert({ open: true, message: "Please fill both dates.", type: "warning" });
      }
    }
    if (activeStep === 2) {
      if (!accountNumber || !accountPassword) {
        return setAlert({ open: true, message: "Bank account fields are required.", type: "warning" });
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8888/rent", {
        date_depart,
        date_fin,
        id_car: id,
        id_user: user.id_user,
      })
      .then(() => {
        setAlert({ open: true, message: "Reservation successful!", type: "success" });
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((err) => {
        console.error(err);
        setAlert({ open: true, message: "Reservation failed.", type: "error" });
      });
  };

  if (!car) return <Typography align="center" mt={5}>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel icon={step.icon}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 1 && (
        <Card sx={{ mt: 5, p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Reserve {car.marque} - {car.modele}
          </Typography>
          <TextField
            label="Start Date"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={date_depart}
            onChange={(e) => setDateDepart(e.target.value)}
          />
          <TextField
            label="End Date"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={date_fin}
            onChange={(e) => setDateFin(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ mt: 2 }}
            fullWidth
          >
            Next
          </Button>
        </Card>
      )}

      {activeStep === 2 && (
        <Card sx={{ mt: 5, p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Enter Bank Account (Mock)
          </Typography>
          <TextField
            label="Account Number"
            fullWidth
            margin="normal"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <TextField
            label="Account Password"
            type="password"
            fullWidth
            margin="normal"
            value={accountPassword}
            onChange={(e) => setAccountPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 2 }}
            startIcon={<CheckCircleIcon />}
          >
            Submit Reservation
          </Button>
        </Card>
      )}

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.type}
          sx={{ width: "100%", fontSize: "1rem", display: "flex", alignItems: "center" }}
          iconMapping={{
            success: <CheckCircleIcon fontSize="inherit" />,
            error: <CreditCardIcon fontSize="inherit" />,
            warning: <CalendarMonthIcon fontSize="inherit" />,
          }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
