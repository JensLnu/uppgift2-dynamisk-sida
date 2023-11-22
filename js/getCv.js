const cvModal = document.getElementById("created-modal-content");

async function getCvFromJson() {
    console.log('start getCvFromJson');
    const respone = await fetch('../json/cv.json');
    if (respone.ok) {
        const jsonObj = await respone.json(respone);
        renderJsonObj(jsonObj);
    } else {
        cvModal.textContent = 'Error status koden är: ' + respone.status;
        console.log('Error status koden är: ' + respone.status);
    }
}

// -------------------- Main funktion --------------------
// skapar element med innehållet från cv.json i önskad ordning
function renderJsonObj(jsonObj) {
    // kontrollerar så att inte inläsningen görs flera gånger
    if (cvModal.textContent == '') {
        // kontaktinformation section
        createNewElement('h3', 'Contact Info', cvModal);
        const contactUl = createNewElement('ul', null, cvModal);
        createNewElement('li', jsonObj.contactInfo.name, contactUl);
        createNewElement('li', jsonObj.contactInfo.email, contactUl);
        createNewElement('li', jsonObj.contactInfo.teleNr, contactUl);

        // education section
        createNewElement('h3', 'Education', cvModal);
        createEducationSection('Chas Academy', jsonObj.education.chas);

        // läser in data om frikurser utbildning
        createHeader('Free courses');
        jsonObj.education.courses.forEach(course => {
            createNewElement('h4', `${course.title} (${course.points})`, cvModal);
            createNewElement('p', course.contents.join(', '), cvModal);
            createNewElement('p', course.dates, cvModal);
        });

        // läser in data om linneuniversitets utbildningen
        createHeader('Linnéuniversity');
        const linneJson = jsonObj.education.linnéuniversity;
        linneJson.courses.forEach(course => {
            createNewElement('h4', `${course.title} (${course.points})`, cvModal);
            createNewElement('p', course.contents, cvModal);
        });
        createNewElement('p', linneJson.dates, cvModal);

        // utbildnings section
        createEducationSection('SCoTT', jsonObj.education.SCoTT);
        createEducationSection('Carpentry', jsonObj.education.carpentry);
        createEducationSection('Upper secondary school', jsonObj.education.gymnasieskola);

        // erfarenhets sectionen
        createNewElement('h3', 'Experiences', cvModal);
        const exp = jsonObj.experiences;
        createExperienceSection(exp.bygghjalp);
        createExperienceSection(exp.bolgenBygg);
        createExperienceSection(exp.skiSeasonVerbier);
        createExperienceSection(exp.revelstoke);
        createExperienceSection(exp.skistarHemsedal2);
        createExperienceSection(exp.skistarHemsedal1);
        createExperienceSection(exp.laPoint);
        createExperienceSection(exp.skistarTandådalen);
        createExperienceSection(exp.klappen);
        createExperienceSection(exp.stAnton);
    }
}

// -------------------- Konstruktions funktioner --------------------

// parameter: (vilket typ av element, text innehåll, förälder-element)
function createNewElement(element, content, appendTo) {
    const newElem = document.createElement(element);
    newElem.textContent = content;
    appendTo.appendChild(newElem);
    return newElem
}

function createHeader(text) {
    createNewElement('h4', text, cvModal);
    createNewElement('hr', null, cvModal);
}

// parameter: (text innehåll, aktuellt objekt)
function createEducationSection(header, obj) {
    createHeader(header);
    createNewElement('p', obj.title, cvModal);
    const ul = createNewElement('ul', null, cvModal);
    obj.courses.forEach(course => {
        createNewElement('li', course, ul);
    });
    createNewElement('p', obj.dates, cvModal);
}

function createExperienceSection(obj) {
    createHeader(obj.companyName);
    obj.title ? createNewElement('p', `${obj.title} in ${obj.location}`, cvModal) : createNewElement('p', `In ${obj.location}`, cvModal);
    const ul = createNewElement('ul', null, cvModal);
    obj.chores.forEach(chore => {
        createNewElement('li', chore, ul);
    });
    createNewElement('p', obj.dates, cvModal);
}