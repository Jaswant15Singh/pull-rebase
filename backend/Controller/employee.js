const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../utils/db");
const { deleteFile } = require("../utils/multer");

const getEmployees = async (req, res, next) => {
  try {
    const data = await db.query("SELECT * from employee_def");
    res.status(200).json({ success: true, data: data.rows });
  } catch (error) {
    next(error);
  }
};

const addEmployee = async (req, res, next) => {
  const tx = await db.connect();
  try {
    const {
      fName,
      lName,
      contact,
      email,
      address,
      birth_year,
      password,
      status,
      employee_type,
    } = req.body;

    let profile_picture = "";
    if (req.file) {
      profile_picture = req.file.path
        .replace(/^.*?uploads[\\/]/, "uploads/") // keep relative path
        .replace(/\\/g, "/"); // normalize slashes for URLs
    }

    const hashedSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hashedSalt);
    await tx.query("begin");
    const id = await tx.query(
      "INSERT INTO employee_def (fName,lName,contact,email,address,birth_year,password,status,employee_type,profile_picture,hired_date) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,now()) returning emp_id",
      [
        fName,
        lName,
        contact,
        email,
        address,
        birth_year,
        hashedPassword,
        status === "true" ? true : false,
        employee_type,
        profile_picture,
      ]
    );

    await tx.query("UPDATE employee_def set employee_id= $1 where emp_id=$2", [
      "emp100" + id.rows[0].emp_id,
      id.rows[0].emp_id,
    ]);
    await tx.query("commit");
    res.status(200).json({ message: "Employee Added", status: true });
  } catch (error) {
    await tx.query("rollback");
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  const tx = await db.connect();
  try {
    const { fName, lName, contact, email, address, birth_year, emp_id } =
      req.body;

    // const profile_image=req.file?:''

    await tx.query("begin");
    const empDetails = await tx.query(
      "SELECT * from employee_def where emp_id=$1",
      [emp_id]
    );
    const profile_picture = req.file?.fieldname
      ? req.file.path
          .replace(/^.*?uploads[\\/]/, "uploads/")
          .replace(/\\/g, "/")
      : empDetails.rows[0].profile_picture;
    console.log(profile_picture);

    if (req.file?.fieldname) {
      deleteFile(empDetails.rows[0].profile_picture);
    }
    await tx.query(
      "UPDATE employee_def set fname=$1,lName=$2,contact=$3,email=$4,address=$5,birth_year=$6,profile_picture=$8 where emp_id=$7",
      [
        fName,
        lName,
        contact,
        email,
        address,
        birth_year,
        emp_id,
        profile_picture,
      ]
    );
    await tx.query("commit");
    res.status(200).send("success");
  } catch (error) {
    await tx.query("ROLLBACK");
    next(error);
  }
};

const login = async (req, res, next) => {
  const tx = await db.connect();
  try {
    const { emp_id, password } = req.body;
    const employee = await db.query(
      "SELECT * from employee_def where employee_id = $1",
      [emp_id]
    );
    if (employee.rows.length < 1) {
      return res
        .status(200)
        .json({ success: true, message: "No such employee exists" });
    } else {
      const emp_data = employee.rows[0];
      const hashedPassword = emp_data.password;
      const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
      if (!isPasswordMatched) {
        return res
          .status(200)
          .json({ success: true, message: "Password doesnt match" });
      }
      req.session.user = emp_data;
      const token = jwt.sign(
        { id: emp_data.emp_id, emp_id: emp_data.employee_id },
        process.env.JWT_SECRET,
        { expiresIn: "1hr" }
      );
      res
        .status(200)
        .json({ success: true, message: "Logged In Successfully", token });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getEmployees, addEmployee, updateEmployee, login };
