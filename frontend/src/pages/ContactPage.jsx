import { AnimatePresence, motion } from "framer-motion";

import { MdCarRental } from "react-icons/md";
import { NavLink } from "react-router-dom";
export default function ContactPage() {
    

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

                    <motion.NavLink
                    
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ margin: 0, boxShadow: "0 0 6px white", top: "40px" }}
                        className="btn btn-outline-warning mt-4"
                    >
                         <NavLink to={'/signup'}>rent car <MdCarRental /></NavLink>
                    </motion.NavLink>
                </div>
            </div>

            
        
        </>
    );
}
