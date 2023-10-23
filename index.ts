import { http } from "@ampt/sdk";
import { app } from "./api/server";

async function main() {
  http.node.use("/api", app);
  // @ts-ignore
  await import("@ampt/nextjs/entrypoint");
}

main().catch((err) =>
  console.log(
    "Failed to load application: ",
    err.message,
    err.stack || err,
    err.details || ""
  )
);
