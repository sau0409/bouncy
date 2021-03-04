import Ball from "./class/ball.js";

document.addEventListener("DOMContentLoaded", () => {

  initializeEvents();
});

function initializeEvents() {
  let go = document.querySelector(".btn");

  //create balls once input is re4ceived
  go.addEventListener("click", () => {
    createBalls();
  });
}

function createBalls() {
    //baals color
  let colorArr = [
    "red",
    "blue",
    "cyan",
    "green",
    "teal",
    "orange",
    "purple",
    "pink",
    "yellow",
    "gray",
  ];
  let balls_container = document.querySelector(".ball_container");
  balls_container.innerHTML = null;
  //creating balls on the bais of input
  let ballsCount = document.querySelector(".count").value;
  for (let i = 0; i < ballsCount; i++) {
    new Ball(colorArr[i], i);
  }
}