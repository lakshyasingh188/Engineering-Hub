// Supabase connection
const SUPABASE_URL = "https://gwsagglshtazacobajpt.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3c2FnZ2xzaHRhemFjb2JhanB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTIyODcsImV4cCI6MjA4OTQ4ODI4N30.-8qgj5Di-nKNAPXNtKcJ_Cb9nlUHqJGfxRtl2gKtBiM";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// Load semesters on page start
loadSemester();

async function loadSemester(){

let { data, error } = await supabaseClient
.from("ece_files")
.select("semester");

if(error){
console.error("Supabase error:", error);
return;
}

if(!data || data.length === 0){
document.getElementById("semesterList").innerHTML = "No semesters found";
return;
}

// unique semesters
let semesters = [...new Set(data.map(i => i.semester))];

let html="";

semesters.forEach(s=>{
html += `<button onclick="loadSubjects(${s})">Semester ${s}</button>`;
});

document.getElementById("semesterList").innerHTML = html;

}


async function loadSubjects(semester){

window.currentSemester = semester;

let { data, error } = await supabaseClient
.from("ece_files")
.select("subject")
.eq("semester",semester);

if(error){
console.error(error);
return;
}

if(!data){
return;
}

// unique subjects
let subjects = [...new Set(data.map(i=>i.subject))];

let html="";

subjects.forEach(sub=>{
html += `<button onclick="loadFiles('${sub}')">${sub}</button>`;
});

document.getElementById("subjectList").innerHTML = html;

}


async function loadFiles(subject){

let { data, error } = await supabaseClient
.from("ece_files")
.select("*")
.eq("semester",window.currentSemester)
.eq("subject",subject);

if(error){
console.error(error);
return;
}

if(!data){
return;
}

let html="";

data.forEach(file=>{
html += `
<div class="note-card">

<h3>${file.title}</h3>

<p>Category: ${file.category}</p>

<a href="${file.file_url}" target="_blank">
Open File
</a>

</div>
`;
});

document.getElementById("fileList").innerHTML = html;

}
