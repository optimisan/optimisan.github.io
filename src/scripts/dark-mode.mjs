export default function updateColorTheme(theme) {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("color-mode", theme);
    const icon = document.querySelector("#dark-mode-toggle img");

    if (icon) {
        icon.setAttribute(
            "src",
            theme === "dark" ? "/light-mode.svg" : "/dark-mode.svg"
        );
    }
    else {
        window.onload = () => {
            document
                .querySelector("#dark-mode-toggle img")
                ?.setAttribute(
                    "src",
                    theme === "dark" ? "/light-mode.svg" : "/dark-mode.svg"
                )
        };
    }
}