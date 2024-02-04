import { render } from "solid-js/web";

import Counter from "./Counter"
import Daate from "./Daate"

import "./index.scss";

const App = () => (
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: clientMicrofrontend</div>
    <div>Framework: solid-js</div>
    <div>Language: JavaScript</div>
    <div>CSS: Tailwind</div>
    <Counter />
    <Daate />
  </div>
);
render(App, document.getElementById("app"));
