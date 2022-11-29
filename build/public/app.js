"use strict";

var messageList = document.querySelector("ul");
var messageForm = document.querySelector("#message");
var nicknameForm = document.querySelector("#nickname");
var socket = new WebSocket("ws://".concat(window.location.host));
function makeMesssage(type, payload) {
  var msg = {
    type: type,
    payload: payload
  };
  return JSON.stringify(msg);
}
function handleOpen() {
  console.log("connected to Server ✅");
}
socket.addEventListener("open", handleOpen);
socket.addEventListener("message", function (message) {
  var li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});
socket.addEventListener("close", function () {
  console.log("Disconnected from Server ❌");
});
var handleSubmit = function handleSubmit(event) {
  event.preventDefault();
  var input = messageForm.querySelector("input");
  socket.send(makeMesssage("new_message", input.value));
  input.value = "";
};
var handleNickSubmit = function handleNickSubmit(event) {
  event.preventDefault();
  var input = nicknameForm.querySelector("input");
  socket.send(makeMesssage("nickname", input.value));
  input.value = "";
};
messageForm.addEventListener("submit", handleSubmit);
nicknameForm.addEventListener("submit", handleNickSubmit);