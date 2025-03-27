// ==========================
// 1️⃣ Dark Mode Toggle 
// ==========================
const darkModeButton = document.getElementById('darkModeToggle');

darkModeButton.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');

    // Save user preference
    let mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);
});

// Load user preference on page load
window.onload = function() {
    let savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
};

// ==========================
// 2️⃣ Flight Booking API Integration
// ==========================
const flightForm = document.getElementById("flightForm");

flightForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    let departure = document.getElementById("departure").value;
    let destination = document.getElementById("destination").value;
    let date = document.getElementById("date").value;
    let flightResults = document.getElementById("flightResults");

    if (!departure || !destination || !date) {
        alert("Please fill all fields!");
        return;
    }

    let apiKey = "YOUR_API_KEY"; // Replace with your API key
    let apiUrl = https://api.skyscanner.net/apiservices/browseroutes/v1.0/US/USD/en-US/${departure}/${destination}/${date}?apiKey=${apiKey};

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        if (data.Quotes.length === 0) {
            flightResults.innerHTML = "<p>No flights found.</p>";
        } else {
            let flight = data.Quotes[0];
            flightResults.innerHTML = <p>Flight available! Price: $${flight.MinPrice}</p>;
        }
    } catch (error) {
        console.error("Error fetching flights:", error);
        flightResults.innerHTML = "<p>Failed to fetch flight data.</p>";
    }
});

// ==========================
// 3️⃣ AI Chatbot Feature
// ==========================
const aiInput = document.getElementById("aiInput");
const aiButton = document.getElementById("aiButton");
const aiResponse = document.getElementById("aiResponse");

aiButton.addEventListener("click", async function () {
    let userInput = aiInput.value;
    if (!userInput) {
        alert("Please enter a question.");
        return;
    }

    let aiApiUrl = "https://api.openai.com/v1/completions"; // Example API
    let apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API Key

    let requestBody = {
        model: "text-davinci-003",
        prompt: userInput,
        max_tokens: 50
    };

    try {
        let response = await fetch(aiApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Bearer ${apiKey}
            },
            body: JSON.stringify(requestBody)
        });

        let data = await response.json();
        aiResponse.innerText = data.choices[0].text.trim();
    } catch (error) {
        console.error("Error fetching AI response:", error);
        aiResponse.innerText = "Sorry, I couldn't process that.";
    }
});