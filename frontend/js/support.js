//----------------------------GLOBAL VARIABLES-------------------------------------

const url = "http://localhost:3000";
const form = document.getElementById("contactForm");

//---------------------------EVENT LISTENERS / TRIGGERS-------------------------------------

form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMail();
});

//----------------------------FUNCTIONS/APIS-------------------------------------

async function sendMail() {
    const formData ={
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
    }
    try {
        const response = await fetch(`${url}/api/mail/send-email`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), 
        });
        if (!response.ok) {
            throw new Error('Network/Server Error! Status: ${response.status}');
        }
        const data = await response.json();

        console.log("Email sent successfully!!");

    } catch (error) {
        console.error("Error sending mail", error);
    }
}
