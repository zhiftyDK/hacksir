module.exports = {
    packagerConfig: {
        icon: './icon.ico',
        extraResource: [
            "./python/Arpspoof.py",
            "./python/ChromePassExtractor.py",
            "./python/HostnameSniffer.py",
            "./python/XssScanner.py",
        ]
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                setupIcon: './icon.ico'
            },
        },
    ],
};
