import express from "express";

// import RoleController from "../controllers/RoleController";
import RegisterController from "../controllers/RegisterController";

import UserValidation from "../middleware/validation/UserValidation";
// import Authorization from "../middleware/Authorization";

const router = express.Router();

// router.get("/role", RoleController.GetRole);
// router.post("/role", RoleController.CreateRole);
// router.post("/role/:id", RoleController.UpdateRole);
// router.delete("/role/:id", RoleController.DeleteRole);
// router.get("/role/:id", RoleController.GetRoleById);


// User Routing
router.post("/user/signup",UserValidation.RegisterValidation, RegisterController.Register);
router.post("/user/login", RegisterController.UserLogin)

export default router;