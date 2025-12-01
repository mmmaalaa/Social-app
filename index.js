import express from "express";
import bootstrap from "./src/app.controller.js";
import startHardDelete from "./src/utils/hardDelete.js";
const app = express();
const port = 5000;
await bootstrap(app, express);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

startHardDelete()