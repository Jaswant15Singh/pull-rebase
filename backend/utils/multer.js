const multer = require("multer");
const path = require("path");
const fs = require("fs");

const deleteFile=(path)=>{
  console.log("multer path",path);
  
  fs.unlink(`public/${path}`, (err) => {
  if (err) console.log(err);
  else {
    console.log(`\nDeleted file: ${path}`);
  }
});
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    if (file.fieldname === "profile_picture") {
      cb(null, "public/uploads/employees");
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

const upload = multer({ storage });
module.exports = {upload,deleteFile};
