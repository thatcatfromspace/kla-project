const formValidate = () => {
    email = document.getElementById("email-input");
    password = document.getElementById("password-input");
    if (password === "" || email === "") {
        highlightElements();
    }
}

const highlightElements = (email, password) => {
    email.style.borderColor = "red";
    password.style.borderColor = "red";
}