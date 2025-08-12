function handleResize() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    document.body.style.zoom = "85%";
  } else {
    document.body.style.zoom = "100%";
  }
}

window.addEventListener("load", handleResize);
window.addEventListener("resize", handleResize);
