import * as _ from 'lodash'

export default class TextList {
    private _tab_len: number
    private _text_list: string[]
    private _text_list_before: string[]
    private _text_list_after: string[]
    private _cur_line: number
    private _cur_position: number

    constructor(raw_str: string, tab_len=4) {
        // split input str by \n
        // convert a tab to some spaces
        let convert_space = ''
        for (let i = 0; i < tab_len; i++) {
            convert_space = convert_space + ' '            
        }
        this._text_list_after = raw_str.split('\n').map(row_str => row_str.replace(/\t/g, convert_space))
        this._text_list_before = new Array<string>()       
        this._tab_len = tab_len
        // init cursor position
        // cur_line can be standed by _text_list_before.length
        this._cur_position = 0
    }

    public handleKey(event: KeyboardEvent) {
        if (event.key === 'ArrowDown') {
            this.cursorDown()
        }
        else if (event.key === 'ArrowUp') {
            this.cursorUp()
        }
        else if (event.key === 'ArrowLeft') {
            this.cursorLeft()
        }
        else if (event.key === 'ArrowRight') {
            this.cursorRight()
        }
        // Enter
        else if (event.keyCode === 13) {
            this.newLine()
        }
        else {
            return
        }
    }

    private cursorDown(): void {
        // if not the last line
        if (this._text_list_after.length > 1) {
            this._text_list_before.push(<string>this._text_list_after.shift())
            // adjust cur position
            if (this._cur_position > this._text_list_after[0].length) {
                this._cur_position = this._text_list_after[0].length
            }
        }
    }

    private cursorUp(): void {
        // if not the first line
        if (this._text_list_before.length > 0) {
            this._text_list_after.unshift(<string>this._text_list_before.pop())
            // adjust cur position
            if (this._cur_position > this._text_list_after[0].length) {
                this._cur_position = this._text_list_after[0].length
            }
        }
    }

    private cursorLeft(): void {
        // if at the top of the line
        if (this._cur_position === 0) {
            // if not the first line
            if (this._text_list_before.length > 0) {
                this.cursorUp()
                this._cur_position = this._text_list_after[0].length
            }
        }
        else {
            this._cur_position = this._cur_position - 1
        }
    }

    private cursorRight(): void {
        // if at the end of the line
        if (this._cur_position === this._text_list_after[0].length) {
            // if not the last line
            if (this._text_list_after.length > 1) {
                this.cursorDown()
                this._cur_position = 0
            }
        }
        else {
            this._cur_position = this._cur_position + 1
        }
    }

    private newLine(): void {
        // cut current line into two parts
        this._text_list_before.push(this._text_list_after[0].substring(0, this._cur_position))
        this._text_list_after[0] = this._text_list_after[0].substring(this._cur_position)
        // reset cursor position
        this._cur_position = 0
    }
    
    /**
     * [y, x]
     */
    public get cursor_position(): [number, number] {
        let pos_y = this._text_list_before.length
        let pos_x = this._cur_position
        return [pos_y, pos_x]
    }

    public get text_rows(): string[] {
        return [...this._text_list_before, ...this._text_list_after]
    }
}