const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads/Received-Resumes");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const {
  createResume,
  updateResume,
  deleteResume,
  fetchOneResume,
  fetchAllResume,
} = require("../Controllers/Resume-Controller");
const Authorize = require("../Helpers/Middlewares/Authorize");

router.post("/", upload.single("proof"), createResume);
router.put("/:id", Authorize("admin"), upload.single("proof"), updateResume);
router.delete("/:id", Authorize("admin"), deleteResume);
router.get("/:id", Authorize("admin"), fetchOneResume);
router.get("/", Authorize("admin"), fetchAllResume);

module.exports = router;
