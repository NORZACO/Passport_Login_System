
function displayFieldError(fieldName, errorMessage) {
    var field = document.getElementById(fieldName);
    field.classList.add("is-invalid");
    field.nextElementSibling.innerText = errorMessage;
}

function removeFieldError(fieldName) {
    var field = document.getElementById(fieldName);
    field.classList.remove("is-invalid");
    field.nextElementSibling.innerText = "";
}

function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission

    // Reset previous error messages
    var formFields = ["firstName", "lastName", "username", "email", "password", "roleId"];
    formFields.forEach(field => removeFieldError(field));

    // Get form values
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var roleId = document.getElementById("roleId").value;

    // Create payload object
    var payload = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        roleId: roleId
    };

    console.log('payload' , payload)

    // Create headers
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Create request options
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: 'follow'
    };

    // Send request
    fetch("http://10.0.0.105:3000/signup", requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.status === "fail") {
                // Display error messages on the form
                displayFieldError("roleId", data.data.result);
            } else {
                // Handle success
                console.log(data);
            }
        })
        .catch(error => console.log('error', error));
}
