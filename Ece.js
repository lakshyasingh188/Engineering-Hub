// Supabase Connection
const SUPABASE_URL = "https://zbwduubkneapofdeyvro.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpid2R1dWJrbmVhcG9mZGV5dnJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4ODg1NjgsImV4cCI6MjA4OTQ2NDU2OH0.bcfvnzG8ZhuGeJn3zvK5h6sfftXVZmlYwEknojSuPE4";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// Load semesters when page starts
loadSemesters();


async function loadSemesters(){

let { data, error } = await supabaseClient
.from("ecenotes")
.select("semester");

if(error){
console.error("Error loading semesters:", error);
return;
}

if(!data || data.length === 0){
document.getElementById("semesterList").innerHTML = "No semesters found";
return;
}

let semesters = [...new Set(data.map(item => item.semester))];

let html = "";

semesters.forEach(sem => {

html += `<button onclick="loadSubjects(${sem})">Semester ${sem}</button>`;

});

document.getElementById("semesterList").innerHTML = html;

}



async function loadSubjects(semester){

window.currentSemester = semester;

let { data, error } = await supabaseClient
.from("ecenotes")
.select("subject")
.eq("semester", semester);

if(error){
console.error("Error loading subjects:", error);
return;
}

if(!data){
return;
}

let subjects = [...new Set(data.map(item => item.subject))];

let html = "";

subjects.forEach(sub => {

html += `<button onclick="loadNotes('${sub}')">${sub}</button>`;

});

document.getElementById("subjectList").innerHTML = html;

}



async function loadNotes(subject){

let { data, error } = await supabaseClient
.from("ecenotes")
.select("*")
.eq("semester", window.currentSemester)
.eq("subject", subject);

if(error){
console.error("Error loading notes:", error);
return;
}

if(!data){
return;
}

let html = "";

data.forEach(note => {

html += `
<div class="note">

<h3>${note.title}</h3>

<a href="${note.file_url}" target="_blank">Open Notes</a>

</div>
`;

});

document.getElementById("notesList").innerHTML = html;

}