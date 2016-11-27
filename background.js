"use strict";

function openURLInPrivateWindow(url) {
    browser.windows.create({ url, incognito: true });
}

//
// Add toolbar button.
//
browser.browserAction.onClicked.addListener(tab => {
    const url = tab.url;
    if (url.startsWith("about:")) {
        return;
    }
    openURLInPrivateWindow(url);
});

//
// Add context menu item.
//
const menuItem = "Open Page in Private Window";
browser.contextMenus.create({title: menuItem});

browser.contextMenus.onClicked.addListener((info, tab) => {
    openURLInPrivateWindow(tab.url);
});
