import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import PageWrapper from "../components/PageWrapper";

export default function SignUp() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({
        name: null,
        lastname: null,
        email: null,
        password: null,
    });

    const validateName = (value) => value.trim() === "" ? "You must enter your name" : null;
    const validateLastname = (value) => value.trim() === "" ? "You must enter your lastname" : null;
    const validateEmail = (value) => {
        const regex = /\S+@\S+\.\S+/;
        if (value.trim() === "") return "You must enter your email";
        if (!regex.test(value)) return "Invalid email format";
        return null;
    };
    const validatePassword = (value) => {
        const regexChar = /[^A-Za-z0-9]/;
        const regexDigits = /.*\d.*\d.*\d.*\d/;
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!regexChar.test(value)) return "Password must include at least 1 special character";
        if (!regexDigits.test(value)) return "Password must include at least 4 digits";
        return null;
    };

    const handleChange = (field, value) => {
        const validators = {
            name: validateName,
            lastname: validateLastname,
            email: validateEmail,
            password: validatePassword
        };
        if (field === "name") setName(value);
        if (field === "lastname") setLastname(value);
        if (field === "email") setEmail(value);
        if (field === "password") setPassword(value);
        setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
    };

    const handleSubmitUser = async (e) => {
        e.preventDefault();

        const allErrors = {
            name: validateName(name),
            lastname: validateLastname(lastname),
            email: validateEmail(email),
            password: validatePassword(password),
        };
        setErrors(allErrors);

        if (Object.values(allErrors).some((err) => err !== null)) return;

        try {
            const res = await axios.post("http://localhost:8888/users", {
                name,
                lastname,
                email,
                password,
            });
            alert("Utilisateur ajouté : " + res.data.name);
            setName(""); setLastname(""); setEmail(""); setPassword("");
        } catch (error) {
            console.error("Erreur POST:", error);
        }
    };

    return (
        <>
            <PageWrapper >
                <NavBar show={true} />
                <Box sx={{
                    backgroundColor: "", minHeight: "100vh", py: 6,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Container maxWidth="md">
                        <Grid container spacing={4} alignItems="center" sx={{ backgroundColor: "#fff", borderRadius: 4, boxShadow: 3 }}>


                            <Grid item xs={12} md={6}>
                                <motion.div
                                    initial={{ x: 80, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 1 }}
                                >
                                    <Box component="form" onSubmit={handleSubmitUser} noValidate sx={{ p: 2 }}>
                                        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "rgba(251, 138, 1, 1)" }}>
                                            Create Your Account
                                        </Typography>

                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            value={name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                            error={!!errors.name}
                                            helperText={errors.name || ""}
                                            margin="normal"
                                            InputProps={{ startAdornment: <FaUser style={{ marginRight: 8 }} /> }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            value={lastname}
                                            onChange={(e) => handleChange("lastname", e.target.value)}
                                            error={!!errors.lastname}
                                            helperText={errors.lastname || ""}
                                            margin="normal"
                                            InputProps={{ startAdornment: <FaUser style={{ marginRight: 8 }} /> }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            error={!!errors.email}
                                            helperText={errors.email || ""}
                                            margin="normal"
                                            InputProps={{ startAdornment: <FaEnvelope style={{ marginRight: 8 }} /> }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => handleChange("password", e.target.value)}
                                            error={!!errors.password}
                                            helperText={errors.password || ""}
                                            margin="normal"
                                            InputProps={{ startAdornment: <FaLock style={{ marginRight: 8 }} /> }}
                                        />

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                mt: 3,
                                                backgroundColor: "rgba(251, 138, 1, 1)",
                                                "&:hover": { backgroundColor: "rgba(251, 138, 1, 0.9)" },
                                                fontWeight: "bold"
                                            }}
                                        >
                                            Sign Up
                                        </Button>
                                    </Box>
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </PageWrapper>
        </>
    );
}
