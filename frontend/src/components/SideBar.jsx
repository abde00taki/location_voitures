import  { useState } from "react";
import { Button, Offcanvas, Nav } from "react-bootstrap";
import { House, Tools, Phone, BoxArrowInRight, List } from "react-bootstrap-icons";
import { IoCarSportOutline } from "react-icons/io5";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const toggleSidebar = () => setShow(!show);

  return (
    <>
      {/* Icon trigger */}
      <Button
        variant="trasform"
        onClick={toggleSidebar}
        className="d-flex align-items-center gap-2 position-fixed text-light"
        style={{zIndex: "2000"}}
      >
        <List size={24} />
        LOCATION <IoCarSportOutline className="fs-3" />
      </Button>

      {/* Sidebar */}
      <Offcanvas
        show={show}
        onHide={toggleSidebar}
        placement="start"
        className="bg-dark text-light"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>LOCATION</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="flex-column gap-3">
            <Nav.Link href="#home" className="text-light d-flex align-items-center gap-2">
              <House /> Home
            </Nav.Link>
            <Nav.Link href="#services" className="text-light d-flex align-items-center gap-2">
              <Tools /> Services
            </Nav.Link>
            <Nav.Link href="#contact" className="text-light d-flex align-items-center gap-2">
              <Phone /> Contact
            </Nav.Link>
            <Button variant="warning" className="mt-3 d-flex align-items-center gap-2">
              <BoxArrowInRight /> Login
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
