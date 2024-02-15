import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../services/todoService";
interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,

    onMutate: (newTodo: Todo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) ?? [];
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) => [
        newTodo,
        ...previousTodos,
      ]);
      return { previousTodos };
    },
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => {
          return todo.id === newTodo.id ? savedTodo : todo;
        })
      );
      if (onAdd) {
        onAdd();
      }
    },
    onError: (error, newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(
          CACHE_KEY_TODOS,
          context.previousTodos
        );
      }
    },
  });
};

export default useAddTodo;
