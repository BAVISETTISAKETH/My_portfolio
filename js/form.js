const form = () => {
  const contactForm = document.querySelector(".contactForm");
  const responseMessage = document.querySelector(".response");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');

  // Form validation
  function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorMessage = "";

    if (field.id === "name") {
      if (field.value.trim().length < 2) {
        isValid = false;
        errorMessage = "Name must be at least 2 characters long";
      }
    } else if (field.id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
    } else if (field.id === "message") {
      if (field.value.trim().length < 10) {
        isValid = false;
        errorMessage = "Message must be at least 10 characters long";
      }
    }

    if (errorElement) {
      errorElement.textContent = errorMessage;
    }

    if (isValid) {
      field.classList.remove("error");
      field.classList.add("success");
    } else {
      field.classList.remove("success");
      field.classList.add("error");
    }

    return isValid;
  }

  // Add real-time validation
  if (nameInput) {
    nameInput.addEventListener("blur", () => validateField(nameInput));
    nameInput.addEventListener("input", () => {
      if (nameInput.classList.contains("error")) {
        validateField(nameInput);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener("blur", () => validateField(emailInput));
    emailInput.addEventListener("input", () => {
      if (emailInput.classList.contains("error")) {
        validateField(emailInput);
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener("blur", () => validateField(messageInput));
    messageInput.addEventListener("input", () => {
      if (messageInput.classList.contains("error")) {
        validateField(messageInput);
      }
    });
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isMessageValid = validateField(messageInput);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      responseMessage.classList.add("open");
      responseMessage.textContent = "Please fix the errors above";
      responseMessage.style.backgroundColor = "#d32f2f";
      setTimeout(() => {
        responseMessage.classList.remove("open");
      }, 3000);
      return;
    }

    const formData = new FormData(contactForm);

    // Check honeypot field (spam prevention)
    if (formData.get("honeypot")) {
      console.log("Spam detected");
      return;
    }

    // Show loading state
    btnText.classList.add("hidden");
    btnLoader.classList.remove("hidden");
    btnLoader.classList.add("active");
    submitBtn.disabled = true;

    responseMessage.classList.add("open");
    responseMessage.textContent = "Sending message...";
    responseMessage.style.backgroundColor = "#1976d2";

    async function getData() {
      try {
        const response = await fetch("mail.php", {
          method: "POST",
          body: formData,
        });

        const result = await response.text();

        // Reset button state
        btnText.classList.remove("hidden");
        btnLoader.classList.add("hidden");
        btnLoader.classList.remove("active");
        submitBtn.disabled = false;

        if (!response.ok) {
          responseMessage.textContent = "Error: " + (result || "Failed to send message");
          responseMessage.style.backgroundColor = "#d32f2f";
        } else {
          responseMessage.textContent = result || "Message sent successfully!";
          responseMessage.style.backgroundColor = "#388e3c";
          contactForm.reset();
          // Remove validation classes
          [nameInput, emailInput, messageInput].forEach(field => {
            if (field) {
              field.classList.remove("success", "error");
            }
          });
        }
      } catch (error) {
        console.error(error.message);
        btnText.classList.remove("hidden");
        btnLoader.classList.add("hidden");
        btnLoader.classList.remove("active");
        submitBtn.disabled = false;
        responseMessage.textContent = "Error: Unable to send message. Please try again.";
        responseMessage.style.backgroundColor = "#d32f2f";
      }
    }

    await getData();
    setTimeout(() => {
      responseMessage.classList.remove("open");
    }, 5000);
  });
};
export default form;
