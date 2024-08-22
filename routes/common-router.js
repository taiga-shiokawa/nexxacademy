const express = require("express");
const router = express.Router();
const CommonController = require("../controllers/common-controller");

router.route("/")
    .get(CommonController.renderTopPage);

router.route("/i")
    .get(CommonController.renderInquiryPage)
    .post(CommonController.inquirySend);

router.route("/a")
    .get(CommonController.renderAfterInquiryPage);

router.route("/single")
    .get(CommonController.singlePaymentPage);

router.route("/one")
    .get(CommonController.oneMonthPaymentPage);

router.route("/three")
    .get(CommonController.threeMonthsPaymentPage);

router.route("/checkout")
    .post(CommonController.paymentCheckout);

module.exports = router;