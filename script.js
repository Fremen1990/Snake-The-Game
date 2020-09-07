const body = document.querySelector("body");

// upon lock to landscape-primary mode
function fullScreen() {
  if (document.documentElement.requestFullscreen)
    document.querySelector("#container").requestFullscreen();
  else if (document.documentElement.webkitRequestFullScreen)
    document.querySelector("#container").webkitRequestFullScreen();

  screen.orientation.lock("landscape-primary");

  // when screen orientation changes
  screen.orientation
    .addEventListener("change", function () {
      _STATUS.innerHTML = screen.orientation.type + " mode";
    })
    .catch(function (error) {
      alert(error);
    });
}

window.addEventListener("load", fullScreen());
