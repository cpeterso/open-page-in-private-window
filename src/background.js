"use strict";

function openURLInPrivateWindow(url) {
    if (url.startsWith("about:")) {
        return;
    }
    browser.windows.create({ url, incognito: true });
}

//
// Add toolbar button.
//
browser.browserAction.onClicked.addListener(tab => {
    openURLInPrivateWindow(tab.url);
});

//
// Add context menu item.
//
const menuItem = "Open Page in Private Window";
browser.contextMenus.create({title: menuItem});

browser.contextMenus.onClicked.addListener((info, tab) => {
    openURLInPrivateWindow(tab.url);
});
