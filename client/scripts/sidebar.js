const pressableIcon = document.getElementsByClassName("pressableIcon");
const link = ["http://localhost:3000", "http://localhost:3000/Create"];

for (let i = 0; i < pressableIcon.length; i++) {
  pressableIcon[i].addEventListener("click", async () => {
    window.location.href = link[i];
  });
}
