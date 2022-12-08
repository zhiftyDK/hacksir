const { exec } = require("node:child_process");
const { ipcRenderer } = require("electron");

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
        alert("Sniffing has been initialize, be patient! Working...")
        const py = exec(`py ./python/HostnameSniffer.py ${startIp.value} ${endIp.value}`);
        py.stdout.on('data', (data) => {
            output.value += data;
        });
        startIp.value = "";
        endIp.value = "";
    });
}

if(document.getElementById("chromePassBtn")) {
    document.getElementById("chromePassBtn").addEventListener("click", () => {
        const output = document.getElementById("chromePassOutput");
        const py = exec(`py ./python/ChromePassExtractor.py`, (error, stdout, stderr) => { 
            output.value = stdout;
        });
    });
}