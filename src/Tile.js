var tileCount = 0;

export class Tile {
    constructor(src, title, alt) {
        this._src = src;
        this._title = title;
        this._alt = alt;
        this._i = tileCount;
        tileCount++;
        this._id = `tile${this._i}`;
        this._tile = this.build();
    }
    get tile() { return this._tile; }
    get src() {return this._src;}
    get title() {return this._title;}
    get alt() {return this._alt;}
    get i() {return this._i;}
    get id() {return this._id;}
    set id(val) {this._id = val;}

    build() {
        var tile = document.createElement("img");
        tile.src = this.src;
        tile.id, this.id = `tile${this.index}`
        tile.className = 'tile';
        tile.alt = this.alt;
        tile.title = this.title;
        tile.style.width = '100%';
        tileQueue.appendChild(tile);

        return tile
    }
}