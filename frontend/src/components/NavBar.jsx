import { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { House, Tools, Phone, BoxArrowInRight } from "react-bootstrap-icons";
import { IoCarSportOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";


const NavBar = ({show}) => {
  const [navbarStyle, setNavbarStyle] = useState("transparent");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setNavbarStyle("transparent");
      } else if (currentScrollY >= 50 && currentScrollY < 300) {
        setNavbarStyle("white");
      } else if (currentScrollY >= 300 && currentScrollY > lastScrollY) {
        setNavbarStyle("hidden");
      } else if (currentScrollY >= 300 && currentScrollY < lastScrollY) {
        setNavbarStyle("white");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navbarClasses = `
    ${navbarStyle === "transparent" ? "bg-transparent text-light" : ""}
    ${navbarStyle === "white" ? "bg-white shadow-sm text-dark" : ""}
    ${navbarStyle === "hidden" ? "d-none" : ""}
    fixed-top
    transition
  `;

  const buttonVariant =
    navbarStyle === "white" ? "warning" : "outline-warning";

  const linkClassName =
    navbarStyle === "white" ? "text-dark" : "text-light";

  return (
    <div>
      {show && (
         <Navbar
      expand="lg"
      className={`${navbarClasses}` }
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      <Container>
        {/* Logo + Brand */}
        <IoCarSportOutline className="fs-1" />
        <Navbar.Brand href="#" className="d-flex align-items-center">
          
          <span className={linkClassName}>LOCATION</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Center links */}
          <Nav className="mx-auto gap-3">
            <NavLink
            to={'/'}
              href="#home"
              className={`d-flex align-items-center gap-1 ${linkClassName}`}
            >
              <House /> Home
            </NavLink>
            <NavLink
            to={'/cars'}
              href="#services"
              className={`d-flex align-items-center gap-1 ${linkClassName}`}
            >
              <Tools /> Cars
            </NavLink>
            <Nav.Link
              href="#contact"
              className={`d-flex align-items-center gap-1 ${linkClassName}`}
            >
              <Phone /> Contact
            </Nav.Link>
          </Nav>

          {/* Login button */}
          <NavLink
          to={'/contact'}
            variant={buttonVariant}
            className="btn btn-outline-warning d-flex align-items-center gap-1"
          >
            <BoxArrowInRight /> Sign Up
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      )}
    </div>
  );
};

export default NavBar;
