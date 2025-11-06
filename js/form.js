const form = () => {
  const contactForm = document.querySelector(".contactForm"),
    responseMessage = document.querySelector(".response");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    responseMessage.classList.add("open");
    responseMessage.textContent = "Please wait...";

    async function getData() {
      try {
        const response = await fetch("mail.php", {
          method: "POST",
          body: formData,
        });

        const result = await response.text();

        if (!response.ok) {
          responseMessage.textContent = "Error: " + (result || "Failed to send message");
        } else {
          responseMessage.textContent = result;
        }
      } catch (error) {
        console.error(error.message);
        responseMessage.textContent = "Error: Unable to send message";
      }
    }

    getData()
      .then(
        setTimeout(() => {
          responseMessage.classList.remove("open");
        }, 3000)
      )
      .finally(form.reset());
  });
};
export default form;
