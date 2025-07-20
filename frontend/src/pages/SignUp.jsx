import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";

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

    const validateName = (value) => {
        return value.trim() === "" ? "You must enter your name" : null;
    };

    const validateLastname = (value) => {
        return value.trim() === "" ? "You must enter your lastname" : null;
    };

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
        if (field === "name") {
            setName(value);
            setErrors((prev) => ({ ...prev, name: validateName(value) }));
        } else if (field === "lastname") {
            setLastname(value);
            setErrors((prev) => ({ ...prev, lastname: validateLastname(value) }));
        } else if (field === "email") {
            setEmail(value);
            setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
        } else if (field === "password") {
            setPassword(value);
            setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
        }
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

        if (Object.values(allErrors).some((err) => err !== null)) {
            console.log("Invalid form");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8888/users", {
                name,
                lastname,
                email,
                password,
            });
            alert("Utilisateur ajouté : " + res.data.name);
            setName("")
            setLastname("")
            setEmail("")
            setPassword("")
        } catch (error) {
            console.error("Erreur POST:", error);
        }
    };

    const getHelperColor = (error) => (error ? "text-danger" : "text-success");


    return (
        <>
            <div className="d-none d-lg-flex">
                <NavBar show={true} />
            </div>
            <div className="bg-dark">
                <br />
                <br />
            </div>
            <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
                <div className="w-100" style={{ margin: "70px" }}>
                    <div className="row w-100 bg-primary " style={{ borderRadius: "20px", padding: "30px" }}>
                        <div className="col-md-6 " style={{
                            backgroundColor: "rgba(0, 0, 255, 0.436)",
                            backgroundImage: "url(loginpage.png)",
                            backgroundPosition: "center",
                            backgroundSize: "cover"
                        }}  >
                        </div>
                        <div className="col-md-6">
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1 }}

                            >
                                <div style={{ borderRadius: "15px", boxShadow: '0 0 3px black', backgroundColor: "white", padding: "10px" }} className="w-100">
                                    <form onSubmit={handleSubmitUser} className="p-4">
                                        <label>add your name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                        />
                                        <p className={getHelperColor(errors.name)}>
                                            {errors.name ? errors.name : "Good 👍"}
                                        </p>

                                        <label>add your lastname</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={lastname}
                                            onChange={(e) => handleChange("lastname", e.target.value)}
                                        />
                                        <p className={getHelperColor(errors.lastname)}>
                                            {errors.lastname ? errors.lastname : "Good 👍"}
                                        </p>

                                        <label>add your email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                        />
                                        <p className={getHelperColor(errors.email)}>
                                            {errors.email ? errors.email : "Good 👍"}
                                        </p>

                                        <label>add your password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => handleChange("password", e.target.value)}
                                        />
                                        <p className={getHelperColor(errors.password)}>
                                            {errors.password ? errors.password : "Good 👍"}
                                        </p>

                                        <button className="btn btn-primary mt-3" type="submit">
                                            Login
                                        </button>
                                    </form>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}