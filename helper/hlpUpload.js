const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
const upload = multer({ storage: storage }).fields([{ name: 'file', maxCount: 1 }, { name: 'copy', maxCount: 4 }])
  
module.exports ={ upload};