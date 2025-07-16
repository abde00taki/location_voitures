import { IoCarSportOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { GiHouseKeys } from "react-icons/gi";
import { useEffect, useState } from "react";
import { MdCarRental } from "react-icons/md";

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
        }, 3000); // كل 3 ثواني
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