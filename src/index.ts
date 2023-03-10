import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";

import { userRouter  } from "./user/user.router";

dotenv.config();

if(!process.env.PORT){
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
