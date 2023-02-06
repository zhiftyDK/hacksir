module.exports = {
    packagerConfig: {
        icon: './icon.ico',
        extraResource: [
            "./python/Arpspoof.py",
            "./python/MultiArpspoof.py",
            "./python/ChromePassExtractor.py",
            "./python/HostnameSniffer.py",
            "./python/Whois.py",
            "./python/XssScanner.py",
            "./python/Iplookup.py",
            "./python/Crypter.py",
            "./python/PasswordStrength.py",
            "./python/SynFlooding.py",
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
