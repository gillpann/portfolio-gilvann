import { motion } from "framer-motion";

document.addEventListener("DOMContentLoaded", function () {
  const initialAnimations = document.querySelectorAll(".animate-on-load");

  initialAnimations.forEach((element) => {
    const initialAnimation = {
      hidden: { opacity: 0, x: -50 }, // Atau x: 50 untuk muncul dari kanan
      visible: { opacity: 1, x: 0 },
    };

    const initialOptions = {
      duration: 1,
    };

    const initialVariants = {
      hidden: initialAnimation.hidden,
      visible: initialAnimation.visible,
    };

    const initialTransition = {
      ...initialOptions,
    };

    const initialAnimationConfig = {
      variants: initialVariants,
      initial: "hidden",
      animate: "visible",
      transition: initialTransition,
    };

    motion(element).set(initialAnimationConfig);
  });

  window.addEventListener("scroll", function () {
    const heroSection = document.getElementById("hero");
    const aboutSection = document.getElementById("about");
    const skillsSection = document.getElementById("skills");
    const projectsSection = document.getElementById("projects");
    const contactSection = document.getElementById("contact");

    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > heroSection.offsetTop) {
      motion(document.querySelector(".hero-title")).set({
        opacity: 1,
        x: 0,
        transition: { duration: 1 },
      });
    }
  });
});

// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector("#to-top");

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

window.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});

// Dark mode
const darkModeToggle = document.getElementById("dark-mode-toggle");

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  darkModeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
    `;
}

darkModeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const isDarkMode = html.classList.contains("dark");

  if (isDarkMode) {
    darkModeToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
        `;
  } else {
    darkModeToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
        `;
  }

  html.classList.toggle("dark");
});

// Animasi mengetik

const jobElement = document.getElementById("job-text");
const cursorElement = document.getElementById("cursor");
const textSequences = ["I'm Front-End Developer. ", "Web Designer. "];
let indexSequence = 0;
let index = 0;
let isTyping = true;

function typeWriter() {
  const currentSequence = textSequences[indexSequence];

  if (index < currentSequence.length && isTyping) {
    jobElement.querySelector("#typing-text").textContent +=
      currentSequence.charAt(index);
    index++;
    setTimeout(typeWriter, 80);
  } else {
    isTyping = false;
    setTimeout(deleteText, 800);
  }
}

function deleteText() {
  const currentSequence = textSequences[indexSequence];

  if (index >= 0 && !isTyping) {
    const currentText = jobElement.querySelector("#typing-text").textContent;
    const newText = currentText.substring(0, index - 1);
    jobElement.querySelector("#typing-text").textContent = newText;
    index--;

    setTimeout(deleteText, 30);
  } else {
    isTyping = true;
    index = 0;

    indexSequence++;
    if (indexSequence >= textSequences.length) {
      indexSequence = 0;
    }

    setTimeout(typeWriter, 800);
  }
}

// Mulai animasi ketik saat halaman dimuat
window.onload = function () {
  typeWriter();
};
