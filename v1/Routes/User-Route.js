const router = require("express").Router();

const {
  createUser,
  updateUser,
  deleteUser,
  fetchOne,
  fetchAll,
} = require("../Controllers/User-Controller");
const Authorize = require("../Helpers/Middlewares/Authorize");

router.post("/", createUser);
router.put("/:id", Authorize("admin"), updateUser);
router.delete("/:id", Authorize("admin"), deleteUser);
router.get("/:id", Authorize("admin"), fetchOne);
router.get("/", Authorize("admin"), fetchAll);

module.exports = router;
