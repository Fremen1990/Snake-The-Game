const body = document.querySelector("#container");

const landscapeBtn = document.querySelector(".landscape");

// upon lock to landscape-primary mode
// const fullScreen = () => {
// when screen orientation changes
//   screen.orientation
//     .addEventListener("change", function () {
//       _STATUS.innerHTML = screen.orientation.type + " mode";
//     })
//     .catch(function (error) {
//       alert(error);
//     });
// };

// window.addEventListener("load", fullScreen());
landscapeBtn.addEventListener("click", () => {
  console.log("srgws");

  document.documentElement.requestFullscreen;
  body.requestFullscreen();
  if (document.documentElement.requestFullscreen) {
    body.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    body.webkitRequestFullScreen();
  }
  landscapeBtn.style.display = "none";
});
