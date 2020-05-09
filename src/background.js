"use strict";

const FIREFOX_RELNOTES_URL = "https://www.mozilla.org/firefox/releasenotes/";
const PRIVATE_WINDOWS_KB_URL = "https://support.mozilla.org/kb/extensions-private-browsing#w_granting-permission-on-installation";

function reportError(functionName, error) {
    console.error(`Open Page in Private Window: ${functionName} returned error "${error}"`);
}

function openTab(url) {
    try {
        browser.tabs.create({ url });
    } catch (tabError) {
        reportError("browser.tabs.create", tabError);
    }
}

async function openURLInPrivateWindow(url) {
    if (url.startsWith("about:") || url.startsWith("chrome:")) {
        return;
    }

    try {
        await browser.windows.create({ url, incognito: true });
    } catch (windowError) {
        reportError("browser.windows.create", windowError);
        openTab("Run_in_Private_Windows.html");
    }
}

//
// Add toolbar button handler.
//
browser.browserAction.onClicked.addListener(async (tab) => {
    await openURLInPrivateWindow(tab.url);
});

//
// Add context menu item handler.
//
const actionTitle = browser.i18n.getMessage("actionTitle");
browser.contextMenus.create({title: actionTitle}, () => {
    let error = browser.runtime.lastError;
    if (error) {
        reportError("browser.contextMenus.create", error);
    }
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
    await openURLInPrivateWindow(tab.url);
});

//
// Tell users the extension needs the "Run in Private Windows" permission.
//
browser.runtime.onInstalled.addListener(({ reason, temporary }) => {
    switch (reason) {
        case "install":
            openTab(PRIVATE_WINDOWS_KB_URL);
            break;
        case "update":
            // To notify users who have the extension installed but never
            // granted the "Run in Private Windows" permission, try to open
            // a page in a Private Window.
            openURLInPrivateWindow(FIREFOX_RELNOTES_URL);
            break;
    }
});
