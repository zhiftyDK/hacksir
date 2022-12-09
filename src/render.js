const { exec, spawn } = require("node:child_process");
const { ipcRenderer } = require("electron");
const { Console } = require("node:console");

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
if(document.getElementById("arpSpoofBtn")) {
    let py;
    const output = document.getElementById("arpSpoofOutput");
    document.getElementById("arpSpoofBtn").addEventListener("click", () => {
        const victimIp = document.getElementById("arpSpoofVictimIp");
        if(py != undefined) {
            py.kill();
            output.value = "";
        }
        py = spawn(`python`,["./python/Arpspoof.py",victimIp.value], {detached: true});
        py.stdout.on('data', (data) => {
            output.value += data;
            output.scrollTop = output.scrollHeight;
        });
    });
    document.getElementById("arpSpoofStopBtn").addEventListener("click", () => {
        py.kill();
        output.value += "Attack ended, restoring ip arrangement!";
    });
    document.getElementById("arpSpoofSave").addEventListener("click", () => {
        download("arpspooflog", "arpSpoofOutput");
    });
}

if(document.getElementById("hostSnifferBtn")) {
    document.getElementById("hostSnifferBtn").addEventListener("click", () => {
        const startIp = document.getElementById("hostSnifferStartIp");
        const endIp = document.getElementById("hostSnifferEndIp");
        const output = document.getElementById("hostSnifferOutput");
        const btn = document.getElementById("hostSnifferBtn");
        const loader = document.getElementById("hostSnifferLoad");

        btn.disabled = true;
        
        const py = exec(`py ./python/HostnameSniffer.py ${startIp.value} ${endIp.value}`);
        py.stdout.on('data', (data) => {
            if(data.includes("/")) {
                loader.innerText = `Ip Adresses scanned: ${data}`;
            } else {
                output.value += data;
                output.scrollTop = output.scrollHeight;
            }
        });

        startIp.value = "";
        endIp.value = "";

        py.on("close", () => {
            btn.disabled = false;
        });
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