const { http } = require("@ampt/sdk");
const { app } = require("./api/server");

try {
  // @ts-ignore
  import("@ampt/nextjs/entrypoint");
  http.node.use("/api", app);
} catch (err: any) {
  console.error(err, "error initting app!");
}
