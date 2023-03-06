import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { addUser } from '../features/todo/userSlice'

function Header() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [role, setRole] = useState(null);
  const [password, setPasssword] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const addUserFunc = () => {
    const id = uuid()
    dispatch(addUser({id,name,email,username,mobile,role,password }));
    setShow(false);
  };

  return (
    <>
      <div style={{ borderBottom: "1px solid black" }}>
        <h1 style={{ textAlign: "center" }}>LOGO</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h5>Page Title</h5>
        {/*<button style={{border:"1px solid gray",padding:"2px",marginTop:"1px",width:"10%"}}>Add</button>*/}
        <Button
          onClick={handleShow}
          style={{
            border: "1px solid gray",
            padding: "2px",
            marginTop: "1px",
            width: "10%",
          }}
        >
          Add
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Items</Modal.Title>
          </Modal.Header>

          <Container>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your Mobile Number"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Select Role</option>
                  <option value="Role one">Role one</option>
                  <option value="Role two">Role two</option>
                  <option value="Role Three">Role Three</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPasssword(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Container>

          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={addUserFunc}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Header;
