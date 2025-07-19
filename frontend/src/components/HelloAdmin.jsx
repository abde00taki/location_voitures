import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HelloAdmin() {
    const texts = [
        `Hi mester admin`,
        "welcome to your web site",
        "you can chenge iny theng"
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
            <div className="d-flex justify-content-center align-items-center w-100  vh-100">
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
                        color: "black",
                        fontSize: "2rem",
                        margin: 0,
                        position: "absolute",
                    }}
                >
                    {texts[index]}
                </motion.h2>
            </div>
        </>
    )
}