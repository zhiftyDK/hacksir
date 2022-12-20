module.exports = {
    packagerConfig: {
        icon: './icon.ico',
        extraResource: [
            "./python/Arpspoof.py",
            "./python/ChromePassExtractor.py",
            "./python/HostnameSniffer.py",
            "./python/Whois.py",
            "./python/XssScanner.py",
            "./python/Iplookup.py",
            "./python/Crypter.py",
        ]
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                setupIcon: './icon.ico',
                loadingGif: './hacksir.gif'
            },
        },
    ],
};
