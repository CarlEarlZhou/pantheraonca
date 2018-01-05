import * as _ from 'lodash'

class TextRow {
    public cur_edit: number|boolean

    constructor(public row_str: string, tab_len: number) {
        _.map(row_str, function(ch) {
            if (ch === '\t') {
                return (new Array<string>(tab_len)).map(() => ' ')
            }
            else {
                return ch
            }
        })
        this.cur_edit = 0
    }
}


export default class TextList {
    private _tab_len: number
    private _text_list: TextRow[]
    private _cur_line: number

    constructor(raw_str: string, tab_len=4) {
        this._text_list = raw_str.split('\n').map(row_str => new TextRow(row_str, tab_len))
        this._tab_len = tab_len
        this._cur_line = 0
    }
    
    public get cur_line(): number {
        return this._cur_line
    }
    
}