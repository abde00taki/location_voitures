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


export default function Home() {

  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8888/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des voitures:', error);
      });
  }, []);

  return (
    <div>
      <div>
        <div className="d-none d-lg-flex">
          <NavBar show={true} />
        </div>
        <Video />
        <div className="container w-100">
          <h3 className="text-center">welcome</h3>

          {cars.length > 0 && (
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 200,         // 👈 النشطة خارجة
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
              {cars.map(car => (
                <SwiperSlide key={car.id} style={{ width: "300px" }}>
                  <CardCars
                    rent="user"
                    marque={car.marque}
                    modele={car.model}
                    price={car.price}
                    fuel={car.fuel}
                    image={car.image}
                    id={car.id_car}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <hr />

          <div className="row w-100">
            <div className="col-md-6">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1 }}
                style={{ margin: 0 }}
              >
                <img className="w-100" src="dacia-left.png" alt="" />
              </motion.div>
            </div>

            <div className="col-md-6 mt-4">
              <h1>Lorem ipsum dolor sit, amet consectetur adipisicing.</h1>
            </div>
          </div>

          <hr />

          <div className="row w-100">
            <div className="col-md-6 mt-4">
              <h1>Lorem ipsum dolor, sit amet consectetur adipisicing.</h1>
            </div>

            <div className="col-md-6">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1 }}
              >
                <img className="w-100" src="dacia-right-1.png" alt="" />
              </motion.div>
            </div>
          </div>

        </div>
        <div className="w-100 d-flex justify-content-center bg-dark align-items-center " style={{ height: "50vh", backgroundImage: "url(carhome.jpg)", backgroundPosition: "center", backgroundSize: "cover", backgroundAttachment: "fixed" }}></div>
        
      </div>

    </div>
  );
}
