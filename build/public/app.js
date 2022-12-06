"use strict";

var socket = io();
var welcome = document.getElementById("welcome");
var form = welcome.querySelector("form");
function handleRoomSubmit(event) {
  event.preventDefault();
  var input = form.querySelector("input");
  socket.emit("enter_room", {
    payload: input.value
  }, function () {
    console.log("server is done!");
  });
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);