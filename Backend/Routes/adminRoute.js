const express = require("express");
const { getAdmin, loginAdmin, getbyemail, logout, getReseller, topReseller, forgotPassword, getAllCustomers, getAllResellers, updateProfileCustomer, updateProfileReseller, resetPassword, registeradmin, deleteCustomer, deleteReseller, topFiveResellers, total, expiryfilter, getCustomer } = require("../controllers/adminController")
const router = express.Router();
const { isAuthenticatedAdmin, authRole } = require("../middleware/auth");
router.route("/admin").get(isAuthenticatedAdmin, getAdmin);
// router.route("/check").post(getbyemail);
router.route("/admin/register").post(registeradmin);
router.route("/admin/updatereseller").put(isAuthenticatedAdmin, updateProfileReseller);
router.route("/admin/updatecustomer").put(isAuthenticatedAdmin, updateProfileCustomer);
router.route("/admin/getreseller").post(getReseller)
router.route("/admin/getcustomer").post(getCustomer)
router.route("/admin/login").post(loginAdmin);
router.route("/admin/logout").get(logout);
router.route("/admin/topreseller").get(isAuthenticatedAdmin, topReseller);
router.route("/admin/topfivereseller").get(topFiveResellers);
router.route("/admin/getallcustomers").get(isAuthenticatedAdmin, getAllCustomers);
router.route("/admin/getallresellers").get(isAuthenticatedAdmin, getAllResellers);
router.route("/password/forgot").post(forgotPassword);
router.route("/admin/total").get(total);
router.route("/password/reset/:token").put(resetPassword);
router.route("/admin/deletereseller/:resellerId").delete(isAuthenticatedAdmin, deleteReseller);
router.route("/admin/deletecustomer/:customerId").delete(isAuthenticatedAdmin, deleteCustomer);
router.route("/admin/expiry").post(expiryfilter);
module.exports = router;
