import { IoCarSportOutline } from "react-icons/io5";
import {  motion } from "framer-motion";
import { MdCarRental } from "react-icons/md";

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
                                <span className="text-warning">L</span>O<span className="text-warning">C</span>A<span className="text-warning">T</span>ION <span className="text-warning">V</span>OI<span className="text-warning">T</span>UR<span className="text-warning">E</span>S
                            </motion.h2>
                        </div>
                        <div>
                            <motion.h2
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                                style={{
                                    color: "white",
                                    margin: 0,
                                }}
                            >
                                <IoCarSportOutline className="fs-1 text-warning" />
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
                            top: "40px"
                        }}
                        className="btn btn-outline-warning "
                    >
                        rent car<MdCarRental />
                    </motion.button>



                </div>

            </div>
        </>
    )
}