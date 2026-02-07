const express=require("express");
const {getEmployees,addEmployee,updateEmployee,login}=require('../Controller/employee');
const {upload}=require("../utils/multer")
const router=express.Router();

router.get("/get-emp",getEmployees);
router.post("/add-emp",upload.single("profile_picture"),addEmployee)
router.put('/update-emp',upload.single("profile_picture"),updateEmployee);
router.post("/login",login)
module.exports=router;
