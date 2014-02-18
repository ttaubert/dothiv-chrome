/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

// TODO this should be read from some server
var REDIRECTS = {"google.de": {host: "google.hiv"}};

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest,
  {urls: ["http://*/*", "https://*/*"], types: ["main_frame"]}, ["blocking"]);

/**
 * Called right before a request is about to occur.
 */
function onBeforeRequest(details) {
  // Ignore request methods other than GET.
  if (details.method != "GET") {
    return {};
  }

  var url = new URL(details.url);

  // Check if we have a direct entry for the given hostname.
  if (!(url.hostname in REDIRECTS)) {
    return {};
  }

  url.hostname = REDIRECTS[url.hostname].host;
  return {redirectUrl: url.toString()};
}
