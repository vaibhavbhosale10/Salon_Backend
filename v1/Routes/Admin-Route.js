const router = require("express").Router();

const {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  fetchOneAdmin,
  fetchAllAdmin,
} = require("../Controllers/Admin-Controller");
const Authorize = require("../Helpers/Middlewares/Authorize");

router.post("/", createAdmin);
router.put("/:id", Authorize("admin"), updateAdmin);
router.delete("/:id", Authorize("admin"), deleteAdmin);
router.get("/:id", Authorize("admin"), fetchOneAdmin);
router.get("/", Authorize("admin"), fetchAllAdmin);

module.exports = router;
