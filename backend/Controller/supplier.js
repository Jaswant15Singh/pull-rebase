const db = require("../utils/db");

const getSuppliers = async (req, res, next) => {
  try {
    const data = await db.query("SELECT * FROM supplier_def");
    res.status(200).json({ success: true, data: data.rows });
  } catch (error) {
    next(error);
  }
};

const addSupplier = async (req, res,next) => {
  try {
    const { name, email, contact, address } = req.body;
    await db.query(
      `INSERT INTO supplier_def (name,contact,email,address,created_date) 
            values ($1,$2,$3,$4,now())`,
      [name, contact, email, address]
    );
    res.status(200).json({success:true,message:"Supplier created successfully"})
  } catch (error) {
    next(error)
  }
};


const updateSupplier=async(req,res,next)=>{
    try {
        const {id, name, email, contact, address } = req.body;
        await db.query(`UPDATE supplier_def set name=$1,contact=$2,email=$3,address=$4,updated_date=now() where id`,[name,contact,email,address]);
        res.status(200).json({success:true,message:"Supplier updated successfully"});
    } catch (error) {
        next(console.error())
    }
}
module.exports = { getSuppliers ,addSupplier,updateSupplier};
