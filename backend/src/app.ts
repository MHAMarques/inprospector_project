import "reflect-metadata";
import express from "express";
import 'express-async-errors';
import userRoutes from "./routers/user.routes";
import loginRoutes from "./routers/login.routes";
import prospectRoutes from "./routers/prospect.routes";
import handleError from "./errors/HandleError";


const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/login', loginRoutes)
app.use('/prospects', prospectRoutes)

app.use(handleError);

export default app;