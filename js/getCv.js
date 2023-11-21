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
    createHeader('Chas Academy');
    const chas = jsonObj.education.chas;
    createNewElement('p', chas.title);
    const chasCoursesUl = createNewElement('ul', null);
    chas.courses.forEach(content => {
        createNewElementAppendTo('li', content, chasCoursesUl);
    });
    createNewElement('p', chas.dates);

    // läser in data om frikurser utbildning
    createHeader('Free courses');
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
    createHeader('Linnéuniversity');
    const linneJson = jsonObj.education.linnéuniversity;
    linneJson.courses.forEach(course => {
        createNewElement('h4', course.title);
        const CoursesUl = createNewElement('ul', null);
        createNewElementAppendTo('li', `${course.title} (${course.points})`, CoursesUl);
        createNewElementAppendTo('li', course.contents, CoursesUl);
    });
    createNewElement('p', linneJson.dates);

    // läser in data om SCoTT utbildningen
    const scottJson = jsonObj.education.SCoTT;
    createHeader(scottJson.title);
    const scottUl = createNewElement('ul', null);
    scottJson.courses.forEach(content => {
        createNewElementAppendTo('li', content, scottUl);
    });
    createNewElement('p', scottJson.dates);

    // läser in data om snickar utbildningen
    const carpentryJson = jsonObj.education.carpentry;
    createHeader(carpentryJson.title);
    const carpentryJsonUl = createNewElement('ul', null);
    carpentryJson.courses.forEach(content => {
        createNewElementAppendTo('li', content, carpentryJsonUl);
    });
    createNewElement('p', carpentryJson.dates);

    // läser in data om snickar utbildningen
    const gymnasieskolaJson = jsonObj.education.gymnasieskola;
    createHeader(gymnasieskolaJson.title);
    const gymnasieskolaJsonUl = createNewElement('ul', null);
    gymnasieskolaJson.courses.forEach(content => {
        createNewElementAppendTo('li', content, gymnasieskolaJsonUl);
    });
    createNewElement('p', gymnasieskolaJson.dates);

    // erfarenhets sectionen
    createNewElement('h3', 'Experiences');

    // läser in erfarenheter från bygghjälp
    createExperienceSection(jsonObj.experiences.bygghjalp);
    createExperienceSection(jsonObj.experiences.bolgenBygg);
    createExperienceSection(jsonObj.experiences.skiSeasonVerbier);
    createExperienceSection(jsonObj.experiences.revelstoke);
    createExperienceSection(jsonObj.experiences.skistarHemsedal2);
    createExperienceSection(jsonObj.experiences.skistarHemsedal1);
    createExperienceSection(jsonObj.experiences.laPoint);
    createExperienceSection(jsonObj.experiences.skistarTandådalen);
    createExperienceSection(jsonObj.experiences.klappen);
    createExperienceSection(jsonObj.experiences.stAnton);

    if (!jsonObj.experiences.stAnton.title){

        console.log("inne i ifsatsen")
    }
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

function createHeader(name) {
    createNewElement('h4', name);
    createNewElement('hr', null);
}

function createExperienceSection(obj) {
    createHeader(obj.companyName);
    if (obj.title) createNewElement('p', `${obj.title} in ${obj.location}`);
    else createNewElement('p', `In ${obj.location}`);
    const ul = createNewElement('ul', null);
    obj.chores.forEach(chore => {
        createNewElementAppendTo('li', chore, ul);
    });
    createNewElement('p', obj.dates);
}
