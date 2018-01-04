<template>

    <input type="text" :placeholder="value">

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import vm from './vm.vue'

@Component
export default class HelloList extends Vue {
    @Prop()
    value: string
}
</script>
