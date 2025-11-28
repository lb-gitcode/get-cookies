'use strict';

// utility functions
// get HTML element by ID
export function getElement(selector, scope = document) { return scope.getElementById(selector); }
// select HTML element 
export function select(selector, scope = document) { return scope.querySelector(selector); }
// select a list of HTML elements as an array
export function selectAll(selector, scope = document) { return [...scope.querySelectorAll(selector)]; }
// adding event listener
export function listen(event, selector, callback) { return selector.addEventListener(event, callback); }

export function setCookie(name, value, expires) {
  const options = {
    path: '/',
    SameSite: 'Lax',
    expires: expires
  }

  // construct cookie string
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  for (let option in options) {
    cookieString += `; ${option}=${options[option]}`;
  }

  // sets cookie
  document.cookie = cookieString;
}

export function getCookie() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
    if (decodeURIComponent(cookieName === name)) return decodeURIComponent(cookieValue);
  }
  return null;
}