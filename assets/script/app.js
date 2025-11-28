'use strict';

import { listen, getElement, setCookie } from "./utils.js";

const firstBox = getElement('cookies-modal');
const secondBox = getElement('settings-modal');
const acceptBtn = getElement('accept-btn');
const settingsBtn = getElement('settings-btn');
const settingsAcceptBtn = getElement('settings-accept-btn');

const browserCheck = getElement('browser-check');
const OSCheck = getElement('os-check');
const widthCheck = getElement('width-check');
const heightCheck = getElement('height-check');

let now = new Date();
now.setSeconds(now.getSeconds() + 15);
const lifetime = now.toUTCString();

let nowTwo = new Date();
nowTwo.setSeconds(nowTwo.getSeconds() + 60);
const noCookiesLifetime = nowTwo.toUTCString();

if (document.cookie.length === 0) {
  setTimeout(() => {
    firstBox.showModal();
  }, 2000);
}

listen('click', acceptBtn, () => {
  setCookie('browser', getBrowser(), lifetime);
  setCookie('OS', getOS(), lifetime);
  setCookie('screenHeight', getScreenHeight(), lifetime);
  setCookie('screenWidth', getScreenWidth(), lifetime);
  firstBox.close();
});

listen('click', settingsBtn, () => {
  firstBox.close();
  secondBox.showModal();
});

listen('click', settingsAcceptBtn, () => {
  setPreferences();
  if (document.cookie.length === 0) {
    setCookie('enableCookies', 'noCookies', noCookiesLifetime);
  }
  secondBox.close();
});

function setPreferences() {
  if (browserCheck.checked) {
    setCookie('browser', getBrowser(), lifetime);
  }
  if (OSCheck.checked) {
    setCookie('OS', getOS(), lifetime);
  }
  if (heightCheck.checked) {
    setCookie('screenHeight', getScreenHeight(), lifetime);
  }
  if (widthCheck.checked) {
    setCookie('screenWidth', getScreenWidth(), lifetime);
  }
}

function getBrowser() {
  let browser = navigator.userAgent;
  if (browser.includes('Chrome')) {
    return 'Chrome';
  } else if (browser.includes('Edg')) {
    return 'Edge';
  } else if (browser.includes('Opera')) {
    return 'Opera';
  } else if (browser.includes('Safari')) {
    return 'Safari';
  } else if (browser.includes('Firefox')) {
    return 'Firefox';
  } else {
    return 'Undetected';
  }
}

function getOS() {
  let platform = window.navigator.platform;
  if (platform.includes('Win') === true) {
    return 'Windows';
  } else if (platform.includes('Mac') === true) {
    return 'Mac';
  } else if (platform.includes('Linux') === true) {
    return 'Linux';
  } else {
    return 'Undetected';
  }
}

function getScreenHeight() {
  return `${window.innerHeight}px`;
}

function getScreenWidth() {
  return `${window.innerWidth}px`;
}