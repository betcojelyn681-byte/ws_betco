

const registrationForm = document.getElementById("student-registration-form");
const registrationSuccess = document.getElementById("registration-success");
const resetRegistrationButton = document.getElementById("reset-registration-form");

const accountPasswordInput = document.getElementById("account-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const togglePasswordButton = document.getElementById("toggle-password-visibility");

function showError(input, message) {
    const errorId = input.getAttribute("aria-describedby");
    const errorElement = errorId ? document.getElementById(errorId) : null;

    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");

    if (errorElement) {
        errorElement.textContent = message || input.dataset.error || "This field is invalid.";
    }
}

function clearError(input) {
    const errorId = input.getAttribute("aria-describedby");
    const errorElement = errorId ? document.getElementById(errorId) : null;

    input.classList.remove("is-invalid");
    input.setAttribute("aria-invalid", "false");

    if (errorElement) {
        errorElement.textContent = "";
    }
}

function getTrimmedValue(input) {
    if (input.dataset.trim === "true") {
        input.value = input.value.trim();
    }
    return input.value;
}

function validateStudentID() {
    const input = document.getElementById("student-id");
    const value = getTrimmedValue(input);

    if (!value) {
        showError(input, "Student ID is required.");
        return false;
    }

    if (!/^[A-Za-z0-9-]{4,20}$/.test(value)) {
        showError(input, "Student ID must be 4-20 characters and contain only letters, numbers, or hyphens.");
        return false;
    }

    clearError(input);
    return true;
}

function validateFullName() {
    const input = document.getElementById("full-name");
    const value = getTrimmedValue(input);

    if (!value) {
        showError(input, "Full name is required.");
        return false;
    }

    if (!/^[A-Za-zÀ-ÿ\s.'-]{2,100}$/.test(value)) {
        showError(input, "Enter a valid full name.");
        return false;
    }

    clearError(input);
    return true;
}

function validateEmail() {
    const input = document.getElementById("email-address");
    const value = getTrimmedValue(input);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!value) {
        showError(input, "Email address is required.");
        return false;
    }

    if (!emailPattern.test(value)) {
        showError(input, "Enter a valid email address, such as student@example.com.");
        return false;
    }

    clearError(input);
    return true;
}

function validatePhone() {
    const input = document.getElementById("phone-number");
    const value = getTrimmedValue(input);

    // Accepted format: 09XXXXXXXXX or +639XXXXXXXXX
    const phonePattern = /^(09\d{9}|\+639\d{9})$/;

    if (!value) {
        showError(input, "Phone number is required.");
        return false;
    }

    if (!phonePattern.test(value)) {
        showError(input, "Enter a valid Philippine mobile number (09XXXXXXXXX or +639XXXXXXXXX).");
        return false;
    }

    clearError(input);
    return true;
}

function validateDateOfBirth() {
    const input = document.getElementById("date-of-birth");
    const value = input.value;

    if (!value) {
        showError(input, "Date of birth is required.");
        return false;
    }

    const birthDate = new Date(value);
    const today = new Date();

    if (Number.isNaN(birthDate.getTime()) || birthDate > today) {
        showError(input, "Enter a valid date of birth that is not in the future.");
        return false;
    }

    clearError(input);
    return true;
}

function validateGender() {
    // The radio group lives inside the container with id="gender-options".
    const genderGroup = document.getElementById("gender-options");
    const selectedGender = registrationForm.querySelector('input[name="gender"]:checked');

    if (!selectedGender) {
        showError(genderGroup, "Please select your gender.");
        return false;
    }

    clearError(genderGroup);
    return true;
}

function validateProgram() {
    const input = document.getElementById("study-program");

    if (!input.value) {
        showError(input, "Please select your program.");
        return false;
    }

    clearError(input);
    return true;
}

function validateYearLevel() {
    const input = document.getElementById("year-level");

    if (!input.value) {
        showError(input, "Please select your year level.");
        return false;
    }

    clearError(input);
    return true;
}

function validatePassword() {
    const input = accountPasswordInput;
    const value = input.value;

    if (!value) {
        showError(input, "Password is required.");
        return false;
    }

    if (value.length < 8) {
        showError(input, "Password must contain at least 8 characters.");
        return false;
    }

    clearError(input);
    return true;
}

function validateConfirmPassword() {
    const input = confirmPasswordInput;

    if (!input.value) {
        showError(input, "Please confirm your password.");
        return false;
    }

    if (input.value !== accountPasswordInput.value) {
        showError(input, "Passwords do not match.");
        return false;
    }

    clearError(input);
    return true;
}

function validateAddress() {
    const input = document.getElementById("home-address");
    const value = getTrimmedValue(input);

    if (!value) {
        showError(input, "Address is required.");
        return false;
    }

    if (value.length < 5) {
        showError(input, "Address must contain at least 5 characters.");
        return false;
    }

    clearError(input);
    return true;
}

function validateAgreement() {
    const input = document.getElementById("registration-agreement");

    if (!input.checked) {
        showError(input, "You must agree to the terms and conditions.");
        return false;
    }

    clearError(input);
    return true;
}

const studentIdInput = document.getElementById("student-id");

if (studentIdInput) {
    const fieldLabel = studentIdInput.dataset.label;
    const fieldHint = studentIdInput.dataset.hint;

    if (fieldLabel) {
        studentIdInput.setAttribute("aria-label", fieldLabel);
    }

    if (fieldHint) {
        studentIdInput.title = fieldHint;
    }
}

const dateInput = document.getElementById("date-of-birth");

if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.setAttribute("max", `${year}-${month}-${day}`);
}

