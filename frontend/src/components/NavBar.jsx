import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { House, Tools, Phone, BoxArrowInRight } from "react-bootstrap-icons";
import { IoCarSportOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import Profile from "../pages/Profile";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

const NavBar = ({ show }) => {
  const [navbarStyle, setNavbarStyle] = useState("transparent");
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      {show && (
        <Navbar
          expand="lg"
          className={`${navbarClasses}`}
          style={{ transition: "all 0.3s ease-in-out" }}
        >
          <Container>
            <IoCarSportOutline className="fs-1" />
            <Navbar.Brand href="#" className="d-flex align-items-center">
              <span className={linkClassName}>LOCATION</span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="mx-auto gap-3">
                <NavLink
                  to={"/"}
                  className={`d-flex align-items-center gap-1 ${linkClassName}`}
                >
                  <House /> Home
                </NavLink>
                <NavLink
                  to={"/cars"}
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

              {!user && (
                <NavLink
                  to={"/contact"}
                  className="btn btn-outline-success mx-3 d-flex align-items-center gap-1"
                >
                  <BoxArrowInRight /> Sign Up
                </NavLink>
              )}

              {!user ? (
                <NavLink
                  to={"/signin"}
                  variant={buttonVariant}
                  className="btn btn-outline-warning d-flex align-items-center gap-1"
                >
                  <BoxArrowInRight /> Sign In
                </NavLink>
              ) : (
                <>

                  {user?.role === "admin" && (
                    <NavLink
                      to="/admin"
                      target="_blank"
                      className="btn btn-outline-info mx-2 d-flex align-items-center gap-1"
                      style={{ border: "none" }}
                    >
                      <Tools /> Admin Panel
                    </NavLink>
                  )}

                  {user?.role !== "admin" && (
                    <button
                      className="btn btn-outline-secondary mx-2"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                      style={{ border: "none" }}
                    >
                      <CgProfile size={30} />
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger mx-2"
                    style={{ border: "none" }}
                  >
                    <IoIosLogOut size={30} />
                  </button>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Profile
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <hr className="text-light" /><br />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
