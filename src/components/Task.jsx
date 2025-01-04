import React from 'react'
import { useState, useEffect } from 'react'
const Task = () => {
    const [todo, settodo] = useState("")
    const [todos, settodos] = useState([])
    const [finished, setfinished] = useState(false)
    useEffect(() => {
        let str=localStorage.getItem("todos")
        if (str) {
            let todos = JSON.parse(localStorage.getItem("todos"))
            settodos(todos)
        }
    }, [])

    const saveToLS = () => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    const handlechange = (e) => {
        settodo(e.target.value)
        saveToLS()
    }
    const handleAdd = () => {
        if (todo != " ") {
            settodos([...todos, { id: Date.now(), todo, isCompleted: false }])
            settodo("")
        }
        saveToLS()
    }
    const handlecheckbox = (e) => {
        let id = e.target.name
        let index = todos.findIndex(item => { return item.id === parseInt(id) });
        let newArray = [...todos]
        newArray[index].isCompleted = !newArray[index].isCompleted
        settodos(newArray)
        saveToLS()
    }
    const handleDelete = (e) => {
        let a = confirm("Are you sure want to delete")
        if (a) {
            let id = e.target.name
            let newArray = todos.filter(item => {
                return item.id !== parseInt(id)
            })
            settodos(newArray)
        }
        saveToLS()
    }
    const handleEdit = (e, id) => {
        let v = todos.filter(item => {
            return item.id === id
        })
        console.log(v)
        settodo(v[0].todo)
        let newArray = todos.filter(item => {
            return item.id !== parseInt(id)
        })
        settodos(newArray)
        saveToLS()
    }
    const handleFinished = () => {
        setfinished(!finished)
       }
       const filteredTodos = finished
       ? todos.filter(item => item.isCompleted === true)
       : todos.filter(item => item.isCompleted === false);
    return (
        <>
            <div className="body">
                <h5 className='m-2'>Add a Task</h5>
                <div className="task g-4 m-2">
                    <input className='input' onChange={handlechange} value={todo} type="text" />
                    <button className='btn' onClick={handleAdd} disabled={todo.length<=3}>save</button>
                </div>
                <h5 className='m-2'>Your Tasks</h5>
                <div className='g-4'>
                    <input type="checkbox" onChange={handleFinished} checked={finished} id="" />
                    <h5>Show finished</h5>
                </div>
                {filteredTodos.map(item => {
                    return <div key={item.id} className="todo flex m-2">
                        <div className='flex g-4'>
                            <input type="checkbox" onChange={handlecheckbox} checked={item.isCompleted} name={item.id} id="" />
                            <div className="text" style={{ textDecoration: item.isCompleted ? 'line-through' : 'none', }}>{item.todo}</div>
                        </div>
                        <div className="buttons g-4">
                            <button className='btn' onClick={e => handleEdit(e, item.id)}>edit</button>
                            <button className='btn' name={item.id} onClick={handleDelete}>delete</button>
                        </div>
                    </div>
                })}
            </div>

        </>
    )
}

export default Task