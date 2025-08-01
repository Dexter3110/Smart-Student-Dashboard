function showError(id, message) {
  const errorElement = document.getElementById(id);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  
  // Add error class to input
  const inputElement = errorElement.previousElementSibling.querySelector('input') || 
                      errorElement.previousElementSibling;
  inputElement.classList.add('is-invalid');
  
  // Add error icon
  if (inputElement.parentElement.classList.contains('input-group')) {
    const errorIcon = document.createElement('span');
    errorIcon.className = 'input-group-text text-danger';
    errorIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
    inputElement.parentElement.appendChild(errorIcon);
  }
}

function clearErrors() {
  document.querySelectorAll('.text-danger').forEach(el => {
    el.textContent = '';
    el.style.display = 'none';
    
    // Remove error class from input
    const inputElement = el.previousElementSibling.querySelector('input') || 
                        el.previousElementSibling;
    if (inputElement) {
      inputElement.classList.remove('is-invalid');
      
      // Remove error icon if exists
      const inputGroup = inputElement.parentElement;
      if (inputGroup.classList.contains('input-group')) {
        const errorIcon = inputGroup.querySelector('.text-danger');
        if (errorIcon) {
          inputGroup.removeChild(errorIcon);
        }
      }
    }
  });
}

function validateForm() {
  clearErrors();
  let valid = true;

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const address = document.getElementById("address").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z]{4,}$/;
  const mobileRegex = /^\+?\d{1,4}[-\s]?\d{10}$/; // Accepts +91 9876543210 or 09876543210

  if (!nameRegex.test(firstName)) {
    showError("firstNameError", "First name must be at least 4 characters and only letters.");
    valid = false;
  }

  if (lastName === "") {
    showError("lastNameError", "Last name is required.");
    valid = false;
  }

  if (!emailRegex.test(email)) {
    showError("emailError", "Invalid email format. Example: john.doe@example.com");
    valid = false;
  }

  if (password.length < 8) {
    showError("passwordError", "Password must be at least 8 characters long.");
    valid = false;
  } else if (!/[A-Z]/.test(password)) {
    showError("passwordError", "Password must contain at least one uppercase letter.");
    valid = false;
  } else if (!/[0-9]/.test(password)) {
    showError("passwordError", "Password must contain at least one number.");
    valid = false;
  }

  if (!mobileRegex.test(mobile)) {
    showError("mobileError", "Please enter a valid mobile number with country code. E.g., +1 234 567 8900");
    valid = false;
  }

  if (address === "") {
    showError("addressError", "Address is required.");
    valid = false;
  }

  // Check terms checkbox
  const termsCheck = document.getElementById("termsCheck");
  if (!termsCheck.checked) {
    const termsError = document.createElement('div');
    termsError.className = 'text-danger small mt-2';
    termsError.textContent = 'You must agree to the terms and conditions.';
    termsCheck.parentElement.appendChild(termsError);
    valid = false;
  }

  if (valid) {
    // Show success message (in a real app, this would submit the form)
    const form = document.getElementById("registrationForm");
    form.innerHTML = `
      <div class="text-center py-4">
        <div class="mb-3">
          <i class="fas fa-check-circle text-success" style="font-size: 3rem;"></i>
        </div>
        <h3 class="text-success mb-3">Registration Successful!</h3>
        <p>Thank you for joining Smart Dashboard. We've sent a confirmation email to ${email}.</p>
        <a href="login.html" class="btn btn-primary mt-3">Continue to Login</a>
      </div>
    `;
  }

  return valid;
}