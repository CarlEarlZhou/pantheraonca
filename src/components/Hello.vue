<!-- src/components/Hello.vue -->
<template>
<div>
    <hello-list v-model="lines" @blur="func"></hello-list>    
</div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import HelloList from './HelloList.vue'

@Component({
    components: {
        HelloList
    }
})
export default class Hello extends Vue {
    lines = 'sth'
    func() {
        alert('2333')
    }
}
</script>
