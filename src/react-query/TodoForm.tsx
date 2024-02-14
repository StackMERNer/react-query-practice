import { useRef } from "react";
import useAddTodo from "./Hooks/useAddTodo";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const onSuccessfulAdd = () =>
    ref.current?.value ? (ref.current.value = "") : "";
  const addTodo = useAddTodo(onSuccessfulAdd);
  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current?.value)
            addTodo.mutate({
              completed: false,
              id: 0,
              title: ref.current.value,
              userId: 1,
            });
          else {
            alert("Missing title");
          }
        }}
        className="row mb-3"
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
