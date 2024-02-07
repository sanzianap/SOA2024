import { render } from "solid-js/web";

import Order from "./Order";

import "./index.scss";

const App = () => (
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: orderMicrofrontend</div>
    <Order />
  </div>
);
render(App, document.getElementById("app"));
