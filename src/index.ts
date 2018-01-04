import Vue from "vue";
import HelloComponent from "./components/Hello.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <hello-component/>
    </div>
    `,
    components: {
        HelloComponent,
    }
})
