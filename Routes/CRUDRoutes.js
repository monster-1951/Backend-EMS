import express from "express";

import auth from "../middleware/auth.js";
import { CreateEmployee } from "../Utils/CRUD-Operations/CreateEmployee.js";
import { FetchAllEmployees, FindEmployeeById } from "../Utils/CRUD-Operations/FetchEmployeeDetails.js";
import { UpdateEmployeeById } from "../Utils/CRUD-Operations/UpdateEmployeeDetails.js";
import { DeleteEmployeeById } from "../Utils/CRUD-Operations/DeleteEmploy.js";
const router = express.Router();
// app.use('/CRUD',CRUDRouter)

router.post("/Create",auth,CreateEmployee);
router.get("/",auth,FetchAllEmployees);
router.get("/Employee/:id",auth,FindEmployeeById);
router.post("/Employee/Update/:id",auth,UpdateEmployeeById);
router.post("/Employee/Delete/:id",auth,DeleteEmployeeById);
// router.get('/logout',auth,logout)

export { router as CRUDRouter };
