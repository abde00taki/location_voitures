
import { motion } from "framer-motion";


import Video from "../components/Video";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <div>
        <div className="d-none d-lg-flex">
          <NavBar show={true} />
        </div>
        <Video />
        <div className="container w-100 ">
          <h3 className="text-center">welcome</h3>
          <hr />
          <div className="row w-100">
            <div className="col-md-6">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1 }}
                style={{
                  margin: 0,
                }}
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
      </div>
    </div >
  )
}