"use strict";

function reportError(functionName, error) {
    console.error(`Open Page in Private Window: ${functionName} returned error "${error}"`);
}

async function openURLInPrivateWindow(url) {
    if (url.startsWith("about:") || url.startsWith("chrome:")) {
        return;
    }

    try {
        await browser.windows.create({ url, incognito: true });
    } catch (windowError) {
        reportError("browser.windows.create", windowError);
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
