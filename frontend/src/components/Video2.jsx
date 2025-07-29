import { IoCarSportOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { MdCarRental } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Video2() {


    return (
        <>
            <div style={{
                position: "relative", width: "100%", height: "100%",
            }}>
                <video width="100%" height="100%" autoPlay muted loop  >
                    <source src="carspage.mp4" type="video/mp4" />
                </video>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.68)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: "40px",

                    }}
                >
                    <div className="d-flex">
                        <div>
                            <motion.h2
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                                style={{
                                    color: "white",
                                    fontSize: "2rem",
                                    margin: 0,
                                }}
                            >
                                <span style={{ color: "rgba(251, 138, 1, 1)" }}>RENT</span> CARS
                            </motion.h2>
                        </div>
                        <div>
                            <motion.h2
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                                style={{

                                    margin: 0,
                                }}
                            >
                                <IoCarSportOutline color="rgba(251, 138, 1, 1)" className="fs-1 mb-1 " />
                            </motion.h2>
                        </div>
                    </div>



                    <motion.button
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        style={{
                            margin: 0,
                            boxShadow: "0 0 6px white",
                            top: "40px",
                            border: "1px solid rgba(251, 138, 1, 1)",
                            color: "rgba(255, 255, 255, 1)",
                            backgroundColor: "rgba(251, 138, 1, 1)",
                            borderRadius: "30px",
                            width: "200px"
                        }}
                        className="btn "
                    >
                        <Link className="text-decoration-none text-light" to={'/cars'} >rent car<MdCarRental /></Link>
                    </motion.button>



                </div>

            </div>
        </>
    )
}