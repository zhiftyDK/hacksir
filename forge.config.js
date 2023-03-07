module.exports = {
    packagerConfig: {
        icon: './icon.ico',
        extraResource: [
            "./python",
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
