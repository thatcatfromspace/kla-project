const formValidate = () => {
    email = document.getElementById("email-input");
    password = document.getElementById("password-input");
}

const highlightElements = (email, password) => {
    email.style.borderColor = "red";
    password.style.borderColor = "red";
}