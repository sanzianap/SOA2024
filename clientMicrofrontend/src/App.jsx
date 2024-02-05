import { render } from "solid-js/web";

import Counter from "./Counter"
import GetAllProducts from "./GetAllProducts";
import AddProduct from "./AddProduct";
import Client from "./Client";

import "./index.scss";

const App = () => (
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: clientMicrofrontend</div>
    <Client />
  </div>
);
render(App, document.getElementById("app"));
