const input = document.getElementById("fileInput");
const content = document.getElementById("content");
const skeleton = document.getElementById("skeleton");
const errorPopup = document.getElementById("errorPopup");
const closePopup = document.getElementById("closePopup");

input.addEventListener("change", function(event) {

  const file = event.target.files[0];
  if (!file) return;

  const fileName = file.name.toLowerCase().trim();

  if (!fileName.endsWith(".md")) {
    errorPopup.classList.add("show");
    event.target.value = "";
    return;
  }

  const reader = new FileReader();

  skeleton.style.display = "block";
  content.classList.remove("show");
  content.style.display = "none";

  reader.onload = function(e) {
    const parsed = marked.parse(e.target.result);

    setTimeout(() => {
      skeleton.style.display = "none";

      content.innerHTML = parsed; // جایگزینی کامل محتوا
      content.style.display = "block";

      requestAnimationFrame(() => {
        content.classList.add("show");
      });

      // 👇 این خط مهمه
      event.target.value = "";

    }, 2000);
  };

  reader.readAsText(file);
});

closePopup.addEventListener("click", () => {
  errorPopup.classList.remove("show");
});
