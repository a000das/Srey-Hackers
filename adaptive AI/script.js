let innerUploadImage = document.querySelector(".inner-upload-image");
let input = innerUploadImage.querySelector("input");
let image = document.querySelector("#image");
let loading = document.querySelector("#loading");
let btn = document.querySelector("button");
let text = document.querySelector("#text");
let output = document.querySelector(".output");

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAYlfxQdPbnnxST7L57qEzRyGUo-AyFhws";
let fileDetails={
    mime_type:null,
    data:null,
}

async function generateResponse(){
    if(!fileDetails.mime_type || !fileDetails.data){
        console.error("No file uploaded.");
        return;
    }

    const requestOptions={
       method:"POST",
       headers:{ "Content-Type":"application/json"},
       body:JSON.stringify({
          "contents":[{
            "parts":[
                {"text":"Solve the mathematical problem with proper steps of solution"},
                {
                    "inline_data":{"mime_type":
                        fileDetails.mime_type,
                        "data":fileDetails.data
                    }
                }
            ]
          }]
       })
       }
    }
