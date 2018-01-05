<template>
<div class="text-area">
    <div class="cursor" :style="{opacity: cursor_opacity, top: cursor_top + 'px', left: cursor_left + 'px'}"></div>
    <div class="text-row" :class="{'row-active': index == text_list.cur_line}" 
    v-for="(text_row, index) in text_row_block_list" :key="index" ref="row">
    <pre><tt v-for="(char, i) in text_row.row_str" :key="i" ref="col">{{char}}</tt></pre>
    </div>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { TextList, TextRow } from "../ts/text-line"

@Component
export default class TextArea extends Vue {
    @Prop()
    raw_str: string
    text_list = new TextList(this.raw_str, 4)
    text_row_block_list = this.text_list.text_rows
    cursor_opacity = 1
    cursor_top = 0
    cursor_left = 0
    line_height = 18

    moveCursor(event: KeyboardEvent) {
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
        this.cursor_top = this.text_list.cur_line * this.line_height
        let cur_row_pre = (<Node[]>this.$refs.row)[this.text_list.cur_line].firstChild
        if (cur_row_pre != null) {
            let tem_pos = cur_row_pre.childNodes[this.text_row_block_list[this.text_list.cur_line].cur_position]
            if (tem_pos === undefined) {
                tem_pos = cur_row_pre.childNodes[this.text_row_block_list[this.text_list.cur_line].cur_position - 1]
                this.cursor_left = (<HTMLElement>tem_pos).offsetLeft + 7.58
            }
            else {
                this.cursor_left = (<HTMLElement>tem_pos).offsetLeft
            }
        }
    }

    mounted() {
        let That = this
        function change_cursor_opacity(): void {
            That.cursor_opacity = That.cursor_opacity ^ 1
        }
        setInterval(change_cursor_opacity, 500)
        document.onkeydown = this.moveCursor
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
