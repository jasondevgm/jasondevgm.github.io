// Element selectors.
const lng_btn_es = document.getElementById("language-button-en");
const lng_btn_en = document.getElementById("language-button-es");
const lng_btn_cat = document.getElementById("language-button-cat");
const invitation_button = document.getElementById("invitation-button");
const btn_current_lang = document.getElementById("btn-curr-lang");

// Image paths.
const en_img = "images/flags/en.webp";
const es_img = "images/flags/es.webp";
const cat_img = "images/flags/cat.webp";

// Language detection
let navigator_lang = navigator.language || navigator.userLanguage;
let selected_language = (document.cookie || navigator_lang) || "en";


// Set initial flag based on selected language and update the language.
if (/^es*$/.test(selected_language)) {
    btn_current_lang.src = es_img;
    updateLanguage();
} else if (/^cat*$/.test(selected_language)) {
    btn_current_lang.src = cat_img;
    updateLanguage();
} else if (/^en*$/.test(selected_language)) {
    btn_current_lang.src = en_img;
    updateLanguage();
} else {
    btn_current_lang.src = en_img;
    selected_language = "en"
    updateLanguage();
}

// Change language and reload page.
function changeLanguage(language) {
    document.cookie = language;
    window.location.reload();
}

let index = 0,
    offset = 0,
    forwards = true,
    skipCount = 0,
    skipDelay = 30,
    speed = 65;

function typeEffect(sentences) {
    const rol_text = document.getElementById("rol-text");
    function type() {

        if (forwards) {
            if (offset >= sentences[index].length) {
                skipCount++;
                if (skipCount === skipDelay) {
                    forwards = false;
                    skipCount = 0;
                }
            }
        } else {
            if (offset === 0) {
                forwards = true;
                index = (index + 1) % sentences.length;
            }
        }
        const part = sentences[index].substr(0, offset);
        if (skipCount === 0) {
            offset += forwards ? 1 : -1;
        }
        rol_text.textContent = part;
        setTimeout(() => {
            requestAnimationFrame(type);
        }, speed);
    }

    requestAnimationFrame(type);
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
            document.getElementById("getInTouchBtn").textContent = lang["getInTouchBtn"];
            document.querySelector("#projects h2").textContent = lang["projects-title"];
            document.querySelector("#skills-title").textContent = lang["skills-title"];
            document.querySelector("#skills-experience-text").textContent = lang["skills-experience"];
            document.querySelector("#download-cv").textContent = lang["download-button"];
            document.querySelector("#contact h2").textContent = lang["contact-title"];
            document.querySelector("#form-inner label[for='name']").textContent = lang["form-name"];
            document.querySelector("#form-inner label[for='email']").textContent = lang["form-email"];
            document.querySelector("#form-inner label[for='message']").textContent = lang["form-message"];
            document.querySelector("#form-inner button").innerHTML = `${lang["form-button"]}  <img class='arrow' src='images/icons/arrow.svg' alt='arrow'></img>`;
            document.querySelector("#about h1").innerHTML = lang["about-title"];
            document.querySelector("#invitation-text").textContent = lang["invitation-text"];
            document.querySelector("#invitation-button").textContent = lang["invitation-button"];
            document.querySelector("#skill-learning h2").textContent = lang["skill-learning"];
            document.querySelector("#skill-learning button").textContent = lang["skill-learning-button"];
            document.querySelector("#contact h2").textContent = lang["contact-title"];
            typeEffect(lang["rol-sentences"]);
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

// Download CV based in the language browser.
function downloadCV() {
    let fileUrl = "";
    if (/^es*$/.test(selected_language)) {
        fileUrl = "files/Curriculum_es_JasonGamba.pdf";
    } else if (/^cat*$/.test(selected_language)) {
        fileUrl = "files/Curriculum_cat_JasonGamba.pdf";
    } else {
        fileUrl = "files/Curriculum_en_JasonGamba.pdf";
    }
    if (fileUrl) {
        window.open(fileUrl, "_blank");
    } else {
        console.error("No CV file available for the selected language.");
    }
}

// Copy email to clipboard.
function copyEmailToClipboard() {
    const email = "jasondevgm@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        invitation_button.innerText = "Copied!";
    }).catch(err => {
        console.error("Failed to copy email: ", err);
    });
}

// Send email to jasondevgm@gmail.com.
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:jasondevgm@gmail.com?subject=Message from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
    window.location.href = mailtoLink;

    document.getElementById('form-status').innerText = 'Message sent!';
});


// Function to scroll to top.
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show or hide the button based on scroll position.
window.addEventListener('scroll', () => {
    const toTopButton = document.getElementById('to-top-button');
    if (window.scrollY > 300) {
        toTopButton.style.display = 'block';
    } else {
        toTopButton.style.display = 'none';
    }
});

// Fetch and display GitHub projects.
fetchGitHubProjects();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 4);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bgCanvas"),
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Grid (wireframe brillante tipo neón)
const size = 150;
const divisions = 50;
const gridHelper = new THREE.GridHelper(size, divisions, "#ffffff", "#ffffff");
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.15;
scene.add(gridHelper);

// Luz ambiente neón
const ambientLight = new THREE.AmbientLight(0.8);
scene.add(ambientLight);

// Luz direccional suave
const dirLight = new THREE.DirectionalLight(0.3);
dirLight.position.set(0, 10, 10);
scene.add(dirLight);

// Simular movimiento hacia atrás: mover el grid
function animate() {
    requestAnimationFrame(animate);

    gridHelper.position.z += 0.08;
    if (gridHelper.position.z > 10) {
        gridHelper.position.z = -10;
    }

    renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
