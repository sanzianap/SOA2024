import { render } from "solid-js/web";

import Product from "./Product";

import "./index.scss";

const App = () => (
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <Product />
  </div>
);
render(App, document.getElementById("app"));
