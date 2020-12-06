const multer = require('multer');
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      var str = file.originalname;
      var dotIndex = str.lastIndexOf('.');
      var ext = str.substring(dotIndex);
      cb(null, (Number((new Date()))).toString()+ext);
    },
  });
  
  var upload = multer({storage: storage});
 
module.exports = upload;
