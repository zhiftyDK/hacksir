const { exec } = require("node:child_process");
const { ipcRenderer } = require("electron");
const { stringify } = require("node:querystring");
const { hostname } = require("node:os");

document.getElementById("minimizeBtn").addEventListener("click", () => {
    ipcRenderer.send("minimizeApp");
})

document.getElementById("maximizeBtn").addEventListener("click", () => {
    ipcRenderer.send("maximizeApp");
})

document.getElementById("closeBtn").addEventListener("click", () => {
    ipcRenderer.send("closeApp");
})

if(document.getElementById("searchField")) {
    document.getElementById("searchField").addEventListener("input", () => {
        document.querySelectorAll(".card").forEach(element => {
            if(!element.querySelector(".card-title").innerHTML.toLowerCase().includes(document.getElementById("searchField").value)){
                element.style.display = "none";
            } else {
                element.style.display = "flex";
            }
        });
    });
}


// Tools and Scripts
if(document.getElementById("hostSnifferBtn")) {
    document.getElementById("hostSnifferBtn").addEventListener("click", () => {
        const startIp = document.getElementById("hostSnifferStartIp");
        const endIp = document.getElementById("hostSnifferEndIp");
        const output = document.getElementById("hostSnifferOutput");
        
        console.log(startIp.value, endIp.value);
        exec(`py ./python/HostnameSniffer.py ${startIp.value} ${endIp.value}`, (error, stdout, stderr) => { 
            console.log(stdout);
            output.value = stdout;
        });
        startIp.value = "";
        endIp.value = "";
    });
}