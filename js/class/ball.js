export default class Ball {
  constructor(color, index) {
    this.color = color;
    this.left = index * 50 + "px";
    this.top = index * 50 + "px";
    let randomL = Math.random() * 10;
    let randomT = Math.random() * 10;
    this.incrValueL = 1 + randomL;
    this.incrValueT = 1 - randomT;
    this.index = index;

    //create and initialize balls
    this.createBall();
  }

  createBall() {
    //create ball div & initialize it
    let ballCont = document.querySelector(".ball_container");
    let el = document.createElement("div");
    el.classList.add("ball");
    el.style.backgroundColor = this.color;
    el.style.top = this.top;
    el.style.left = this.left;

    //add ball to ball container
    ballCont.appendChild(el);

    //start bounciong ball
    this.startBouncing(el, this.index, this.incrValueT, this.incrValueT);
  }

  startBouncing(b, index, incrValueT, incrValueL) {
    let balls = document.querySelectorAll(".ball");
    setInterval(() => {
      //check if ball is on boundary & accordingly increase decrease the increement value
      if (parseInt(b.style.left) >= 450) {
        incrValueL = -1 - index;
      } else if (parseInt(b.style.left) <= 0) {
        incrValueL = 1 + index;
      }
      if (parseInt(b.style.top) >= 450) {
        incrValueT = -1 - index;
      } else if (parseInt(b.style.top) <= 0) {
        incrValueT = 1 + index;
      }

      //compare current ball with other balls for collision
      balls.forEach((ball, ind) => {
        //exclude current ball
        if (index !== ind) {
          //check collision  & get its data
          let result = this.checkCollision(b, ball);
          if (result.collided) {
            //if collided thenmove ball in diffrent direction
            if (result.side === "left") {
              if (result.diff < 0 && parseInt(b.style.left) >= 0) {
                incrValueL = -1 - index;
              } else if (parseInt(b.style.left) <= 450) {
                incrValueL = 1 + index;
              }
            } else {
              if (result.diff < 0 && parseInt(b.style.top) >= 0) {
                incrValueT = -1 - index;
              } else if (parseInt(b.style.top) <= 450) {
                incrValueT = 1 + index;
              }
            }
          }
        }
      });

      //update balls top and left values
      b.style.left = (parseInt(b.style.left) || 0) + incrValueL + "px";

      b.style.top = (parseInt(b.style.top) || 0) + incrValueT + "px";
    }, 10);
  }

  checkCollision(b1, b2) {
    let b1_left = parseInt(b1.style.left);
    let b1_top = parseInt(b1.style.top);
    let b2_left = parseInt(b2.style.left);
    let b2_top = parseInt(b2.style.top);

    //check if both balls are maintaining atlease 25 px distance, as radius of our balls is 25px
    if (Math.abs(b1_left - b2_left) <= 25) {
      return {
        collided: true,
        side: "left",
        diff: b1_left - b2_left,
      };
    } else if (Math.abs(b1_top - b2_top) <= 25) {
      return {
        collided: true,
        side: "top",
        diff: b1_top - b2_top,
      };
    }

    return {
      collided: false,
    };
  }
}
