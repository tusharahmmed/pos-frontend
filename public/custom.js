let rightArrowContainer = document.querySelector("#right-arrow");
let rightArrow = document.querySelector("#right-arrow svg");
let list = document.getElementById("list");

if (list.scrollWidth !== list.clientWidth && list.scrollLeft == 0) {
  rightArrowContainer.classList.add("visible");
}

const manageIcon = () => {
  let maxScrollValue = list.scrollWidth - list.clientWidth - 20;

  if (list.scrollLeft >= maxScrollValue) {
    rightArrowContainer.classList.remove("visible");
  } else {
    rightArrowContainer.classList.add("visible");
  }
};

rightArrow.addEventListener("click", () => {
  manageIcon();
  list.scrollLeft += 200;
});

list.addEventListener("scroll", () => {
  manageIcon();
});

let draging = false;
const drag = (e) => {
  if (!draging) {
    return;
  }

  list.classList.add("dragaing");

  list.scrollLeft -= e.movementX;
};

list.addEventListener("mousedown", () => {
  draging = true;
});

list.addEventListener("mousemove", drag);

document.addEventListener("mouseup", () => {
  draging = false;
  list.classList.remove("dragaing");
});
