const modeToggle = document.querySelector('h1')

modeToggle.addEventListener('click', () => {
    document.body.classList.contains('light-theme') ? enableDarkMode() : enableLightMode();
})

function enableLightMode() {
    document.body.classList.remove('dark-theme')
    document.body.classList.add('light-theme')
}

function enableDarkMode() {
    document.body.classList.remove('light-theme')
    document.body.classList.add('dark-theme')
}

function setThemePreference() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        enableDarkMode();
        return;
    }
    enableLightMode();
}

document.onload = setThemePreference();