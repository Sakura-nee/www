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
    return;
}

// handle click
sunIcon.addEventListener("click", () => {
    themeSwitch();
});

moonIcon.addEventListener("click", () => {
    themeSwitch();
});

document.querySelector("#dropdown").addEventListener("click", () => {
    if (document.querySelector("#dropdown2").classList.contains("hidden")) {
        document.querySelector("#dropdown2").classList.remove("hidden");
    } else {
        document.querySelector("#dropdown2").classList.add("hidden");
    }
})

// initialize
console.log("\n %c yuuki%c@yuukifor.me \n", "background: #009fff; padding:5px 0;", "background: #ececec; padding:5px 0;")
themeCheck();




// Socket
var ws = new WebSocket("ws://console.yuukifor.me:8080");
ws.onopen = function (evt) {
    ws.send(JSON.stringify({ session_id: "yuuki", type: "join" }))
}

document.querySelector('#create_button').addEventListener('click', () => {
    let url = document.querySelector('#gdrive_url').value;
    ws.send(JSON.stringify({ session_id: "yuuki", cmd: "upload", url: url }))
})

ws.onmessage = function (evt) {
    let json_resp = JSON.parse(evt.data);
    console.log(json_resp)
    if (json_resp.status === "success") {
        document.querySelector('#mirror_progress').innerHTML = `<span class="flex border rounded-full bg-[#ececec] dark:bg-[#2D2B3B] p-3 border-zinc-700 text-black dark:text-white"><p class="border rounded-full bg-blue-600 px-2 text-[0.75rem] mr-3 text-center">success</p><p>${json_resp.message}</p></span>`;
    } else {
        document.querySelector('#mirror_progress').innerHTML = `<span class="flex border rounded-full bg-[#ececec] dark:bg-[#2D2B3B] p-3 border-zinc-700 text-black dark:text-white"><p class="border rounded-full bg-lime-500 px-2 text-[0.75rem] mr-3 text-center">process</p><p class="text-center">${json_resp.message}</p></span>`
    }
}
