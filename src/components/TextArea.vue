<template>
  <div class="text-area">
      <div class="cursor" :style="'opacity: ' + cursor_opacity"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import TextList from "../ts/text-line";

@Component
export default class TextArea extends Vue {
    @Prop()
    raw_str: string
    text_list = new TextList(this.raw_str, 4)
    cursor_opacity = 1
    mounted() {
        let That = this
        function change_cursor_opacity(): void {
            That.cursor_opacity = That.cursor_opacity ^ 1
        }
        setInterval(change_cursor_opacity, 500)
    }
}
</script>

<style>
.cursor {
    width: 2px;
    height: 16px;
    background-color: #efefef;
    position: relative;
}

.text-area {
    background-color: #222;
    color: #efefef;
    width: 100%;
    height: 100%;
}
</style>
