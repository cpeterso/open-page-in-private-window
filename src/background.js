"use strict";

function openURLInPrivateWindow(url) {
    if (url.startsWith("about:") || url.startsWith("chrome:")) {
        return;
    }
    browser.windows.create({ url, incognito: true });
}

//
// Add toolbar button handler.
//
browser.browserAction.onClicked.addListener(tab => {
    openURLInPrivateWindow(tab.url);
});

//
// Add context menu item handler.
//
const actionTitle = browser.i18n.getMessage("actionTitle");
browser.contextMenus.create({title: actionTitle});

browser.contextMenus.onClicked.addListener((info, tab) => {
    openURLInPrivateWindow(tab.url);
});
