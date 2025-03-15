import Route from "express"
const router = Route()

import { registration, login, logout } from "../controllers/user.controller.js"
import {verifyJWT} from "../middleware/auth.middleware.js"

router.route("/registration").post(registration)
router.route("/login").post(login)
router.route("/logout").post(verifyJWT, logout)

export {router}