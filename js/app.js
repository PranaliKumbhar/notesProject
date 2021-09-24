console.log('Welcome to notes app');
showNotes();
// if user add a notes,add it to the localStorage.
let addBtn = document.getElementById('addBtn');
let addTxt = document.getElementById('addTxt');
let addTitle = document.getElementById('addTitle');
addBtn.addEventListener("click", function (e) {
    if(addTitle.value == "" || addTxt.value == ""){
        return alert("Please add note title and text");
    }
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);

    }
    let myObj ={
        title :addTitle.value,
        text :addTxt.value
    }
     notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";
    showNotes();
    // console.log(notesObj);
});
//function to show notes in html.
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-3" style="width:20rem">
                <div class="card">
                    <div class="card-body">
                        <h3 class="noteCounter">Note${index + 1}</h3>
                        <h5 class="card-title noteTitle">${element.title}</h5>
                        <p class="cardText" id="noteTxt">${element.text}</p>
                        <button id="${index}" onclick="deleteNote(this.id)"class="btn btn-primary">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
    let noteElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        noteElem.innerHTML = html;
    }
    else {
        noteElem.innerHTML = `Sorry! No Notes Available`;
    }

}
//function to delete a note.
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    let confirmMsg = confirm("are you sure you want to delete?");
    if (confirmMsg) {
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        showNotes();
    }
}

let search = document.getElementById('searchTxt');
 search.addEventListener("input", function(){
     let inputVal = search.value.toLowerCase();
    console.log("input event fired!!", inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})


// // function to editing a note.
// function editNote(element,index){
//     let notes = localStorage.getItem('notes');
//     if (notes == null) {
//         notesObj = [];
//     }
//     else {
//         notesObj = JSON.parse(notes);
//     }
//     console.log(notesObj);
//     notesObj.findIndex((element,index) =>
//     addTitle.value = element.title,
//     addTxt.value = element.text
//     );
//     notesObj.splice(index, 1);
//         localStorage.setItem('notes', JSON.stringify(notesObj));
//         showNotes();
// }

