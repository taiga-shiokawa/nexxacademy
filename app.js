if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// 標準モジュール
const path = require("path");

// サードパーティモジュール
const express = require("express");
const ejsMate = require("ejs-mate");

// ローカルモジュール
const CommonRouter = require("./routes/common-router");
const connectDB = require("./db/connect");

const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB接続
const dbConnectStart = async () => {
  try {
    await connectDB(process.env.MONGO_HEROKU_URL ||process.env.MONGO_URL);
  } catch (err) {
    console.log(`DB接続中に予期せぬエラーが発生しました: ${err}`);
  }
}

// viewエンジン
app.engine("ejs", ejsMate);                       // ejs拡張子を指定.
app.set("view engine", "ejs");                    // このアプリでejsをViewエンジンとして使用することを宣言.
app.set("views", path.join(__dirname, "views"));  // Viewsフォルダ配下のejsファイルの絶対パスの生成.

// publicフォルダを使用するためのミドルウェア
app.use(express.static(path.join(__dirname, "public")));

// body-parser ミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",CommonRouter);
app.use("/inquiry", CommonRouter);
app.use("/after-inquiry", CommonRouter);
app.use("/payment", CommonRouter);

app.get("/success", (req, res) => {
  res.render("payment_success");
});

app.get("/cancel", (req, res) => {
  res.render("payment_cancel");
});

app.get("/legal/specific-commercial-transaction", (req, res) => {
  res.render("specific-commercial-transaction");
;})

async function startServer() {
  await dbConnectStart();
  app.listen(PORT, () => {
    console.log(`サーバーが起動しました: ${PORT}`);
  })
}
startServer();