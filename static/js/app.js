// theme switcher
const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");

// theme?
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

// icon toggle
const iconToggle = () => {
    moonIcon.classList.toggle("hidden");
    sunIcon.classList.toggle("hidden");
}

// check theme
const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
        document.documentElement.classList.add("dark");
        moonIcon.classList.add("hidden");
        return;
    }
    sunIcon.classList.add("hidden");
}

// switch
const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
        iconToggle();
        return;
    }
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    iconToggle();
}

// handle click
sunIcon.addEventListener("click", () => {
    themeSwitch();
});

moonIcon.addEventListener("click", () => {
    themeSwitch();
});

document.querySelector("#dropdown").addEventListener("click", () => {
    if(document.querySelector("#dropdown2").classList.contains("hidden")) {
        document.querySelector("#dropdown2").classList.remove("hidden");
    } else {
        document.querySelector("#dropdown2").classList.add("hidden");
    }
})

// initialize
console.log("\n %c yuuki%c@yuukifor.me \n", "background: #009fff; padding:5px 0;", "background: #ececec; padding:5px 0;")
themeCheck();
