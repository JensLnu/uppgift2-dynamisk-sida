const cvModalContentDiv = document.getElementById("created-modal-content");

async function getCvFromJson() {
    console.log('start getCvFromJson');
    const respone = await fetch('../json/cv.json');
    if (respone.ok) {
        const jsonObj = await respone.json(respone);
        renderJsonObj(jsonObj);
    } else {
        cvModalContentDiv.textContent = 'Error status koden är: ' + respone.status;
        console.log('Error status koden är: ' + respone.status);
    }
}

function renderJsonObj(jsonObj) {
    // cvModalContentDiv.innerHTML = ''; // gör så att det inte blir dubletter av inläsningen

    // läser in kontaktinformation
    createNewElement('h3', 'Contact Info');
    const contactInfoUl = createNewElement('ul', null);
    createNewElementAppendTo('li', jsonObj.contactInfo.name, contactInfoUl);
    createNewElementAppendTo('li', jsonObj.contactInfo.email, contactInfoUl);
    createNewElementAppendTo('li', jsonObj.contactInfo.teleNr, contactInfoUl);

    createNewElement('h3', 'Education');

    // läser in data om chas utbildningen
    createNewElement('h4', 'Chas Academy');
    const chas = jsonObj.education.chas;
    createNewElement('p', chas.title);
    const chasCoursesUl = createNewElement('ul', null);
    chas.courses.forEach(content => {
        createNewElementAppendTo('li', content, chasCoursesUl);
    });
    createNewElement('p', chas.dates);

    // läser in data om frikurser utbildning
    createNewElement('h4', 'Free courses');
    const freeCourses = jsonObj.education.courses;
    freeCourses.forEach(course => {
        createNewElement('h4', `${course.title} (${course.points})`);
        const CoursesUl = createNewElement('ul', null);
        course.contents.forEach(content => {
            createNewElementAppendTo('li', content, CoursesUl);
        });
        createNewElement('p', course.dates);
    });
    
    // läser in data om linneuniversitets utbildningen
    const linneJson = jsonObj.education.linnéuniversity;
    createNewElement('h4', 'Linnéuniversity');
}

function createNewElement(element, content) {
    const newElem = document.createElement(element);
    newElem.textContent = content;
    cvModalContentDiv.appendChild(newElem);
    return newElem
}

function createNewElementAppendTo(element, content, appendTo) {
    const newElem = document.createElement(element);
    newElem.textContent = content;
    appendTo.appendChild(newElem);
}