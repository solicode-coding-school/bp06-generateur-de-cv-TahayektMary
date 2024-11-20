 // Générer le CV
 document.getElementById('generate-btn').addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const jobTitle = document.getElementById('job-title').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const birthday = document.getElementById('birthday').value.trim();

    if (!name || !jobTitle) {
        alert('Veuillez remplir les champs obligatoires : Nom et Poste.');
        return;
    }

    // Récupérer les données dynamiques
    const links = getAllValues('links');
    const objectives = getAllValues('objective');
    const experiences = getAllValues('experience');
    const skills = getAllValues('skills');
    const languages = getAllValues('languages');
    const educationEntries = getEducationEntries();

    // Afficher les données dans le modèle de CV
    document.getElementById('cv-name').innerText = name;
    document.getElementById('cv-job-title').innerText = jobTitle;
    document.getElementById('cv-contact').innerText = contact;
    document.getElementById('cv-email').innerText = email;
    document.getElementById('cv-address').innerText = address;
    document.getElementById('cv-birthday').innerText = birthday;

    updateList('cv-links', links);
    updateList('cv-objective', objectives);
    updateList('cv-experience', experiences);
    updateList('cv-education', educationEntries);
    updateList('cv-skills', skills);
    updateList('cv-languages', languages);

    // Gestion de la photo
    const photo = document.getElementById('photo').files[0];
    if (photo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-section').innerHTML = `<img src="${e.target.result}" alt="Photo de profil" style="width: 100px; border-radius: 50%;">`;
        };
        reader.readAsDataURL(photo);
    }

    document.getElementById('cv-template').style.display = 'block';
    document.getElementById('download-btn').style.display = 'block';
});

// Ajouter des champs dynamiques
function addField(sectionId) {
    const section = document.getElementById(sectionId);
    const newField = document.createElement('textarea');
    newField.placeholder = "Ajoutez une autre entrée";
    section.appendChild(newField);
}

// Ajouter une entrée éducation
function addEducation() {
    const educationFields = document.getElementById('education-fields');
    const newEntry = document.createElement('div');
    newEntry.classList.add('education-entry');
    newEntry.innerHTML = `
        <label>Nom de l'Établissement :</label>
        <input type="text" placeholder="Entrez le nom de l'école">
        <label>Début :</label>
        <input type="date">
        <label>Fin :</label>
        <input type="date">
    `;
    educationFields.appendChild(newEntry);
}

// Récupérer toutes les valeurs dynamiques
function getAllValues(sectionId) {
    const section = document.getElementById(sectionId);
    const textareas = section.querySelectorAll('textarea');
    return Array.from(textareas).map(textarea => textarea.value.trim()).filter(value => value);
}

// Récupérer les entrées éducation
function getEducationEntries() {
    const entries = [];
    const educationFields = document.querySelectorAll('.education-entry');
    educationFields.forEach(entry => {
        const schoolName = entry.querySelector('input[type="text"]').value.trim();
        const startDate = entry.querySelector('input[type="date"]:nth-of-type(1)').value.trim();
        const endDate = entry.querySelector('input[type="date"]:nth-of-type(2)').value.trim();
        if (schoolName) {
            entries.push(`${schoolName} (${startDate} - ${endDate})`);
        }
    });
    return entries;
}

// Mettre à jour une liste dans le CV
function updateList(sectionId, items) {
    const section = document.getElementById(sectionId);
    section.innerHTML = items.map(item => `<li>${item}</li>`).join('');
}