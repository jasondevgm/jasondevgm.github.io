const lng_btn_es = document.getElementById("language-button-en");
const lng_btn_en = document.getElementById("language-button-es");
const lng_btn_cat = document.getElementById("language-button-cat");

const btn_current_lang = document.getElementById("btn-curr-lang");

const en_img = "images/flags/en.webp";
const es_img = "images/flags/es.webp";
const cat_img = "images/flags/cat.webp";

let navigator_lang = navigator.language || navigator.userLanguage;
let selected_language = document.cookie || navigator_lang;

console.log(selected_language);

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

const essentialSkills = ["JavaScript", "HTML", "CSS", "React", "Node.js", "TypeScript", "Express", "MongoDB", "Docker", "Kubernetes", "AWS", "Webpack"];

function changeLanguage(language) {
  document.cookie = language;
  window.location.reload();
  console.log(language);
}

async function updateLanguage() {
  await fetch("lang.json")
    .then(response => response.json())
    .then(data => {
      const lang = data[selected_language];
      console.log(lang);
      document.getElementById("pro-txt").textContent = lang["pro-txt"];
      document.getElementById("skl-txt").textContent = lang["skl-txt"];
      document.getElementById("cont-txt").textContent = lang["cont-txt"];
      document.getElementById("rol-txt").textContent = lang["rol-txt"];
      document.getElementById("touch-btn").textContent = lang["touch-btn"];
      document.querySelector("#projects h2").textContent =
        lang["projects-title"];
      document.querySelector("#skills h2").textContent = lang["skills-title"];
      document.querySelector("#contact h2").textContent = lang["contact-title"];
      document.querySelector("#form-inner label[for='name']").textContent =
        lang["form-name"];
      document.querySelector("#form-inner label[for='email']").textContent =
        lang["form-email"];
      document.querySelector("#form-inner label[for='message']").textContent =
        lang["form-message"];
      document.querySelector("#form-inner button").textContent =
        lang["form-button"];
    })
    .catch(error => console.error("Error:", error));
}

async function fetchGitHubProjects() {
  const response = await fetch("https://api.github.com/users/jasondevgm/repos");
  const projects = await response.json();

  const projectsContainer = document.getElementById("projects-container");

  projects.slice(1).forEach(async project => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
    const contentsResponse = await fetch(
      `https://api.github.com/repos/jasondevgm/${project.name}/contents`
    );
    const contents = await contentsResponse.json();
    const gifFile = contents.find(file => file.name.endsWith(".gif"));

    projectElement.innerHTML = `
            <a href="${project.html_url}" target="_blank">
            <h3>${project.name}</h3>
            ${gifFile
              ? `<img src="${gifFile.download_url}" alt="${project.name} gif">`
              : ""}
            </a>
        `;
    projectsContainer.appendChild(projectElement);
  });
}

const css = `
    .project {
        border: 1px solid #ddd;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .project a {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .project h3 {
        margin: 0 0 10px;
        font-size: 2rem;
    }
    .project p {
        margin: 0 0 10px;
        color: #555;
    }
    .project img {
        width: 100%;
        height: 100%
        height: auto;
        display: block;
        margin-top: 10px;
    }
`;

const style = document.createElement("style");
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

//fetchGitHubProjects();
