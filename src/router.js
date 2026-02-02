import express from "express";
import {authmiddleware} from "./middleware/auth.js"


import {
  getdata,
  getdatabyid,
  postdataregister,
  updatedata,
  deletedata,
  postdatalogin,
  protect,
  updatepost,
  updatepostforcheck
} from "./controller.js";

const route=express.Router()

route.get("/", getdata);
route.get("/me", authmiddleware,protect);
route.get("/:id",getdatabyid)  
route.post("/register", postdataregister);//
route.put("/:id", updatedata);
route.delete("/delete", deletedata);
route.post("/login", postdatalogin);//
route.post("/removespecificobj/:id",updatepostforcheck)
route.post("/normalpost/:id",updatepost);

export default route;
