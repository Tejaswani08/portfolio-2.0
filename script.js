console.log("script.js loaded");
emailjs.init("winZX3gEHvzcb5fnM");

// ===============================
// Supabase Configuration
// ===============================

const supabaseUrl = "https://bbzxsrochawoehwcvrla.supabase.co";

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJienhzcm9jaGF3b2Vod2N2cmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3ODUzNTcsImV4cCI6MjA5OTM2MTM1N30.Z6pVudelc7G0mb4qwzt9C7kIkVx0Ypaxr0EOleMmRSQ";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
// ===============================
// Portfolio 2.0 - Module 2 Part 3
// ===============================

const words = [
  "Electronics Student",
  "AI Enthusiast",
  "IoT Developer",
  "Web Developer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typing = document.getElementById("typing");

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typing.textContent = currentWord.substring(0, charIndex--);
  } else {
    typing.textContent = currentWord.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex > currentWord.length) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  }

  if (isDeleting && charIndex < 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    charIndex = 0;
  }

  setTimeout(type, isDeleting ? 60 : 120);
}

type();


// Theme Toggle

const themeBtn=document.getElementById("theme-toggle");

themeBtn.onclick=()=>{

    document.body.classList.toggle("light-mode");
}


// Mobile Menu

const menu=document.querySelector(".menu-toggle");

const nav=document.querySelector(".nav-links");

menu.onclick=()=>{

    nav.classList.toggle("active");
}
// ===============================
// Scroll Reveal Animation
// ===============================

const sections = document.querySelectorAll("section");

const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

sections.forEach((section) => {
    reveal.observe(section);
});
// ===============================
// Active Navbar
// ===============================

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 120;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// Back To Top Button

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};
// Loader

window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    loader.classList.add("loader-hide");

});

const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

window.addEventListener("scroll",()=>{

const winScroll=document.body.scrollTop || document.documentElement.scrollTop;

const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

const scrolled=(winScroll/height)*100;

document.getElementById("progress-bar").style.width=scrolled+"%";

});

function openCertificate(src){
    document.getElementById("certificatePopup").style.display="flex";
    document.getElementById("popupImage").src=src;
}

function closeCertificate(){
    document.getElementById("certificatePopup").style.display="none";
}


// ===============================
// Contact Form -> Supabase
// ===============================

document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const { error } = await supabaseClient
      .from("contact_messages")
      .insert([
        {
          name: name,
          email: email,
          subject: subject,
          message: message
        }
      ]);

   if (error) {
    console.error(error);
    alert(error.message);

} else {

    // Send Email using EmailJS
    emailjs.send(
        "service_m76pk0k",
        "template_ky1xkgg",
        {
            name: name,
            email: email,
            subject: subject,
            message: message
        }
    )

        .then(function () {
        alert("✅ Message sent successfully!");
        document.getElementById("contact-form").reset();
    })
    .catch(function (error) {
        console.log("EmailJS Error:", error);
        alert(JSON.stringify(error));
    });

}

});