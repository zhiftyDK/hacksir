const { exec, spawn } = require("node:child_process");
const { ipcRenderer } = require("electron");
const { Console } = require("node:console");
const path = require("node:path");

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

//Default base of file path
let pathBase = process.resourcesPath;
const development = false;
if(development){
    pathBase = "./python";
}
console.log(pathBase);

// Tools and Scripts
if(document.getElementById("arpSpoofBtn")) {
    let py;
    let victimIp;
    let gatewayIp;
    const output = document.getElementById("arpSpoofOutput");
    document.getElementById("arpSpoofBtn").addEventListener("click", () => {
        victimIp = document.getElementById("arpSpoofVictimIp");
        gatewayIp = document.getElementById("arpSpoofGatewayIp");
        if(py != undefined) {
            py.kill();
            spawn(`python`,[`${pathBase}/Arpspoof.py`,"--restore",victimIp.value,gatewayIp.value], {detached: true});
            output.value = "";
        }
        py = spawn(`python`,[`${pathBase}/Arpspoof.py`,"--spoof",victimIp.value,gatewayIp.value], {detached: true});
        py.stdout.on('data', (data) => {
            output.value += data;
            output.scrollTop = output.scrollHeight;
        });
    });
    document.getElementById("arpSpoofStopBtn").addEventListener("click", () => {
        py.kill();
        py = spawn(`python`,[`${pathBase}/Arpspoof.py`,"--restore",victimIp.value,gatewayIp.value], {detached: true});
        py.stdout.on('data', (data) => {
            output.value += data;
            output.scrollTop = output.scrollHeight;
        });
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

        btn.disabled = true;

        output.value = "Hostname sniff started!\n";
        
        const py = exec(`py ${pathBase}/HostnameSniffer.py ${startIp.value} ${endIp.value}`);
        py.stdout.on('data', (data) => {
            output.value += data;
            output.scrollTop = output.scrollHeight;
        });

        startIp.value = "";
        endIp.value = "";

        py.on("close", () => {
            btn.disabled = false;
            output.value += "Hostname sniff ended!"
        });
    });
    document.getElementById("hostSnifferSave").addEventListener("click", () => {
        download("hostnames", "hostSnifferOutput");
    });
}

if(document.getElementById("chromePassBtn")) {
    document.getElementById("chromePassBtn").addEventListener("click", () => {
        const output = document.getElementById("chromePassOutput");
        const py = exec(`py ${pathBase}/ChromePassExtractor.py`, (error, stdout, stderr) => { 
            output.value = stdout;
        });
    });
    document.getElementById("chromePassSave").addEventListener("click", () => {
        download("chromepasswords", "chromePassOutput");
    });
}

if(document.getElementById("whoisBtn")) {
    document.getElementById("whoisBtn").addEventListener("click", () => {
        const output = document.getElementById("whoisOutput");
        const url = document.getElementById("whoisUrl");
        output.value = "";
        const py = exec(`py ${pathBase}/Whois.py ${url.value}`);
        py.stdout.on('data', (data) => {
            output.value += data;
            output.scrollTop = output.scrollHeight;
        });
    });
    document.getElementById("whoisSave").addEventListener("click", () => {
        download("whoislog", "whoisOutput");
    });
}

if(document.getElementById("xssScanBtn")) {
    document.getElementById("xssScanBtn").addEventListener("click", () => {
        const output = document.getElementById("xssScanOutput");
        const url = document.getElementById("xssScanUrl");
        output.value = "";
        const py = exec(`py ${pathBase}/XssScanner.py ${url.value}`);
        py.stdout.on('data', (data) => {
            output.value += data;
            output.scrollTop = output.scrollHeight;
        });
    });
    document.getElementById("xssScanSave").addEventListener("click", () => {
        download("xssscannerlog", "xssScanOutput");
    });
}

if(document.getElementById("ipLookupBtn")) {
    document.getElementById("ipLookupBtn").addEventListener("click", () => {
        const output = document.getElementById("ipLookupOutput");
        const url = document.getElementById("ipLookupUrl");
        output.value = "";
        const py = exec(`py ${pathBase}/Iplookup.py ${url.value}`);
        py.stdout.on('data', (data) => {
            output.value += data;
            output.scrollTop = output.scrollHeight;
        });
    });
    document.getElementById("ipLookupSave").addEventListener("click", () => {
        download("iplookuplog", "ipLookupOutput");
    });
}

if(document.getElementById("crypterEncryptBtn")) {
    const output = document.getElementById("crypterOutput");
    let message;
    let pass;
    document.getElementById("crypterEncryptBtn").addEventListener("click", () => {
        message = document.getElementById("crypterMessage");
        pass = document.getElementById("crypterPass");
        output.value = "";
        const py = exec(`py ${pathBase}/Crypter.py -e "${message.value}" -p ${pass.value}`);
        py.stdout.on('data', (data) => {
            output.value += data;
            output.scrollTop = output.scrollHeight;
        });
    });
    document.getElementById("crypterDecryptBtn").addEventListener("click", () => {
        message = document.getElementById("crypterMessage");
        pass = document.getElementById("crypterPass");
        output.value = "";
        const py = exec(`py ${pathBase}/Crypter.py -d "${message.value}" -p ${pass.value}`);
        py.stdout.on('data', (data) => {
            output.value += data;
            output.scrollTop = output.scrollHeight;
        });
    });
    document.getElementById("crypterSave").addEventListener("click", () => {
        download("crypterlog", "crypterOutput");
    });
}

if(document.getElementById("passStrengthBtn")) {
    document.getElementById("passStrengthBtn").addEventListener("click", () => {
        const output = document.getElementById("passStrengthOutput");
        const password = document.getElementById("passStrengthPassword");
        output.value = "";
        const py = exec(`py ${pathBase}/PasswordStrength.py "${password.value}"`);
        py.stdout.on('data', (data) => {
            output.value += data;
            output.scrollTop = output.scrollHeight;
        });
    });
    document.getElementById("passStrengthSave").addEventListener("click", () => {
        download("passStrengthlog", "passStrengthOutput");
    });
}

if(document.getElementById("synFloodStartBtn")) {
    let py;
    const output = document.getElementById("synFloodOutput");
    document.getElementById("synFloodStartBtn").addEventListener("click", () => {
        const Ip = document.getElementById("synFloodIp");
        const Port = document.getElementById("synFloodPort");
        if(py != undefined) {
            py.kill();
            output.value = "";
        }
        py = spawn(`python`,[`${pathBase}/SynFlooding.py`,Ip.value,Port.value], {detached: true});
        py.stdout.on('data', (data) => {
            output.value += data;
            output.scrollTop = output.scrollHeight;
        });
    });
    document.getElementById("synFloodStopBtn").addEventListener("click", () => {
        py.kill();
        output.value += "Syn Flooding attack ended!";
    });
    document.getElementById("synFloodSave").addEventListener("click", () => {
        download("synfloodlog", "synFloodOutput");
    });
}