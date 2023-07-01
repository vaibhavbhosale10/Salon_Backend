const router = require("express").Router();
const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  fetchOneAppointment,
  fetchAllAppointment,
} = require("../Controllers/Appointment-Controller");
const Authorize = require("../Helpers/Middlewares/Authorize");

router.post("/", createAppointment);
router.put("/:id", Authorize("admin"), updateAppointment);
router.delete("/:id", Authorize("admin"), deleteAppointment);
router.get("/:id", Authorize("admin"), fetchOneAppointment);
router.get("/", Authorize("admin"), fetchAllAppointment);

module.exports = router;
