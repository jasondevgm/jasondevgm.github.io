// Element selectors
const lng_btn_es = document.getElementById("language-button-en");
const lng_btn_en = document.getElementById("language-button-es");
const lng_btn_cat = document.getElementById("language-button-cat");
const invitation_button = document.getElementById("invitation-button");
const btn_current_lang = document.getElementById("btn-curr-lang");

// Image paths
const en_img = "images/flags/en.webp";
const es_img = "images/flags/es.webp";
const cat_img = "images/flags/cat.webp";

// Language detection
let navigator_lang = navigator.language || navigator.userLanguage;
let selected_language = document.cookie || navigator_lang;

// Set initial flag based on selected language
if (/^es*$/.test(selected_language)) {
    btn_current_lang.src = es_img;
    updateLanguage();
} else if (/^cat*$/.test(selected_language)) {
    btn_current_lang.src = cat_img;
    updateLanguage();
} else if (/^en*$/.test(selected_language)) {
    btn_current_lang.src = en_img;
    updateLanguage();
}

// Change language and reload page
function changeLanguage(language) {
    document.cookie = language;
    window.location.reload();
}

// Update language content
async function updateLanguage() {
    await fetch("lang.json")
        .then(response => response.json())
        .then(data => {
            const lang = data[selected_language];
            document.getElementById("pro-txt").textContent = lang["pro-txt"];
            document.getElementById("skl-txt").textContent = lang["skl-txt"];
            document.getElementById("cont-txt").textContent = lang["cont-txt"];
            document.getElementById("rol-txt").textContent = lang["rol-txt"];
            document.getElementById("touch-btn").textContent = lang["touch-btn"];
            document.querySelector("#projects h2").textContent = lang["projects-title"];
            document.querySelector("#skills h2").textContent = lang["skills-title"];
            document.querySelector("#contact h2").textContent = lang["contact-title"];
            document.querySelector("#form-inner label[for='name']").textContent = lang["form-name"];
            document.querySelector("#form-inner label[for='email']").textContent = lang["form-email"];
            document.querySelector("#form-inner label[for='message']").textContent = lang["form-message"];
            document.querySelector("#form-inner button").textContent = lang["form-button"];
            document.querySelector("#about h1").innerHTML = lang["about-title"];
            document.querySelector("#invitation-text").textContent = lang["invitation-text"];
            document.querySelector("#invitation-button").textContent = lang["invitation-button"];
            document.querySelector("#skill-learning h2").textContent = lang["skill-learning"];
            document.querySelector("#skill-learning button").textContent = lang["skill-learning-button"];
            document.querySelector("#contact h2").textContent = lang["contact-title"];
        })
        .catch(error => console.error("Error:", error));
}

// Fetch GitHub projects and display them
async function fetchGitHubProjects() {
    const response = await fetch("https://api.github.com/users/jasondevgm/repos");
    const projects = await response.json();
    const projectsContainer = document.getElementById("projects-container");

    projects.forEach(async project => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement
        const contentResponse = await fetch(`https://api.github.com/repos/jasondevgm/${project.name}/contents`);
        const contents = await contentResponse.json();
        const gifFile = contents.find(file => file.name.endsWith(".gif"));
        if (project.name != "register") {
            projectElement.innerHTML = `
        <a href="${project.html_url}" target="_blank">
        <h2>${project.name}</h2>
        ${gifFile ? `<img src="${gifFile.download_url}" alt="${project.name} gif">` : ""}
        </a>
    `;
            projectsContainer.appendChild(projectElement);
        }
    });
}

// Copy email to clipboard
function copyEmailToClipboard() {
    const email = "jasondevgm@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        invitation_button.innerText = "Copied!";
    }).catch(err => {
        console.error("Failed to copy email: ", err);
    });
}

// Send email to dev
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:jasondevgm@gmail.com?subject=Message from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
    window.location.href = mailtoLink;

    document.getElementById('form-status').innerText = 'Message sent!';
});

// CSS styles
const css = `
  .project {
    width: 90%;
    transition: transform 0.2s;
    background: url("./images/gifs/triangle-dimension.webp");
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    border: 1px solid #ddd;
    margin: 10px;
    border-radius: 15px;
  }

  .project a {
    backdrop-filter: blur(3px);
    display: flex;
    cursor: pointer;
    border-radius: 15px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .project h2 {
    padding: 50px;
    font-size: 2rem;
    color: white;
  }

  .project img {
    width: 100%;
    border-radius: 0px 15px 15px 0px;
    margin: 0;
    right: 0px;
    display: block;
    height: 100%;
  }

  .project:hover {
    transform: scale(1.05);
  }
`;

// Append styles to document head
const style = document.createElement("style");
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

// Fetch and display GitHub projects
//fetchGitHubProjects();