if (togglePasswordButton && accountPasswordInput && confirmPasswordInput) {
    togglePasswordButton.addEventListener("click", function () {
        const targetInput = document.getElementById(this.dataset.target);
        const isPasswordHidden = targetInput.type === "password";

        targetInput.type = isPasswordHidden ? "text" : "password";
        confirmPasswordInput.type = isPasswordHidden ? "text" : "password";

        this.classList.toggle("is-visible", isPasswordHidden);
        this.textContent = isPasswordHidden ? "Hide" : "Show";
        this.setAttribute("aria-pressed", String(isPasswordHidden));
    });
}

// Handle form submission with the submit event and the event object.
registrationForm.addEventListener("submit", function (event) {
    // Stop the browser from submitting the form while validation runs.
    event.preventDefault();

    registrationSuccess.textContent = "";
    registrationSuccess.classList.remove("is-visible");

    const isValid = [
        validateStudentID(),
        validateFullName(),
        validateEmail(),
        validatePhone(),
        validateDateOfBirth(),
        validateGender(),
        validateProgram(),
        validateYearLevel(),
        validatePassword(),
        validateConfirmPassword(),
        validateAddress(),
        validateAgreement()
    ].every(Boolean);

    if (isValid) {
        registrationSuccess.textContent = "Registration successful! Your information has been validated.";
        registrationSuccess.classList.add("is-visible");

        // Clear any remaining validation errors.
        registrationForm.querySelectorAll(".is-invalid").forEach(function (element) {
            element.classList.remove("is-invalid");
        });

        form.querySelectorAll('[aria-invalid="true"]').forEach(function (element) {
            element.setAttribute("aria-invalid", "false");
        });

        registrationForm.querySelectorAll(".field-error").forEach(function (element) {
            element.textContent = "";
        });

        registrationSuccess.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
});

// Validate a field live as the user corrects it.
const fieldValidators = {
    "student-id": validateStudentID,
    "full-name": validateFullName,
    "email-address": validateEmail,
    "phone-number": validatePhone,
    "date-of-birth": validateDateOfBirth,
    "gender-options": validateGender,
    "study-program": validateProgram,
    "year-level": validateYearLevel,
    "account-password": validatePassword,
    "confirm-password": validateConfirmPassword,
    "home-address": validateAddress,
    "registration-agreement": validateAgreement
};

Object.keys(fieldValidators).forEach(function (fieldId) {
    const input = document.getElementById(fieldId);

    if (!input) return;

    const isRadioGroup = input.classList.contains("registration-radio-group");
    const eventType =
        input.tagName === "SELECT" ||
        input.type === "checkbox" ||
        input.type === "date" ||
        isRadioGroup
            ? "change"
            : "input";

    input.addEventListener(eventType, function () {
        fieldValidators[fieldId]();

        // Recheck password confirmation when the original password changes.
        if (fieldId === "account-password" && confirmPasswordInput.value) {
            validateConfirmPassword();
        }

        // Remove the success message if the form is edited.
        registrationSuccess.textContent = "";
        registrationSuccess.classList.remove("is-visible");
    });
});

// Reset the form: clear values, errors, styling, and the success message.
if (resetRegistrationButton) {
    resetRegistrationButton.addEventListener("click", function () {
        registrationForm.reset();

        registrationForm.querySelectorAll(".is-invalid").forEach(function (element) {
            element.classList.remove("is-invalid");
        });

        registrationForm.querySelectorAll(".field-error").forEach(function (element) {
            element.textContent = "";
        });

        registrationForm.querySelectorAll('[aria-invalid="true"]').forEach(function (element) {
            element.setAttribute("aria-invalid", "false");
        });

        registrationSuccess.textContent = "";
        registrationSuccess.classList.remove("is-visible");

        // Restore the password fields and the toggle button to their original state.
        accountPasswordInput.type = "password";
        confirmPasswordInput.type = "password";

        if (togglePasswordButton) {
            togglePasswordButton.classList.remove("is-visible");
            togglePasswordButton.textContent = "Show";
            togglePasswordButton.setAttribute("aria-pressed", "false");
        }
    });
}
