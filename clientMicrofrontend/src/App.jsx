import { render } from "solid-js/web";

import Client from "./Client";

import "./index.scss";

const App = () => (
  <div class="mt-10 text-3xl mx-auto bg-blue-100">
    <Client />
    <br />
  </div>
);
render(App, document.getElementById("app"));
