const router = require("express").Router();

const {
  createContact,
  updateContact,
  deleteContact,
  fetchOneContact,
  fetchAllContacts,
} = require("../Controllers/Contact-Controller");
const Authorize = require("../Helpers/Middlewares/Authorize");

router.post("/", createContact);
router.put("/:id", Authorize("admin"), updateContact);
router.delete("/:id", Authorize("admin"), deleteContact);
router.get("/:id", Authorize("admin"), fetchOneContact);
router.get("/", Authorize("admin"), fetchAllContacts);

module.exports = router;
