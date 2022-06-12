import React from "react";
import TodoList from "./TodoList"

const Todo = () =>{
    const [input , setInput] = React.useState("");
    const [todos , setTodos] = React.useState([]);
    const [loading , setLoading] = React.useState(false);
    const[error , setError] = React.useState(false);

    const getTodo = () => {
         setLoading(true);
        fetch(" http://localhost:3001/todos")
        .then((res) => res.json())
        .then((res) => {
            setTodos(res);
            //  setLoading(false);
        })
        .catch((err) => {
             setError(true);
             setTodos([]);
            //   setLoading(false);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    React.useEffect(() => {
         getTodo()
    } , [])

    const addTodo = () => {
       setLoading(true);
        const todoObj = {
             title : input,
             status : false,
        }
    
       fetch("http://localhost:3001/todos" , {
            method : "POST",
            body : JSON.stringify(todoObj),
            headers : {
                "content-type" : "application/json"
            }
        }).then((res) => res.json())
           .then((res) => {
             getTodo();
        })
          .catch((err) => {
             setError(true);
             setTodos([]);
          })
          .finally(() => {
               setLoading(false);
          })

    }

   
    return loading ? (<h1>Loading...</h1>)
    : error ? (<h1>Error...</h1>)
    :(    
    <>
            <div>
                <input type = "Text" 
                placeholder = "Add Todo" 
                value = {input} 
                onChange = {(e) => setInput(e.target.value)}/>
                <button onClick = {addTodo}>Add Todo</button>
           </div>
           
            <TodoList data = {todos}/>
         </>
    )
}

export default Todo;