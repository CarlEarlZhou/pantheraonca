import * as _ from 'lodash'

class TextRow {
    private _cur_position: number

    constructor(private _row_str: string, tab_len: number) {
        // convert a tab to some spaces
        let convert_space = ''
        for (let i = 0; i < tab_len; i++) {
            convert_space = convert_space + ' '            
        }
        this._row_str = _row_str.replace(/\t/g, convert_space)
        // init cursor position
        this._cur_position = 0
    }

    public get len(): number {
        return this._row_str.length
    }

    public get cur_position(): number {
        return this._cur_position
    }

    /**
     * cur_position should only be set by TextList
     */
    public set cur_position(pos: number) {
        if (pos >= this._row_str.length || pos < 0) {
            // could be _row_str.length because the cursor may be at the end of the line
            this._cur_position = this._row_str.length
        }
        else {
            this._cur_position = pos
        }
    }

    public get row_str(): string {
        return this._row_str
    }
}


export default class TextList {
    private _tab_len: number
    private _text_list: TextRow[]
    private _cur_line: number

    constructor(raw_str: string, tab_len=4) {
        // split input str by \n
        this._text_list = raw_str.split('\n').map(row_str => new TextRow(row_str, tab_len))
        this._tab_len = tab_len
        // init cursor position
        this._cur_line = 0
    }

    public cursorDown(): void {
        if (this._cur_line < this._text_list.length - 1) {
            this._cur_line = this._cur_line + 1
            this._text_list[this._cur_line].cur_position = this._text_list[this._cur_line - 1].cur_position
        }
    }

    public cursorUp(): void {
        if (this._cur_line > 0) {
            this._cur_line = this._cur_line - 1
            this._text_list[this._cur_line].cur_position = this._text_list[this._cur_line + 1].cur_position
        }
    }

    public cursorLeft(): void {
        // if at the top of the line
        if (this._text_list[this._cur_line].cur_position === 0) {
            // if not the first line
            if (this._cur_line !== 0) {
                this.cursorUp()
                this._text_list[this._cur_line].cur_position = -1
            }
        }
        else {
            this._text_list[this._cur_line].cur_position = this._text_list[this._cur_line].cur_position - 1
        }
    }

    public cursorRight(): void {
        // if at the end of the line
        if (this._text_list[this._cur_line].cur_position === this._text_list[this._cur_line].len) {
            // if not the last line
            if (this._cur_line !== this._text_list.length - 1) {
                this.cursorDown()
                this._text_list[this._cur_line].cur_position = 0
            }
        }
        else {
            this._text_list[this._cur_line].cur_position = this._text_list[this._cur_line].cur_position + 1
        }
    }
    
    /**
     * [y, x]
     */
    public get cursor_position(): [number, number] {
        let pos_x = this._cur_line
        let pos_y = this._text_list[this._cur_line].cur_position
        return [pos_x, pos_y]
    }

    public get text_rows(): TextRow[] {
        return this._text_list
    }

    public row_str(index: number): string {
        return this._text_list[index].row_str
    }
    
}