import express from "express";
import { createModel, getModels, deleteModel, setActiveModel } from "../controller/modelController.js";

 const router = express.Router();

 router.post("/create-model/:modelName", createModel);
 router.get("/get-models", getModels);
 router.delete("/delete-model/:modelName", deleteModel);
 router.post("/set-active-model/:modelName", setActiveModel);

 export default router;