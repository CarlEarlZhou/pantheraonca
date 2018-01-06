<template>
<div class="text-area">
    <div class="cursor" :style="{opacity: cursor_opacity, top: cursor_top + 'px', left: cursor_left + 'px'}"></div>
    <div class="text-row" :class="{'row-active': index == text_list.cursor_position[0]}" 
    v-for="(text_row, index) in text_list.text_rows" :key="index" ref="row">
    <pre><tt v-for="(char, i) in text_row.row_str" :key="i">{{char}}</tt></pre>
    </div>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import TextList from "../ts/text-line"

@Component
export default class TextArea extends Vue {
    @Prop()
    raw_str: string
    text_list = new TextList(this.raw_str, 4)
    line_height = 18
    cursor_opacity = 1
    cursor_control: undefined|number = undefined
    cursor_top = 0
    cursor_left = 0

    moveCursor(event: KeyboardEvent) {
        this.cursor_opacity = 1
        if (this.cursor_control !== undefined) {
            clearInterval(this.cursor_control)
            this.cursor_control = undefined
        }
        if (event.key === 'ArrowDown') {
            this.text_list.cursorDown()
        }
        else if (event.key === 'ArrowUp') {
            this.text_list.cursorUp()
        }
        else if (event.key === 'ArrowLeft') {
            this.text_list.cursorLeft()
        }
        else if (event.key === 'ArrowRight') {
            this.text_list.cursorRight()
        }
        else {
            return
        }
        // get cur row's pre tag
        let cur_row_pre = (<Node[]>this.$refs.row)[this.text_list.cursor_position[0]].firstChild
        if (cur_row_pre !== null) {
            // get cur position's tt tag
            // maybe undefined because the cursor could be at the end of the line
            let tem_pos = cur_row_pre.childNodes[this.text_list.cursor_position[1]]
            if (tem_pos === undefined) {
                // if undifined, get the last tt tag at the row and plus 7.58
                // which is the approximate width of a tt tag
                tem_pos = cur_row_pre.childNodes[this.text_list.cursor_position[1] - 1]
                this.cursor_left = (<HTMLElement>tem_pos).offsetLeft + 7.58
            }
            else {
                this.cursor_left = (<HTMLElement>tem_pos).offsetLeft
            }
            this.cursor_top = this.text_list.cursor_position[0] * this.line_height
        }
    }

    mounted() {
        this.cursor_control = setInterval(() => this.cursor_opacity = this.cursor_opacity ^ 1, 500)
        // listen keyevent
        document.onkeydown = this.moveCursor
        document.onkeyup = () => {
            if (this.cursor_control === undefined) {
                this.cursor_control = setInterval(() => this.cursor_opacity = this.cursor_opacity ^ 1, 500)
            }
        }
    }
}
</script>

<style>
.cursor {
    width: 2px;
    height: 18px;
    background-color: #efefef;
    position: absolute;
}

pre {
    color: #efefef;
    font-family: 'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback';
}

.text-area {
    background-color: #222;
    width: 100%;
    height: 100%;
}

.text-row {
    height: 18px;
    width: 100%;
    line-height: 18px;
    font-size: 14px;
}

.row-active {
    background-color: rgba(255, 255, 255, 0.2)
}
</style>
