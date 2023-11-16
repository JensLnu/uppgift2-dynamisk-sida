window.addEventListener("load", addFunctionality);

function addFunctionality(){
    console.log("start addFunctionality");
    const cvBtn = document.getElementById("cv-btn");
    cvBtn.addEventListener("click", getCvFromJson);
}