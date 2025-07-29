import { motion } from "framer-motion";
import Video from "../components/Video";
import NavBar from "../components/NavBar";

// 🧩 Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import { useEffect, useState } from "react";
import axios from "axios";
import CardCars from "../components/CardCars";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import ServiceFeatures from "../components/WhayUs";
import MessageUser from "../components/MessageUser";
import UserComments from "../components/UserComments";
import AboutUs from "./About";
import PageWrapper from "../components/PageWrapper";


export default function Home() {

  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8888/cars/best')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des voitures:', error);
      });
  }, []);

  return (
    <PageWrapper >
      <div>
        <div>
          <div className="d-none d-lg-flex">
            <NavBar show={true} />
          </div>
          <Video />
          <div className="container w-100 mt-4">


            <div className="d-flex justify-content-end">
              <h3 className=" text-center w-25" style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.477)", borderRadius: '10px', color: "rgba(251, 138, 1, 1)" }}>best cars</h3>
            </div>
            <div className="row">
              {/* ✅ Sidebar Card col-md-3 */}
              <div className="col-md-4 mb-4 mt-3">
                <div className="p-4 bg-white  rounded-4 h-100 d-flex flex-column justify-content-between" style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.477)" }}>
                  <div>
                    <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
                      <span>🚗</span> Premium Car Rental
                    </h4>
                    <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                      Discover our top rented cars and enjoy a smooth ride with the best comfort and style. Our service guarantees:
                    </p>
                    <ul className="mt-3 ps-3" style={{ fontSize: "0.9rem" }}>
                      <li className="mb-2 d-flex align-items-center">
                        <i className="bi bi-check-circle-fill text-success me-2"></i> Fast booking
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <i className="bi bi-star-fill text-warning me-2"></i> Top-rated cars
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <i className="bi bi-clock-fill text-primary me-2"></i> 24/7 support
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <i className="bi bi-shield-lock-fill text-danger me-2"></i> Full insurance
                      </li>
                    </ul>
                  </div>
                  <Button variant="contained" color="primary" className="mt-4 w-100">
                    Explore More
                  </Button>
                </div>
              </div>

              {/* ✅ Swiper Slider col-md-9 */}
              <div className="col-md-8 " style={{ borderRadius: "15px", boxShadow: "0 0 8px rgba(0, 0, 0, 0.477)" }}>
                {cars.length > 0 && (
                  <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 200,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    loop={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                    className="mySwiper py-4"
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                  >
                    {cars.map((car) => (
                      <SwiperSlide key={car.id} style={{ width: "300px" }}>
                        <CardCars
                          rent="user"
                          marque={car.marque}
                          modele={car.modele}
                          price={car.price}
                          fuel={car.fuel}
                          image={car.image}
                          id={car.id_car}
                          star={car.star}
                          id_car={car.id_car}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
            {/* <hr /> */}
            {/* ========= cars 2 ========= */}
            <h3 className="w-25 mt-4 text-center" style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.477)", borderRadius: '10px', color: "rgba(251, 138, 1, 1)" }}>the cheapest cars</h3>
            <div className="row ">
              {/* ✅ Swiper Slider col-md-9 */}
              <div className="col-md-8 " style={{ borderRadius: "15px", boxShadow: "0 0 8px rgba(0, 0, 0, 0.477)" }}>
                {cars.length > 0 && (
                  <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 200,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    loop={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                    className="mySwiper py-4"
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                  >
                    {cars.map((car) => (
                      <SwiperSlide key={car.id} style={{ width: "300px" }}>
                        <CardCars
                          rent="user"
                          marque={car.marque}
                          modele={car.modele}
                          price={car.price}
                          fuel={car.fuel}
                          image={car.image}
                          id={car.id_car}
                          star={car.star}
                          id_car={car.id_car}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
              {/* ✅ Sidebar Card col-md-4 */}
              <div className="col-md-4 mb-4 mt-3">
                <div className="p-4 bg-white  rounded-4 h-100 d-flex flex-column justify-content-between" style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.477)" }}>
                  <div>
                    <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
                      <span>🚗</span> Premium Car Rental
                    </h4>
                    <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                      Discover our top rented cars and enjoy a smooth ride with the best comfort and style. Our service guarantees:
                    </p>
                    <ul className="mt-3 ps-3" style={{ fontSize: "0.9rem" }}>
                      <li className="mb-2 d-flex align-items-center">
                        <i className="bi bi-check-circle-fill text-success me-2"></i> Fast booking
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <i className="bi bi-star-fill text-warning me-2"></i> Top-rated cars
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <i className="bi bi-clock-fill text-primary me-2"></i> 24/7 support
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <i className="bi bi-shield-lock-fill text-danger me-2"></i> Full insurance
                      </li>
                    </ul>
                  </div>
                  <Button variant="contained" color="primary" className="mt-4 w-100">
                    Explore More
                  </Button>
                </div>
              </div>
            </div>


          </div>
          {/* =================== hna message and localisation ====== */}
          <div
            className="w-100 mt-4  text-white py-4"
            style={{

              backgroundColor: "rgba(220, 220, 220, 0.24)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="container">
              <div className="row g-4 align-items-center">
                {/* Message Section */}
                <div className="col-12 col-md-6" >
                  <h5 className="mb-3 text-dark">add your experions</h5>
                  <div className="bg-light rounded p-3" style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)" }}>
                    <MessageUser />
                  </div>
                </div>

                {/* Map Section */}
                <div className="col-12 col-md-6">
                  <h5 className="mb-3 text-dark">Our Location</h5>
                  <div className="ratio ratio-4x3 rounded overflow-hidden" style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)" }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d598.3875157246769!2d-6.5677329366196116!3d31.96114191898688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda49b00746240c5%3A0x71e831d9c359307f!2z2YXZhti12Kkg2KfZhNi02KjYp9ioINij2LLZitmE2KfZhA!5e0!3m2!1sen!2sma!4v1753285162378!5m2!1sen!2sma"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Map"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div>
            <AboutUs />
          </div>
          <div>
            <ServiceFeatures />
          </div>
          <div>
            <UserComments />
          </div>


        </div>
        <Footer />

      </div>
    </PageWrapper>
  );
}
