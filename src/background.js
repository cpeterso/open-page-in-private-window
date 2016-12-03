"use strict";

function openURLInPrivateWindow(url) {
    if (url.startsWith("about:") || url.startsWith("chrome:")) {
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
const menuItemTitle = browser.i18n.getMessage("menuItemTitle");
browser.contextMenus.create({title: menuItemTitle});

browser.contextMenus.onClicked.addListener((info, tab) => {
    openURLInPrivateWindow(tab.url);
});
