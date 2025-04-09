let prompt=document.querySelector("#prompt")
let submitbtn=document.querySelector("#submit")
let chatContainer=document.querySelector(".chat-container")
let imagebtn=document.querySelector("#image")
let image=document.querySelector("#image img")
let imageinput=document.querySelector("#image input")

const Api_Url=

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


