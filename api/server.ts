import express, { Request, Response } from "express";
import { data } from "@ampt/data";

type TodoItem = {
  id: string;
  name: string;
  description?: string;
  status: "complete" | "incomplete";
};

const app: express.Application = express();

app.use(express.json());

app.use((req, _res, next) => {
  console.info({
    method: req.method,
    url: req.url,
    body: req.body,
  });
  next();
});

const todos = express.Router({ mergeParams: true });

todos.get("/", async (_req: Request, res: Response) => {
  const { items } = await data.get<TodoItem>("todo:*", { meta: true });
  res.json(
    items.map((item: any) => ({ ...item.value, created: item.created }))
  );
});

todos.put("/", async (req: Request, res: Response) => {
  const { name, description, completed } = req.body;
  const newTodo: TodoItem = {
    id: Math.random().toString(36),
    name,
    description,
    status: completed ? "complete" : "incomplete",
  };
  await data.set<TodoItem>(`todo:${newTodo.id}`, newTodo);
  res.sendStatus(200);
});

todos.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await data.get<TodoItem>(`todo:${id}`);

  if (!todo) {
    res.sendStatus(404);
    return;
  }

  const toggleStatus = todo.status === "complete" ? "incomplete" : "complete";

  await data.set<TodoItem>(`todo:${id}`, {
    status: toggleStatus,
  });

  res.sendStatus(200);
});

todos.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await data.get<TodoItem>(`todo:${id}`);

  if (!todo) {
    res.sendStatus(404);
    return;
  }

  await data.remove(`todo:${id}`);

  res.sendStatus(200);
});

app.use("/api/todos", todos);

export { app };
