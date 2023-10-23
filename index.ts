import "@ampt/nextjs/entrypoint";
import { http } from "@ampt/sdk";

import { app } from "./api/server";

http.node.use("/api", app);
