let prompt=document.querySelector("#prompt")
let submitbtn=document.querySelector("#submit")
let chatContainer=document.querySelector(".chat-container")
let imagebtn=document.querySelector("#image")
let image=document.querySelector("#image img")
let imageinput=document.querySelector("#image input")

const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCFWnuwgbr92kapL2GsoJrg3P_we-XhVmE"

let user={
    message:null,
    file:{
        mime_type: null,
        data: null
    }
}
async function generateResponce(aiChatBox) {
    let text=aiChatBox.querySelector(".ai-chat-area")
      let RequestOption={
        method="POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            "contents":[
                {"parts":[{"text":user.message},(user.file.data?[{"inline_data":user.file}]:[])
            ]
        }
            ]
        })

      }
    try{
        let responce= await fetch(Api_Url,RequestOption)
        let data=await responce.json()
        let apiResponce=data.candidates[0].content.parts[0].text.replace(/\*\*(.?)\\*/g,"$1").trim()
        text.innerHTML=apiResponce
    }

    catch(error){
        console.log(error);

    }
    
    finally{
        chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
        image.src= img.svg
     image.classList.remove("choose")
     user.file={}
    }
    

}
function createChatBox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div
}


function handlechatResponce(userMessage){
    user.message=userMessage
    let html=`<img src="user.png" alt="" id="userImage" width="8%">
<div class="user-chat-area">
${user.message}
${user.file.data?<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" /> : ""}
</div>`
prompt.value=""
let userChatBox=createChatBox(html,"user-chat-box")
chatContainer.appendChild(userChatBox)


