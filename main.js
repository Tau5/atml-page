const express = require("express")
var app = express();
const bodyParser = require('body-parser');
app.use(express.json());
var msgs = []
function generateChat(user, msg){
    var msgs_str = "";
    var document;
    msgs.forEach((msg) => {
      msgs_str+=`
      text{color:#1890bf}:${msg.user};text:: ${msg.content};nl;
      `
    })
    document = `
    title:ATML Chat;
    page{
      favicon:💬,
      favicon-type:text
    };
    ${msgs_str}
    nl;nl;
    text:User: ;
    input:{
        type:text,
        name:user,
        value: ${user},
        id:user,
        form-id:chat
    };nl;
    text:Message: ;
    input:{
        type:text,
        name:content,
        value: ${msg},
        id:content,
        form-id:chat
    };nl;
    submit:{
        label:Send,
        id:chat,
        relative-url:true,
        target:/chat
    };
    
    `
    return document
}
app.get("/", (req, res) => {
    res.sendFile("./index.atml", {
        root:process.cwd()
    })
})
app.get("/chat", (req, res) => {
    res.send(generateChat("User", "Message"))
    res.end()
})
app.post("/chat", (req,res) => {
    msgs.push({
        user: req.body.user,
        content:req.body.content
    })
    res.send(generateChat(req.body.user, ""))
    res.end()
})
app.listen(3001)