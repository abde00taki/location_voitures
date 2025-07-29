import { FaFacebook, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="text-light pt-4" style={{ backgroundColor: "#212529" }}>
            <div className="container">
                <div className="row w-100 gy-4">
                    {/* Menu */}
                    <div className="col-md-3">
                        <h5 className="text-orange" color="rgba(251, 138, 1, 1)">Menu</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-light text-decoration-none">Home</a></li>
                            <li><a href="/cars" className="text-light text-decoration-none">Cars</a></li>
                            <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
                            <li><a href="/about" className="text-light text-decoration-none">About</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-3">
                        <h5 className="text-orange" color="rgba(251, 138, 1, 1)">Contact</h5>
                        <p><FaPhoneAlt className="text-orange" /> +212 600-000000</p>
                        <p><FaEnvelope className="text-orange" /> info@location.ma</p>
                        <p><FaMapMarkerAlt className="text-orange" /> Midelt, Morocco</p>
                    </div>

                    {/* Social */}
                    <div className="col-md-3">
                        <h5 className="" color="rgba(251, 138, 1, 1)">Follow Us</h5>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-light fs-4"><FaFacebook /></a>
                            <a href="#" className="text-light fs-4"><FaInstagram /></a>
                        </div>
                    </div>

                    {/* Localisation */}
                    <div className="col-md-3">
                        <h5 className="text-orange" color="rgba(251, 138, 1, 1)">Our Location</h5>
                        <div className="ratio ratio-4x3">
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

                <div className="text-center py-3 mt-4 border-top border-secondary">
                    <small>&copy; {new Date().getFullYear()} Location Cars. All rights reserved.</small>
                </div>
            </div>
        </footer>
    );
}
