import { render } from "solid-js/web";

//import Counter from "clientMicrofrontend/Counter"
import Client from "clientMicrofrontend/Client"
import Product from "productMicrofrontend/Product"
import Order from "orderMicrofrontend/Order"

import "./index.scss";

const App = () => (
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <div class="bg-blue-100"><Client /></div>
    <br />
    <div class="bg-green-100"><Product /></div>
    <br />
    <div class="bg-yellow-100"><Order /></div>
  </div>
);
render(App, document.getElementById("app"));
