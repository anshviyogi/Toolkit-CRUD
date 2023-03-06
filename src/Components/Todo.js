import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useDispatch,useSelector} from 'react-redux'
import { addUser, updateTodo } from '../features/todo/todoSlice'
import uuid from 'react-uuid'
import ListGroup from 'react-bootstrap/ListGroup';
import {BsFillTrashFill,BsFillPencilFill} from "react-icons/bs";
import { removeTodo } from '../features/todo/todoSlice';
import swal from 'sweetalert'

function Todo() {
    const[todo,setTodo] = useState('')
    const[edit,setEdit] = useState(false)
    const dispatch = useDispatch()
    const todoList = useSelector(data => data)

    // Form submit
    function submitHandler(e){
      e.preventDefault()
      if(todo === ''){
        return swal({
          title: "Please fill the input fields",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
      }
      const id = uuid()
      dispatch(addUser({todo,id}))
      setTodo('')
    }

    // Update Handler
    function updateHandler(e){
      setEdit(true)
      console.log(e)
      setTodo(e[0])
      localStorage.setItem('todo',JSON.stringify(e))
    }

    function changeTodo(e){
      e.preventDefault()
      const localTodoData = JSON.parse(localStorage.getItem('todo'))
      const finalData = [localTodoData[1],todo]
      
      // Dispatch
      dispatch(updateTodo(finalData))
      setTodo('')
      setEdit(false)
    }
    
    // Delete an todo
    function deleteHandler(e){
      const alert = swal({
        title: "Are you sure?", text: "Once deleted, you will not be able to recover this imaginary file!", icon: "warning", buttons: true, dangerMode: true,
      }).then(res =>{
        if(res){
        dispatch(removeTodo(e))
        }
      })
      
    }

  return (
    <>
    {/* Form for adding a Todo */}
    <Form style={{display:"flex"}}>
        <Form.Control placeholder='Type your Todo here....' onChange={e => setTodo(e.target.value)} value={todo}/>

        {
          !edit && <Button type='submit' onClick={submitHandler}>Submit</Button>
        }

        {
          edit && <Button type='submit' onClick={changeTodo}>Update</Button>
        }
    </Form>

    
    {/* Todo List */}

    <ListGroup as="ol" numbered>
        <br/>        

    {
          todoList.todo.map(data =>(
            <ListGroup.Item as="li" key={data.id} className="d-flex justify-content-between align-items-start">

      <div className="ms-2 me-auto">
        <div className="fw-bold">{data.todo}</div>
      </div>

      {/* Edit and Delete Buttons */}
      <Button variant='outline-info' style={{marginRight:"15px"}} onClick={()=> updateHandler([data.todo,data.id])}><BsFillPencilFill/></Button>

      <Button variant='outline-danger' onClick={()=> deleteHandler(data.id)}><BsFillTrashFill/></Button>

    </ListGroup.Item>
  ))
}
  </ListGroup>

    </>
  )
}

export default Todo