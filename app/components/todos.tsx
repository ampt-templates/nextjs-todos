"use client";

import { useCallback, useState } from "react";
import dayjs from "dayjs";
import {
  Checkbox,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Input,
  Spinner,
} from "@nextui-org/react";
import { PlusCircle, XCircle } from "react-feather";
import { Col } from "./col";
import { Helper } from "./helper";
import { api } from "../api";
import { useTodos } from "../hooks/useTodos";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type TodoItem = {
  id: string;
  name: string;
  description?: string;
  created: string;
  status: "complete" | "incomplete";
};

const TodoCard = ({
  todo,
  toggleTodo,
  updatingTodo,
  deletingTodo,
  deleteTodo,
}: {
  todo: TodoItem;
  updatingTodo: string | null;
  deletingTodo: string | null;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}) => (
  <div className="flex flex-direction-row items-center">
    <Card
      key={todo.id}
      onClick={() => toggleTodo(todo.id)}
      isHoverable
      isPressable
      shadow="lg"
      className="w-full mb-3"
    >
      <CardBody>
        <div className="flex flex-direction-row items-center">
          {updatingTodo === todo.id ? (
            <Spinner className="mr-4" size="sm" color="primary" />
          ) : (
            <Checkbox
              color="success"
              radius="full"
              isSelected={todo.status === "complete"}
            />
          )}
          <h1
            className={`text-lg text-black font-semibold ${
              todo.status === "complete" ? "line-through" : ""
            }`}
          >
            {todo.name}
          </h1>
        </div>
        {todo.description && (
          <p className="mt-4 text-md text-gray-600">{todo.description}</p>
        )}
      </CardBody>
      <Divider />
      <CardFooter>
        <p className="text-sm text-gray-500">
          Added {dayjs(todo.created).fromNow()}
        </p>
      </CardFooter>
    </Card>
    <Button
      className="ml-4"
      variant="shadow"
      color="danger"
      size="sm"
      isIconOnly
      isLoading={deletingTodo === todo.id}
      onClick={() => deleteTodo(todo.id)}
    >
      {deletingTodo !== todo.id ? <XCircle color="white" /> : null}
    </Button>
  </div>
);

export function Todos() {
  const [savingTodo, setSavingTodo] = useState(false);
  const [updatingTodo, setUpdatingTodo] = useState<string | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
    completed: false,
  });
  const { data: todos, isLoading, mutate: refreshTodos } = useTodos();

  const deleteTodo = useCallback(
    async (id: string) => {
      try {
        setDeletingTodo(id);
        const { status } = await api(`/todos/${id}`, {
          method: "DELETE",
        });

        if (status === 404) {
          alert("Todo not found!");
          return;
        }

        if (status === 200) {
          await refreshTodos();
        }
      } catch (err: unknown) {
        alert("Something went wrong :(");
      } finally {
        setDeletingTodo(null);
      }
    },
    [refreshTodos, setDeletingTodo]
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      try {
        setUpdatingTodo(id);
        const { status } = await api(`/todos/${id}`, {
          method: "PATCH",
        });

        if (status === 404) {
          alert("Todo not found!");
          return;
        }

        if (status === 200) {
          await refreshTodos();
        }
      } catch (err: unknown) {
        alert("Something went wrong :(");
      } finally {
        setUpdatingTodo(null);
      }
    },
    [refreshTodos]
  );

  const addTodo = useCallback(async () => {
    setSavingTodo(true);
    const res = await api("/todos", {
      method: "PUT",
      body: JSON.stringify(newTodo),
    });

    if (res?.status === 200) {
      setNewTodo({
        name: "",
        description: "",
        completed: false,
      });
      setSavingTodo(false);
      await refreshTodos();
    }
  }, [setSavingTodo, setNewTodo, refreshTodos, newTodo]);

  if (isLoading) {
    return (
      <div className="flex items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Col>
      {todos.length === 0 ? (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold">No todos yet!</h1>
          <p className="text-gray-500 mt-4">
            Add a todo by submitting one below or importing the test data.
          </p>
          <Col>
            <Helper
              command="import"
              text="will import the test data from data.json."
            />
            <Helper
              command="dev"
              text="will start up a local instance of the Next.js app."
            />
            <Helper
              command="deploy"
              text="will deploy the current state of your app to a permanent environment."
            />
          </Col>
        </div>
      ) : null}
      {todos?.map((todo: any) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updatingTodo={updatingTodo}
          deletingTodo={deletingTodo}
        />
      ))}
      <Card className="mt-5">
        <CardBody>
          <div className="flex flex-col items-center">
            <Input
              className="mb-4"
              radius="sm"
              placeholder="What needs to get done?"
              label="New Todo"
              value={newTodo.name}
              onChange={(e) =>
                setNewTodo({
                  ...newTodo,
                  name: e.target.value,
                })
              }
            />
            <Input
              className="mb-4"
              radius="sm"
              label="Description (Optional)"
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({
                  ...newTodo,
                  description: e.target.value,
                })
              }
              placeholder="Any notes?"
            />
            <Checkbox
              className="align-self-center"
              color="success"
              radius="full"
              isSelected={newTodo.completed}
              onChange={(e) =>
                setNewTodo({
                  ...newTodo,
                  completed: e.target.checked,
                })
              }
            >
              <p className="text-gray-500 font-semibold">Completed</p>
            </Checkbox>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex-grow flex flex-direction-row align-self-center justify-center">
            <Button
              isDisabled={!newTodo.name}
              className="w-full"
              variant="shadow"
              size="lg"
              radius="sm"
              color="success"
              onClick={() => (!savingTodo ? addTodo() : null)}
            >
              {savingTodo ? (
                <Spinner color="white" size="sm" />
              ) : (
                <>
                  <PlusCircle style={{ margin: "5px" }} color="white" />
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Col>
  );
}
