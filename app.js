const http = require('http');
const express = require("express");
const RED = require("node-red");

// Expressアプリケーションの生成
const app = express();
const PORT = process.env.PORT || 3001;

// 静的コンテンツのルートを追加
app.use("/",express.static("public"));

// サーバの生成
const server = http.createServer(app);

// 設定オブジェクトの生成 - 他のオプションについてはデフォルトの 'settings.js' ファイルを参照してください
const settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    userDir:"./.nodered/",
    functionGlobalContext: { }    // グローバルコンテキストを有効化
};

// サーバと設定とランタイムの初期化
RED.init(server,settings);

// エディタUIのルートを '/red' に指定
app.use(settings.httpAdminRoot,RED.httpAdmin);

// HTTP node UIのルートを '/api' に指定
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(PORT);

// ランタイム起動
RED.start();

console.log(`starging... ${PORT}`)