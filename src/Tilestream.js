//* Tilestream Build 1.0.0 (Beta)
//* Developer: Aaron Csetter (Studio Nacho) May, 24, 2019
//* License: personal and experimental use only.
//* Commercial use prohibited without the consent of Aaron Csetter.
//* Developer's Email : aaron@csetter.com
//* Developer's Discord : imNACHO#0001
//*

import { Tileswipe } from './Tileswipe.js';

var streams = [];
var swipes = [];
var streamCount = 0;
var tileQueue = document.createElement('div');
var typeErr = new Map([
    ['bool', 'Boolean value expected as argument.'],
    ['str', 'String is expected as argument.'],
    ['num', 'Number value > 0 expected as argument.'],
    ['int', 'Number integer >= 1 expected as argument.'],
    ['obj', 'Object is expected as argument.'],
    ['arr', 'Array is expected as argument.']
]);

tileQueue.id = 'tileQueue';
tileQueue.setAttribute('style', 'display: none');
document.body.appendChild(tileQueue);
//Global event listener for Tilestream
window.onresize = function() {
    streams.forEach(function(ele) {
        ele.sizeReset();
    })
    swipes.forEach(function(ele) {
        ele.resize()
    });
}




export class Tilestream {
    constructor(tiles) {
        this.tiles = this.fetchTiles(tiles);
        this._tileCount = this.objectCount(this.tiles);
        this._target;
        this._index = streamCount;
        streamCount++;
        this._id = `tilestream${this._index}`;
        this.stream = this.init()
        // General settings:
        this._responsive = true;
        this._showSwipe = true;
        // Desktop View Attributes:
        this._rowImgMax = 4;
        this._rowRatioMax = 6.5;
        this._tileGap = 5;
        this._rowGap = 5;
        // Tablet View Attributes:
        this._tabTileGap = 4;
        this._tabRowGap = 4;
        this._tabRowImgMax = 3;
        this._tabRowRatioMax = 5;
        // Mobile View Attributes:
        this._mobRowImgMax = 2;
        this._mobRowRatioMax = 4;
        this._mobWidth = 500;
        this._tabWidth = 1000;
        this._mobTileGap = 3;
        this._mobRowGap = 3;
    }
    // Objects:
    get target() { return this._target; }
    get index() { return this._index; }
    get id() { return this._id }
    get tileCount() { return this._tileCount }
    // General Settings:
    get responsive() { return this._responsive; }
    get showSwipe() { return this._showSwipe; }
    // Desktop View:
    get rowImgMax() { return this._rowRatioMax; }
    get rowRatioMax() { return this._rowRatioMax; }
    get tileGap() { return this._tileGap; }
    get rowGap() { return this._rowGap; }
    // Mobile View:
    get mobWidth() { return this._mobWidth; }
    get mobRowImgMax() { return this._mobRowImgMax; }
    get mobRowRatioMax() { return this._mobRowRatioMax; }
    get mobTileGap() { return this._mobTileGap; }
    get mobRowGap() { return this._mobRowGap; }
    // Tablet View:
    get tabWidth() { return this._tabWidth; }
    get tabRowImgMax() { return this._tabRowImgMax; }
    get tabRowRatioMax() { return this._tabRowRatioMax; }
    get tabTileGap() { return this._tabTileGap; }
    get tabRowGap() { return this._tabRowGap; }
    get info() {
        return {
            'id' : this.id,
            'showSwipe' : this.showSwipe,
            'responsive' : this.responsive,
            'rowImgMax' : this.rowImgMax,
            'rowRatioMax' : this.rowRatioMax,
            'tileGap' : this.tileGap,
            'rowGap' : this.rowGap,
            'tabWidth' : this.tabWidth,
            'tabRowImgMax' : this.tabRowImgMax,
            'tabRowRatioMax' : this.tabRowRatioMax,
            'tabTileGap' : this.tabTileGap,
            'tabRowGap' : this.tabRowGap,
            'mobWidth' : this.mobWidth,
            'mobRowImgMax' : this.mobRowImgMax,
            'mobRowRatioMax' : this.mobRowRatioMax,
            'mobTileGap' : this.mobTileGap,
            'mobRowGap' : this.mobRowGap
        }
    }
    // Setters:
    set responsive(val) {
        try {
            if(typeof val === 'boolean') {
                this._responsive = val;
            } else {
                throw new TypeError(typeErr.get('bool'));
            }
        } catch(e){
            this._responsive = true;
            console.error(e);
        };
    }
    set showSwipe(val) {
        try {
            if(typeof val === 'boolean') {
                this._modalBox = val;
            } else {
                throw new TypeError(typeErr.get('bool'));
            }
        } catch(e) {
            console.error(e);
        };
    }
    set rowImgMax(val) {
        try {
            if(Number.isInteger(val) && val > 0) {
                this._rowImgMax = val;
            } else {
                throw new TypeError(typeErr.get('int'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set rowRatioMax(val) {
        try {
            if(typeof val === 'number' && val > 0) {
                this._rowRatioMax = val;
            } else {
                throw new TypeError(typeErr.get('num'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set mobWidth(val) {
        try {
            if(Number.isInteger(val) && val > 0) {
                this._mobWidth = val;
            } else {
                throw new TypeError(typeErr.get('int'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set mobRowImgMax(val) {
        try {
            if(Number.isInteger(val) && val > 0) {
                this._mobRowImgMax = val;
            } else {
                throw new TypeError(typeErr.get('int'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set mobRowRatioMax(val) {
        try {
            if(typeof val === 'number' && val > 0) {
                this._mobRowRatioMax = val;
            } else {
                throw new TypeError(typeErr.get('num'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set tabWidth(val) {
        try {
            if(Number.isInteger(val) && val > 0) {
                this._tabWidth = val;
            } else {
                throw new TypeError(typeErr.get('int'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set tabRowImgMax(val) {
        try {
            if(Number.isInteger(val) && val >= 1) {
                this._tabRowImgMax = val;
            } else {
                throw new TypeError(typeErr.get('int'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set tabRowRatioMax(val) {
        try {
            if(typeof val === 'number' && val > 0) {
                this._tabRowRatioMax = val;
            } else {
                throw new TypeError(typeErr.get('num'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set tileGap(val) {
        try {
            if(typeof val === 'number') {
                this._tileGap = val;
            } else {
                throw new TypeError(typeErr.get('num'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set rowGap(val) {
        try {
            if(typeof val === 'number') {
                this._rowGap = val;
            } else {
                throw new TypeError(typeErr.get('num'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set mobTileGap(val) {
        try {
            if(typeof val === 'number') {
                this._mobTileGap = val;
            } else {
                throw new TypeError(typeErr.get('num'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set mobRowGap(val) {
        try {
            if(typeof val === 'number') {
                this._mobRowGap = val;
            } else {
                throw new TypeError(typeErr.get('num'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set tabTileGap(val) {
        try {
            if(typeof val === 'number') {
                this._tabTileGap = val;
            } else {
                throw new TypeError(typeErr.get('num'));
            }
        } catch(e){
            console.error(e);
        };
    }
    set tabRowGap(val) {
        try {
            if(typeof val === 'number') {
                this._tabRowGap = val;
            } else {
                throw new TypeError(typeErr.get('num'));
            }
        } catch(e){
            console.error(e);
        };
    }

    // Responsive Builder Methods:
    ratioMax() {
        if(this.viewPort == 2){
            return this._rowRatioMax;
        } else if(this.viewPort == 1){
            return this._tabRowRatioMax;
        } else{
            return this._mobRowRatioMax;
        }
    }

    imgMax() {
        if(this.viewPort == 2){
            return this._rowImgMax;
        } else if(this.viewPort == 1){
            return this._tabRowImgMax;
        } else{
            return this._mobRowImgMax;
        }
    }

    tGap() {
        if(this.viewPort == 2){
            return this._tileGap;
        } else if(this.viewPort == 1){
            return this._tabTileGap;
        } else{
            return this._mobTileGap;
        }
    }

    rGap() {
        if(this.viewPort == 2){
            return this._rowGap;
        } else if(this.viewPort == 1){
            return this._tabRowGap;
        } else{
            return this._mobRowGap;
        }
    }

    fetchTiles(tiles) {
        let tileArr = [];
        for (let t of tiles) {
            tileArr.push(t.tile);
        }
        return tileArr
    }

    objectCount(obj) {
        if(Object.keys) {
            return Object.keys(obj).length;
        } else {
            var length = 0;
            for(var key in obj) {
                if(obj.hasOwnProperty(key)) {
                    ++length;
                }
            }
            return length;
        }
    }

    // Method for setting desktop mode layout variables.
    desktop(rowImgMax, rowRatioMax, tileGap, rowGap) {
        try {
            if(Number.isInteger(rowImgMax) && rowImgMax > 0) {
                this._rowImgMax = rowImgMax;
            } else {throw new TypeError(typeErr.get('int'));};
            if(typeof rowRatioMax == 'number' && rowRatioMax >= 0){
                this._rowRatioMax = rowRatioMax;
            } else {throw new TypeError(typeErr.get('num'));};
            if(typeof tileGap == 'number') {
                this._tileGap = tileGap;
            } else {throw new TypeError(typeErr.get('num'));};
            if(typeof rowGap == 'number') {
                this._rowGap = rowGap;
            } else if(!rowGap && rowGap !== 0) {
                this._rowGap = tileGap;
            } else {throw new TypeError(typeErr.get('num'));};
        } catch(e) {   
            console.error(e);
        };
    }
    //Method for setting mobile view layout:
    mobile(width, rowImgMax, rowRatioMax, tileGap, rowGap) {
        try {
            if(Number.isInteger(width) && width > 0) {
                this._mobWidth = width;
            } else {throw new TypeError(typeErr.get('int'));};
            if(Number.isInteger(rowImgMax) && rowImgMax > 0) {
                this._mobRowImgMax = rowImgMax;
            } else {throw new TypeError(typeErr.get('num'));};
            if(typeof rowRatioMax == 'number' && rowRatioMax >= 0){
                this._mobRowRatioMax = rowRatioMax;
            } else {throw new TypeError(typeErr.get('num'));};
            if(typeof tileGap == 'number') {
                this._mobTileGap = tileGap;
            } else {throw new TypeError(typeErr.get('num'));};
            if(typeof rowGap == 'number') {
                this._mobRowGap = rowGap;
            } else if(!rowGap && rowGap !== 0) {
                this._mobRowGap = tileGap;
            } else {throw new TypeError(typeErr.get('num'));};
        } catch(e) {   
            console.error(e);
        };
    }
    //Method for setting tablet view layout:
    tablet(width, rowImgMax, rowRatioMax, tileGap, rowGap) {
        try {
            if(Number.isInteger(width) && width > 0) {
                this._tabWidth = width;
            } else {throw new TypeError(typeErr.get('int'));};
            if(typeof rowImgMax == 'number' && rowImgMax >= 1) {
                this._tabRowImgMax = rowImgMax;
            } else {throw new TypeError(typeErr.get('num'));};
            if(typeof rowRatioMax == 'number' && rowRatioMax >= 0){
                this._tabRowRatioMax = rowRatioMax;
            } else {throw new TypeError(typeErr.get('num'));};
            if(typeof tileGap == 'number') {
                this._tabTileGap = tileGap;
            } else {throw new TypeError(typeErr.get('num'));};
            if(typeof rowGap == 'number') {
                this._tabRowGap = rowGap;
            } else if(!rowGap && rowGap !== 0) {
                this._tabRowGap = tileGap;
            } else {throw new TypeError(typeErr.get('num'));};
        } catch(e) {   
            console.error(e);
        };
    }
    // Creates the dom element for the instanced Tilestream:
    init() {
        let stream = document.createElement('div');
        stream.id = this.id;
        stream.className = 'tilestream';
        stream.setAttribute(
            'style', 'display: block; width: 100%; margin: 0');

        return stream;
    }
    // Renders the Tilestream object in the DOM:
    render(target) {
        target.appendChild(this.stream);
        if (this.responsive) {
            streams.push(this);
            this.viewPort = this.sizeListener();
        } else {
            this.viewPort = 2;
        }
        let loadCt = 0
        let ts = this;
        for (let tile of this.tiles) {
            tile.onload = function() {
                tile.sqr = tile.naturalWidth / tile.naturalHeight; 
                tile.fr = `${tile.sqr}fr`;
                loadCt++;
                if (loadCt == ts.tileCount) {
                    ts.build();
                    if(ts.showSwipe) { ts.swipe(); };
                }
            }
        }
    }
    // Builds the Tilestream object as DOM elements:
    build() {
        let rows = [this.createRow(0)];
        let buildCt = 0;
        let rowCt = 0
        let ratioCt = 0
        let imgCt = 0
        let ratioMax = this.ratioMax();
        let imgMax = this.imgMax();
        for (let tile of this.tiles) {
            ratioCt += tile.sqr;
            if (imgCt < imgMax && ratioCt <= ratioMax) {
                rows[rowCt].fr += ' ' + tile.fr;
                rows[rowCt].appendChild(tile);
                rows[rowCt].len += 1;
                imgCt++;
            } else {
                rowCt++;
                rows.push(this.createRow(rowCt));
                rows[rowCt].appendChild(tile);
                rows[rowCt].fr = ' ' + tile.fr;
                rows[rowCt].len = 1;
                imgCt = 1;
                ratioCt = tile.sqr;
            }
            buildCt++;
            if (buildCt == this.tileCount) {
                this.streamBuilder(rows);
            }
        }
    }
    // Creates a new row for the builder:
    createRow(i) {
        let row = document.createElement('div');
        row.i = i;
        row.id = `ts${this.index}_row${i}`;
        row.className = 'tilerow';
        row.fr = '';
        row.len = 0
        return row;
    }
    // Moves rows to the tilestream DOM element:
    streamBuilder(rows) {
        for (let row of rows) {
            if (row.len == 1) {
                row.fr = '1fr';
            }
            row.style.display = 'grid';
            row.style.gridTemplateColumns = row.fr;
            row.style.gridGap = this.tGap()+'px';
            row.style.paddingBottom = this.rGap()+'px';
            row.style.boxSizing = 'border-box';
            row.style.margin = '0 auto';
            row.style.width = '100%';
            row.style.gridGap = this.tGap()+'px';
            row.style.paddingBottom = this.rGap()+'px';
            this.stream.appendChild(row);
        }
    }
    // Returns an integer to represent a change in stream width:
    sizeListener() {
        let x = this.stream.offsetWidth == 0 ? document.body.offsetWidth : this.stream.offsetWidth;

        if(x <= this.mobWidth){
            return 0; //Mobile view
        } else if(x <= this.tabWidth){
            return 1; //Tablet view
        } else{
            return 2; //Desktop view
        }
    }
    // Modifies viewPort attribute when view mode needs to change:
    sizeReset() {
        if(this.viewPort != this.sizeListener()){
            this.viewPort = this.sizeListener();
            this.streamReset();
        };
    }
    // Breaks down the stream in the DOM and rebuilds (for responsive):
    streamReset() {
        for (let t of this.tiles) {
            tileQueue.appendChild(t)
        }
        while(this.stream.firstChild) {
            this.stream.removeChild(this.stream.firstChild);
        };
        this.build();
    }
    // Instnaces a TileSwipe to preview tiles:
    swipe() {
        let newSwipe = new Tileswipe(this.tiles, this.index);
        swipes.push(newSwipe);
        for (let tile of this.tiles) {
            tile.onclick = function() {
                newSwipe.show(tile.i);
            }
        }
    }
}