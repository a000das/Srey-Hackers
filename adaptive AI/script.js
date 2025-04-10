let innerUploadImage = document.querySelector(".inner-upload-image");
let input = innerUploadImage.querySelector("input");
let image = document.querySelector("#image");
let loading = document.querySelector("#loading");
let btn = document.querySelector("button");
let text = document.querySelector("#text");
let output = document.querySelector(".output");
let modeSelect = document.querySelector("#mode-select");
let copyBtn = document.querySelector("#copy-btn");
let downloadBtn = document.querySelector("#download-btn");

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCFWnuwgbr92kapL2GsoJrg3P_we-XhVmE";

let fileDetails = {
    mime_type: null,
    data: null,
};

async function generateResponse() {
    if (!fileDetails.mime_type || !fileDetails.data) {
        console.error("No file uploaded.");
        alert("Please upload an image before generating a response.");
        return;
    }

    let selectedMode = modeSelect.value;
    let prompt = "";

    if (selectedMode === "quiz") {
        prompt = "Read the syllabus from the uploaded image and generate a list of quiz questions based on the topics covered. Keep the questions clear and concise. Format as a bullet list.";
    } else if (selectedMode === "solution") {
        prompt = "Solve the mathematical problem with proper steps of solution.";
    }

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{
                parts: [
                    { text: prompt },
                    {
                        inline_data: {
                            mime_type: fileDetails.mime_type,
                            data: fileDetails.data
                        }
                    }
                ]
            }]
        })
    };

    try {
        loading.style.display = "block";
        let response = await fetch(API_URL, requestOptions);
        let data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            let apiResponse = data.candidates[0].content.parts[0].text
                .replace(/\\(.?)\\*/g, "$1")
                .trim()
                .replace(/\n/g, "<br>");

            text.innerHTML = apiResponse;
            output.style.display = "block";
        } else {
            console.error("No valid response from API.");
            text.innerHTML = "No valid response from the AI.";
            output.style.display = "block";
        }
    } catch (e) {
        console.error("Error fetching response:", e);
        text.innerHTML = "An error occurred while fetching the response.";
        output.style.display = "block";
    } finally {
        loading.style.display = "none";
    }
}

input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = (e) => {
        let base64data = e.target.result.split(",")[1];
        fileDetails.mime_type = file.type;
        fileDetails.data = base64data;

        innerUploadImage.querySelector("span").style.display = "none";
        innerUploadImage.querySelector("#icon").style.display = "none";
        image.style.display = "block";
        image.src = `data:${fileDetails.mime_type};base64,${fileDetails.data}`;
        output.style.display = "none";
    };
    reader.readAsDataURL(file);
});

btn.addEventListener("click", () => {
    generateResponse();
});

innerUploadImage.addEventListener("click", () => {
    input.click();
});

copyBtn.addEventListener("click", () => {
    const plainText = text.innerText;
    navigator.clipboard.writeText(plainText).then(() => {
        alert("Copied to clipboard!");
    });
});

downloadBtn.addEventListener("click", () => {
    const plainText = text.innerText;
    const blob = new Blob([plainText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "output.txt";
    link.click();
});
