import Vue from "vue";
import TextWindow from "./components/TextWindow.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div style="width: 100%; height: 100%;">
        <text-window/>
    </div>
    `,
    components: {
        TextWindow,
    }
})
