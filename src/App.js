import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Header from './Components/Header'
import { DataGrid } from '@mui/x-data-grid';
import { removeUser, updateUser } from './features/todo/userSlice'
import swal from 'sweetalert'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const columns = [
  // { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Name', width: 900 },
  // { field: 'email', headerName: 'Email', width: 150 },
  // { field: 'password', headerName: "Password", width: 150},
  // { field: 'role', headerName: "Role", width: 150},
  // { field: 'username', headerName: "Username", width: 150},
  // { field: 'mobile', headerName: "Mobile", width: 150},
  {
    field: 'Edit',
    headerName: 'Edit',
    description: 'Edit your user',
    sortable: false,
    width: 100,
    valueGetter: (params) => 
    `${params.field}`,
  },
  {
    field: 'Delete',
    headerName: 'Delete',
    description: 'Delete user',
    sortable: false,
    width: 100,
    valueGetter: (params) => 
    `${params.field}`,
  },
];

function App() {
  const data = useSelector(data => data.todo)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [role, setRole] = useState(null);
  const [password, setPasssword] = useState(null);
  const [id, setId] = useState(null)


  const clickHandler = (params)=>{
    if(params.field === "Edit"){
      console.log(params)
      setName(params.row.name)
      setEmail(params.row.email)
      setUsername(params.row.username)
      setMobile(params.row.mobile)
      setRole(params.row.role)
      setId(params.row.id)
      setShow(true)
    } else if(params.field === "Delete"){
      const alert = swal({
        title: "Are you sure?", text: "Once deleted, you will not be able to recover this imaginary file!", icon: "warning", buttons: true, dangerMode: true,
      }).then(res =>{
        if(res){
        dispatch(removeUser(params.row.id))
        }
      })
    }
  }

  const updateChanges = ()=> {
    const details = {
      name,email,username,mobile,role,id,password
    }
    dispatch(updateUser({details}))
    setShow(false)
  }

  return (
    <Container>
      {/*<h1 style={{textAlign:"center"}}>To-Do List</h1>*/}
      <Header />
      {/*<Todo/>*/}
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onCellClick={clickHandler}
      />
    </div>

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
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your Mobile Number"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Role</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={role}
            onChange={e => setRole(e.target.value)}
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
            value={password}
            onChange={e => setPasssword(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Container>

    <Modal.Footer>
      <Button type="button" variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button type="submit" variant="primary" onClick={updateChanges}>
        Update Changes
      </Button>
    </Modal.Footer>
  </Modal>

    </Container>
  )
}

export default App