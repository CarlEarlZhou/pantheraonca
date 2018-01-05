<template>
  <div class="text-window">
      <text-area :raw_str="'23333'"></text-area>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TextArea from "./TextArea.vue";

@Component({
    components: {
        TextArea
    }
})
export default class TextWindow extends Vue {
  
}
</script>

<style>
    .text-window {
        width: 100%;
        height: 100%;
    }
</style>
