const { Resend } = require("resend");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();
const inquiryValidate = require("../utils/inquiry-validation");

const Inquiry = require("../models/InquiryInfo");

// Resend環境変数
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports.renderTopPage = (req, res) => {
  res.render("index");
};

module.exports.renderInquiryPage = (req, res) => {
  res.render("inquiry", { inputData: "", errors: "" });
};

module.exports.renderAfterInquiryPage = (req, res) => {
  res.render("after_inquiry_page");
};

module.exports.inquirySend = async (req, res) => {
  const { name, email, phone, message, occupation } = req.body;

  const errors = inquiryValidate(req.body);
  if (errors) {
    return res.render("inquiry", {
      inputData: { name, email, phone, message },
      errors: errors,
    });
  }

  try {
    // 1. データをMongoDBに保存
    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      message,
      occupation
    });
    await newInquiry.save();

    // 2. メール送信
    const emailResult = await resend.emails.send({
      from: 'onboarding@nexx-academy.com',
      to: 'taiga.hr12@gmail.com', // お問い合わせ受信用のメールアドレス
      subject: '新しいお問い合わせが届きました',
      html: `
        <h1>新しいお問い合わせ</h1>
        <p><strong>名前:</strong> ${name}</p>
        <p><strong>メール:</strong> ${email}</p>
        <p><strong>電話番号:</strong> ${phone}</p>
        <p><strong>職業:</strong> ${occupation}</p>
        <p><strong>メッセージ:</strong> ${message}</p>
      `
    });
    console.log("お問い合わせ成功: ", emailResult);

    // ユーザーへ確認メール送信
    const userMailData = await resend.emails.send({
      from: "onboarding@nexx-academy.com",
      to: email,
      subject: "NexX Academy ご確認メール",
      html: `
      <h3>NexX Academyの無料相談にお申し込みいただき、誠にありがとうございます。<br>
      ご入力いただいた情報を確認の上、24時間以内に担当者よりご連絡させていただきます。</h3>

      <p>【注意】無料相談は、まだ確定しておりません。</p>
    `,
    });
    console.log("ユーザーへの確認メール送信成功 : ", userMailData);

    res.redirect("/after-inquiry/a");

  } catch (err) {
    console.log(`お問い合わせの受付中に予期せぬエラーが発生しました: ${err}`);
    res.redirect("/inquiry/i");
  }
};

module.exports.singlePaymentPage = (req, res) => {
  res.render("single_payment", { PRICE_LOOKUP_KEY: process.env.PRICE_ID_TEST });
};

module.exports.oneMonthPaymentPage = (req, res) => {
  res.render("one_month_payment", { PRICE_LOOKUP_KEY: process.env.PRICE_ID_TEST });
};

module.exports.threeMonthsPaymentPage = (req, res) => {
  res.render("three_months_payment", { PRICE_LOOKUP_KEY: process.env.PRICE_ID_TEST });
};

module.exports.paymentCheckout = async (req, res) => {
  try {
    const prices = await stripe.prices.list();
    // console.log(prices);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `http://localhost:8000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:8000/cancel",
    });

    res.redirect(303, session.url);
  } catch (err) {
    console.log(err);
  }
};