

const TodoList = ({data}) => {
   return (
        <div>
            {
              data.map((todo) => <h1 key = {todo.id}>{todo.title}</h1>)
          }
        </div>
   )
}

export default TodoList;