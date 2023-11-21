window.addEventListener("load", addFunctionality);

function addFunctionality(){
    const cvBtn = document.getElementById("cv-btn");
    cvBtn.addEventListener("click", getCvFromJson);
}