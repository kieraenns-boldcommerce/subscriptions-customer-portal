import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const insert2root = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  div.style.display = "none";
  const root = document.querySelector("#root");
  if (root) {
    root.prepend(div);
  }
};

(async () => {
  if ("caches" in window) {
    const spriteLink = "/sprite.svg";
    const newCache = await caches.open("sprite");
    const options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "image/svg+xml"
      })
    };
    let response = await newCache.match(spriteLink);
    let html;

    if (!response) {
      const req = new Request(spriteLink, options);
      await newCache.add(req);
      response = await newCache.match(spriteLink);
      html = await response.text();
      insert2root(html || "");
      return;
    }

    html = await response.text();
    insert2root(html);
  }
})();

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById("root")
);
