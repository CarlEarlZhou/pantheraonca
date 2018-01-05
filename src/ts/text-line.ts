import * as _ from 'lodash'

export class TextRow {
    private _cur_position: number

    constructor(private _row_str: string, tab_len: number) {
        let convert_space = ''
        for (let i = 0; i < tab_len; i++) {
            convert_space = convert_space + ' '            
        }
        this._row_str = _row_str.replace(/\t/g, convert_space)
        this._cur_position = 0
    }

    public get len(): number {
        return this._row_str.length
    }

    public get cur_position(): number {
        return this._cur_position
    }

    public set cur_position(pos: number) {
        if (pos >= this._row_str.length || pos < 0) {
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


export class TextList {
    private _tab_len: number
    private _text_list: TextRow[]
    private _cur_line: number

    constructor(raw_str: string, tab_len=4) {
        this._text_list = raw_str.split('\n').map(row_str => new TextRow(row_str, tab_len))
        this._tab_len = tab_len
        this._cur_line = 0
    }

    public cursorDown(): void {
        if (this._cur_line < this._text_list.length - 1) {
            this._cur_line = this.cur_line + 1
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
        if (this._text_list[this._cur_line].cur_position === 0) {
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
        if (this._text_list[this._cur_line].cur_position === this._text_list[this._cur_line].len) {
            if (this._cur_line !== this._text_list.length - 1) {
                this.cursorDown()
                this._text_list[this._cur_line].cur_position = 0
            }
        }
        else {
            this._text_list[this._cur_line].cur_position = this._text_list[this._cur_line].cur_position + 1
        }
    }
    
    public get cur_line(): number {
        return this._cur_line
    }

    public get text_rows(): TextRow[] {
        return this._text_list
    }
    
}