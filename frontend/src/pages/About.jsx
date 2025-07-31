import { motion } from "framer-motion";
import { FaCarAlt, FaUsers, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Autoplay } from "swiper/modules";

const cars = [
    { marque: "BMW", image: "/bmw.webp" },
    { marque: "Audi", image: "/audi.webp" },
    { marque: "Mercedes", image: "/mercides.webp" },
    { marque: "Toyota", image: "/toyota.webp" }
];

export default function AboutUs() {
    return (
        <div className="py-5 px-3" style={{ background: "#f9f9f9" }}>
            <motion.h2
                className="text-center mb-4 fw-bold"
                style={{ color: "rgba(251, 138, 1, 1)", fontSize: "2.5rem" }}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Brand cars
            </motion.h2>

            {/* Swiper Section */}
            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                coverflowEffect={{ rotate: 30, stretch: 0, depth: 200, modifier: 1 }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                modules={[EffectCoverflow, Autoplay]}
                className="mb-5"
            >
                {cars.map((car, index) => (
                    <SwiperSlide
                        key={index}
                        style={{ width: "250px" }}
                        className="rounded overflow-hidden shadow"
                    >
                        <img
                            src={car.image}
                            alt={car.marque}
                            className="img-fluid"
                            style={{ borderRadius: "12px", height: "180px", objectFit: "cover" }}
                        />
                        <div className="text-center mt-2 fw-semibold text-dark">{car.marque}</div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <motion.h2
                className="text-center mb-4 fw-bold"
                style={{ color: "rgba(74, 69, 63, 1)", fontSize: "2.5rem" }}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                About takicars
            </motion.h2>

            {/* Info Cards */}
            <div className="container">
                <div className="row g-4">
                    <motion.div
                        className="col-md-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="card h-100 shadow border-0">
                            <div className="card-body text-center">
                                <FaCarAlt size={40} color="rgba(251, 138, 1, 1)" className="mb-3" />
                                <h5 className="card-title">Wide Range of Cars</h5>
                                <p className="card-text">
                                    We offer a diverse fleet of cars from economy to luxury to match every customer’s need.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="col-md-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="card h-100 shadow border-0">
                            <div className="card-body text-center">
                                <FaUsers size={40} color="rgba(251, 138, 1, 1)" className="mb-3" />
                                <h5 className="card-title">Trusted by Clients</h5>
                                <p className="card-text">
                                    Thousands of users have trusted our platform to book and review cars with full satisfaction.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="col-md-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="card h-100 shadow border-0">
                            <div className="card-body text-center">
                                <FaStar size={40} color="rgba(251, 138, 1, 1)" className="mb-3" />
                                <h5 className="card-title">Top Rated Service</h5>
                                <p className="card-text">
                                    Our rating and feedback system helps us ensure quality and improve your experience.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
