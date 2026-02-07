const express=require("express");
const router=express.Router();
const {getCategory,addCategory,updateCategory,deleteCategory} =require("../Controller/category")
router.get("/get-categories",getCategory);
router.post("/add-category",addCategory);
router.put("/update-category",updateCategory);
router.post("/delete-category",deleteCategory);

export default router;