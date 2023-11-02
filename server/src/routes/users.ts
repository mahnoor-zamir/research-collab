import express from "express";
import {
	createUser,
	getUser,
	getAllUsers,
	signIn,
	signOut,
	addFavouriteProject,
	removeFavouriteProject,
	updateUserData,
	addbookmarks,
	getSingleUser,
} from "../controllers/cUser";
import { protect } from "../middleware/jwtAuth";

const router = express.Router();

router.post("/signup", createUser);
// router.post("/", loginUser);
router.get("/", protect, getUser);
router.get("/all", protect, getAllUsers);
router.get("/user/:userId", protect, getSingleUser);
router.patch("/", protect, updateUserData);
router.post("/signin", signIn);
router.post("/logout", signOut);
router.post("/favourites/tabs", protect, addbookmarks);
router.post("/favourites", protect, addFavouriteProject);
router.delete("/favourites", protect, removeFavouriteProject);
export default router;
