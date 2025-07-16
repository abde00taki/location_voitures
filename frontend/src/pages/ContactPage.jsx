import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { MdCarRental } from "react-icons/md";

export default function ContactPage() {
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
        } catch (error) {
            console.error("Erreur POST:", error);
        }
    };

    const getHelperColor = (error) => (error ? "text-danger" : "text-success");

    return (
        <>
            {/* ===== VIDEO & HEADER ===== */}
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <video width="100%" height="100%" autoPlay muted loop>
                    <source src="contactintro.mp4" type="video/mp4" />
                </video>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.41)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: "40px",
                    }}
                >
                    <div className="d-flex">
                        <motion.h2
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                            style={{ color: "white", fontSize: "2rem", margin: 0 }}
                        >
                            Hi
                        </motion.h2>
                        <motion.h2
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                            style={{ color: "white", margin: 0 }}
                        >
                            🖐️
                        </motion.h2>
                    </div>
                    <motion.h2
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="mt-4"
                        style={{ color: "white", fontSize: "2rem", margin: 0 }}
                    >
                        you are very lucky because you want to register on our site
                    </motion.h2>
                    <motion.h2
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="mt-4"
                        style={{ color: "white", fontSize: "2rem", margin: 0 }}
                    >
                        you will receive valuable offers and discounts
                    </motion.h2>

                    <motion.button
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ margin: 0, boxShadow: "0 0 6px white", top: "40px" }}
                        className="btn btn-outline-warning mt-4"
                    >
                        rent car <MdCarRental />
                    </motion.button>
                </div>
            </div>

            {/* ===== MODAL ===== */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    style={{ width: "75%", maxWidth: "75%" }}
                >
                    <div className="modal-content" style={{ height: "75vh" }}>
                        <div className="modal-body">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                            <div className="row">
                                <div className="col-md-6">
                                    <div  className="d-none d-lg-flex" style={{ border: "2px solid white ", overflow: "hidden" }}>
                                        <img style={{ height: "35rem" }} className="w-75 " src="keys.jpg" alt="" /> 
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ border: "2px solid white ", height: "75%" }} className="">
                                        <form onSubmit={handleSubmitUser}>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
