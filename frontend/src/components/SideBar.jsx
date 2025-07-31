import { useState } from "react";
import { Button, Offcanvas, Nav } from "react-bootstrap";
import { House, Tools, BoxArrowInRight } from "react-bootstrap-icons";
import { IoCarSportOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import Profile from "../pages/Profile";


const Sidebar = () => {
  const [show, setShow] = useState(false);
  const toggleSidebar = () => setShow(!show);

  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    toggleSidebar();
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="dark"
        onClick={toggleSidebar}
        className="d-flex align-items-center gap-2 position-fixed mt-2 mx-2"
        style={{
          zIndex: "2000",

        }}
      >
        <IoCarSportOutline color="rgba(251, 138, 1, 1)" className="fs-3 " />
        TAKICARS
      </Button>

      {/* Sidebar with animation */}
      <Offcanvas
        show={show}
        onHide={toggleSidebar}
        placement="start"
        className="custom-sidebar bg-dark text-light"
        backdropClassName="custom-backdrop"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title className="text-warning">TAKICARS</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="flex-column gap-3">
            <NavLink
              to="/"
              onClick={toggleSidebar}
              className="text-light text-decoration-none d-flex align-items-center gap-2"
            >
              <House /> Home
            </NavLink>

            <NavLink
              to="/cars"
              onClick={toggleSidebar}
              className="text-light text-decoration-none d-flex align-items-center gap-2"
            >
              <IoCarSportOutline /> Cars
            </NavLink>

            <NavLink
              to="/seved"
              onClick={toggleSidebar}
              className="text-light text-decoration-none d-flex align-items-center gap-2"
            >
              <Tools /> Saved
            </NavLink>

            {!user && (
              <>
                <NavLink
                  to="/signup"
                  onClick={toggleSidebar}
                  className="btn btn-outline-light mt-3 d-flex align-items-center gap-2"
                >
                  <BoxArrowInRight /> Sign Up
                </NavLink>

                <NavLink
                  to="/signin"
                  onClick={toggleSidebar}
                  className="btn mt-2 d-flex align-items-center gap-2"
                  style={{
                    border: "1px solid rgba(251, 138, 1, 1)",
                    color: "rgba(251, 138, 1, 1)",
                  }}
                >
                  <BoxArrowInRight /> Sign In
                </NavLink>
              </>
            )}

            {user && (
              <>
                {user?.role === "admin" && (
                  <NavLink
                    to="/admin"
                    target="_blank"
                    onClick={toggleSidebar}
                    className="btn btn-outline-info mt-2 d-flex align-items-center gap-2"
                    style={{ border: "none" }}
                  >
                    <Tools /> Admin Panel
                  </NavLink>
                )}

                {user?.role !== "admin" && (
                  <button
                    className="btn text-light mt-2 d-flex align-items-center gap-2"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#profileSidebar"
                    aria-controls="profileSidebar"
                    style={{ border: "none" }}
                  >
                    <NavLink to={'/profile'}
                      style={{
                        color: "rgba(251, 138, 1, 1)"
                      }}
                      className="text-decoration-none"
                    >
                      <CgProfile color="rgba(251, 138, 1, 1)" size={30} /> Profile
                    </NavLink>
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="btn text-light mt-2 d-flex align-items-center gap-2"
                  style={{ border: "none" }}
                >
                  <IoIosLogOut size={30} /> Logout
                </button>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Profile Sidebar */}
      {/* <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="profileSidebar"
        aria-labelledby="profileSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="profileSidebarLabel">
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
          <hr className="text-light" />
          <br />
          <Profile />
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
