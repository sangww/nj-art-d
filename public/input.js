let text = document.querySelector("#chat");

text.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" && text.value.length !== 0) {
    const person_img = await captureFrame();
    text.value = "";
  }
});
