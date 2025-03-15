import Route from "express"
const router = Route()

import {verifyJWT} from "../middleware/auth.middleware.js"
import {authorizeRoles} from "../middleware/roleBaseAccess.middleware.js"
import {add, get_products, get_one_products, update_product, deleteProduct} from "../controllers/product.controller.js"

router.route("/add").post(verifyJWT, authorizeRoles("admin"), add)
router.route("/get_products").post(verifyJWT, authorizeRoles("admin"), get_products)
router.route("/get_one_products/:id").get(verifyJWT, authorizeRoles("admin"), get_one_products)
router.route("/update_product/:id").put(verifyJWT, authorizeRoles("admin"), update_product)
router.route("/delete_product/:id").delete(verifyJWT, authorizeRoles("admin"), deleteProduct)





export {router}