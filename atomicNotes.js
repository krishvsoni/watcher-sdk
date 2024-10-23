const { AR, AO, Profile, Notebook, Note } = require("aonote");
const fs = require('fs');
const wallet = JSON.parse(fs.readFileSync('wallet.json', 'utf8'));

async function createNote() {
    const note = await new Note({
        pid:"9_oUCfGh5vwrn2hex5XbJ78J5euvRXrpONIvEM4c3w4", note_src: "Helloworld"
    }).init(wallet)
    console.log(note);
}
async function getNote(){
    const {out}=await Note.get()
    console.log(out)
}
// createNote();
getNote();