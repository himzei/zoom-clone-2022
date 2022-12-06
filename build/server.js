"use strict";

var _http = _interopRequireDefault(require("http"));
var _express = _interopRequireDefault(require("express"));
var _consolidate = _interopRequireDefault(require("consolidate"));
var _socket = _interopRequireDefault(require("socket.io"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.engine("html", _consolidate["default"].swig);
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "html");
app.use(_express["default"]["static"](__dirname + "/public"));
app.get("/", function (_, res) {
  return res.render("home");
});
app.get("/*", function (_, res) {
  return res.redirect("/");
});
var httpServer = _http["default"].createServer(app);
var wsServer = (0, _socket["default"])(httpServer);
wsServer.on("connection", function (socket) {
  socket.on("enter_room", function (msg, done) {
    console.log(msg);
    setTimeout(function () {
      done();
    }, 10000);
  });
});
var handleListen = function handleListen() {
  return console.log("Listening on http://localhost:3000");
};
httpServer.listen(3000, handleListen);