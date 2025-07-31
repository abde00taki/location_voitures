import {
    FaFacebook,
    FaInstagram,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="text-light pt-5 " style={{ backgroundColor: "#1a1a1a" }}>
            <div className="container">
                <div className="row w-100 gy-4">
                    {/* Menu */}
                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3" style={{ color: "rgba(251,138,1,1)" }}>
                            Menu
                        </h5>
                        <ul className="list-unstyled d-flex flex-column gap-2">
                            {[
                                { label: "Home", link: "/" },
                                { label: "Cars", link: "/cars" },
                                { label: "Contact", link: "/contact" },
                                { label: "About", link: "/about" },
                            ].map((item, i) => (
                                <li key={i}>
                                    <a
                                        href={item.link}
                                        className="text-light text-decoration-none"
                                        style={{ transition: "0.3s" }}
                                        onMouseOver={(e) =>
                                            (e.currentTarget.style.color = "rgba(251,138,1,1)")
                                        }
                                        onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3" style={{ color: "rgba(251,138,1,1)" }}>
                            Contact
                        </h5>
                        <p className="mb-2">
                            <FaPhoneAlt className="me-2 text-orange" /> +212 600-000000
                        </p>
                        <p className="mb-2">
                            <FaEnvelope className="me-2 text-orange" /> info@location.ma
                        </p>
                        <p className="mb-0">
                            <FaMapMarkerAlt className="me-2 text-orange" /> Midelt, Morocco
                        </p>
                    </div>

                    {/* Social */}
                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3" style={{ color: "rgba(251,138,1,1)" }}>
                            Follow Us
                        </h5>
                        <div className="d-flex gap-3">
                            <a
                                href="#"
                                className="fs-4 text-light"
                                style={{ transition: "0.3s" }}
                                onMouseOver={(e) =>
                                    (e.currentTarget.style.color = "rgba(251,138,1,1)")
                                }
                                onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="#"
                                className="fs-4 text-light"
                                style={{ transition: "0.3s" }}
                                onMouseOver={(e) =>
                                    (e.currentTarget.style.color = "rgba(251,138,1,1)")
                                }
                                onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                            >
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Localisation */}
                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3" style={{ color: "rgba(251,138,1,1)" }}>
                            Our Location
                        </h5>
                        <div className="ratio ratio-4x3 rounded overflow-hidden shadow-sm">
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
                    <small style={{ color: "#aaa" }}>
                        &copy; {new Date().getFullYear()} Location Cars. All rights reserved.
                    </small>
                </div>
            </div>
        </footer>
    );
}
