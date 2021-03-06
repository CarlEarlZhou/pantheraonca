<template>
<div class="text-area">
    <div class="cursor" :style="{opacity: cursor_opacity, top: cursor_top + 'px', left: cursor_left + 'px'}"></div>
    <div class="text-row" :class="{'row-active': index == text_list.cursor_position[0]}" 
    v-for="(text_row, index) in text_list.text_rows" :key="index">
        <div class="row-number">{{index + 1}}</div>
        <pre class="row-code" ref="row"><tt v-for="(char, i) in text_row" :key="i">{{char}}</tt></pre>
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
        this.text_list.handleKey(event)
        // wait for dom to be updated
        setTimeout(this.updateCursorPosition, 1)
    }

    updateCursorPosition() {
        // get cur row's pre tag
        let cur_row_pre = (<Node[]>this.$refs.row)[this.text_list.cursor_position[0]]        
        if (cur_row_pre !== null) {
            // get cur position's tt tag
            // maybe undefined because the cursor could be at the end of the line
            // or this row doesn't have any tt at all...
            let tem_pos = cur_row_pre.childNodes[this.text_list.cursor_position[1]]
            if (tem_pos === undefined) {
                // if this row doesn't have any text
                if (this.text_list.cursor_position[1] === 0) {
                    this.cursor_left = (<HTMLElement>cur_row_pre).offsetLeft
                }
                // if at the end of the row, get the last tt tag at the row and plus 7.58
                // which is the approximate width of a tt tag
                else {
                    tem_pos = cur_row_pre.childNodes[this.text_list.cursor_position[1] - 1]
                    this.cursor_left = (<HTMLElement>tem_pos).offsetLeft + 7.58
                }
            }
            else {
                this.cursor_left = (<HTMLElement>tem_pos).offsetLeft
            }
            this.cursor_top = this.text_list.cursor_position[0] * this.line_height
        }
    }

    mounted() {
        this.cursor_control = setInterval(() => this.cursor_opacity = this.cursor_opacity ^ 1, 500)
        this.updateCursorPosition()
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

.row-number {
    width: 60px;
    color: rgba(255, 255, 255, 0.5);
    background-color: #222;
    cursor: default;
    float: left;
    text-align: right;
    padding-right: 25px;
}

pre {
    color: #efefef;
    float: left;
    margin-bottom: 0;
    font-family: 'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback';
}

.text-area {
    background-color: #222;
    width: 100%;
    min-height: 100%;
    padding-bottom: 90vh;
    cursor: text;
}

.text-row {
    height: 18px;
    width: 100%;
    line-height: 18px;
    font-size: 14px;
}

.row-active {
    background-color: rgba(255, 231, 175, 0.1)
}
</style>
