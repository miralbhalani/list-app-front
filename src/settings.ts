

let appSettings = require(`./appsettings.${process.env.REACT_APP_APP_ENV}.json`);

const commonSettings = {
}

var settings = {
    ...commonSettings,
    ...appSettings
} as {
    env: string,
    backendBase: string
}

export default settings;