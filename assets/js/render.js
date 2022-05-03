/**
 * Logger
 */
document.getElementById("button-log").addEventListener("click", () => {
    window.logger.error("success", () => {
        console.log("Message reçu en provenance du main process");
    });
})

/**
 * Message box
 */
document.getElementById("button-box").addEventListener("click", async () => {
    await window.dialog.showMessageBox();
})

