const express=require('express');
const router=express.Router();

const {getSuppliers,addSupplier,updateSupplier}=require('../Controller/supplier')
router.get("/get-suppliers",getSuppliers);
router.post('/add-supplier',addSupplier);
router.put("/update-supplier",updateSupplier);
module.exports=router;
