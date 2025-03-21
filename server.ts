import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./app";
import seedRooms from "./utils/seedRooms";
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("[+] Database Connected Successfully!");
    seedRooms(1000);
  });
console.log(process.env.PORT);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`[+] App running on port ${port}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.error(err.name, err.message);
  console.log("[-] Caught an error 💥\nQuiting now...");
  process.exit(1);
});
