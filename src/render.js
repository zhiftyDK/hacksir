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

//Download output as txt file
function download(fileName, textareaID) {
    var downloadableLink = document.createElement('a');
    downloadableLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.getElementById(textareaID).value));
    downloadableLink.download = fileName + ".txt";
    document.body.appendChild(downloadableLink);
    downloadableLink.click();
    document.body.removeChild(downloadableLink);
}

// Tools and Scripts
if(document.getElementById("hostSnifferBtn")) {
    document.getElementById("hostSnifferBtn").addEventListener("click", () => {
        const startIp = document.getElementById("hostSnifferStartIp");
        const endIp = document.getElementById("hostSnifferEndIp");
        const output = document.getElementById("hostSnifferOutput");
        const py = exec(`py ./python/HostnameSniffer.py ${startIp.value} ${endIp.value}`);
        py.stdout.on('data', (data) => {
            output.value += data;
        });
        startIp.value = "";
        endIp.value = "";
    });
    document.getElementById("hostSnifferSave").addEventListener("click", () => {
        download("hostnames", "hostSnifferOutput");
    });
}

if(document.getElementById("chromePassBtn")) {
    document.getElementById("chromePassBtn").addEventListener("click", () => {
        console.log("Extracting")
        const output = document.getElementById("chromePassOutput");
        const py = exec(`py ./python/ChromePassExtractor.py`, (error, stdout, stderr) => { 
            output.value = stdout;
        });
    });
    document.getElementById("chromePassSave").addEventListener("click", () => {
        download("chromepasswords", "chromePassOutput");
    });
}