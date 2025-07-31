import { IoCarSportOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdCarRental } from "react-icons/md";

import { Link } from "react-router-dom";

export default function Video() {
    const texts = [
        `Rent the best cars at a low price `,
        "you can cancel your rental application immedialy",
        "Hurry up and take advantage of the holiday discounts"
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
        
            <div style={{
                position: "relative", width: "100%", height: "100%",
            }}>
                <video width="100%" height="100%" autoPlay muted loop  >
                    <source src="2-car.mp4" type="video/mp4" />
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
                    <hr />
                    <motion.h2
                        key={index}
                        initial={{
                            opacity: 0,
                            filter: "blur(4px) brightness(0.8)",
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            filter: "blur(0px) brightness(1)",
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            filter: "blur(4px) brightness(1.2)",
                            scale: 1.05,
                        }}
                        transition={{ duration: 0.8 }}
                        style={{
                            color: "white",
                            fontSize: "2rem",
                            margin: 0,
                            position: "absolute",
                        }}
                        className="d-none d-lg-flex"
                    >
                        {texts[index]}
                    </motion.h2>
                    <hr />


                    <motion.button
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        style={{
                            margin: 0,
                            boxShadow: "0 0 5px BLACK",
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