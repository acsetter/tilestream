export class Tileswipe {
    constructor(tiles, index = 0) {
        this._tiles = tiles;
        this._index = index
        this._slides = [];
        this.build()
    }
    get tiles() { return this._tiles };
    get index() { return this._index };
    get slides() { return this._slides };

    set index(i) { this._index = i }

    addSlide(ele) {
        this._slides.push(ele)
    }

    build(){
        let n = 0
        let img;
        let slide;

        this.canvas = this.buildCanavas();
        document.body.appendChild(this.canvas)

        for(img of this.tiles){
            img.i = n
            n++
            slide = this.buildSlide(this.buildSlideImg(img));
            slide.titleEle = this.buildTitle(img.title);
            slide.appendChild(slide.titleEle);
            this.addSlide(slide)
            this.canvas.appendChild(slide)
        }

        this.fetchNeighbors()
    }

    buildCanavas() {
        let canvas = document.createElement('div');
        canvas.id = `ts${this.index}-canvas`;
        canvas.style.display = 'none';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.backgroundColor = 'rgba(0,0,0,0.8)'
        canvas.style.zIndex = '1';
        canvas.style.opacity = 0;
        canvas.style.transition = "opacity 0.3s linear"

        return canvas
    }

    buildTitle(s) {
        let title = document.createElement('div');
        title.style.position = 'absolute';
        title.style.top = '25px';
        title.style.width = '100vw';
        title.style.margin = '0 auto';
        title.style.paddingLeft = "5px";
        title.style.paddingRight = "5px";
        title.style.color = '#f1f1f1';
        title.style.textAlign = "center";
        title.style.fontSize = '1.5em';
        title.style.fontFamily = 'Arial, Helvetica, sans-serif';
        title.style.fontWeight = '500';
        title.style.textShadow = '0px 0px 4px rgba(1,1,1,0.85)';
        title.style.opacity = 1;
        title.style.transition = "opacity 0.2s linear";
        title.innerHTML = s;
        return title
    }

    buildSlide(ele) {
        let slide = document.createElement('div');
        slide.id = `ts${this.index}-slide${ele.i}`;
        slide.i = ele.i;
        slide.className = 'ts-slide';
        slide.style.display = 'grid';
        slide.style.position = 'fixed';
        slide.style.top = '0';
        slide.style.left = '0';
        slide.style.width = '100%';
        slide.style.height = '100%';
        slide.style.zIndex = '2';
        slide.style.alignContent = 'center';

        slide.onclick = function(e){
            if (e.target == slide){
                slide.parentElement.style.opacity = 0;
                setTimeout(function(){
                    slide.parentElement.style.display = "none"
                }, 310) 
            } else if (e.target == slide.firstChild) {
                if (slide.titleEle.style.opacity == 0) {
                    slide.titleEle.style.opacity = 1.0;
                } else {
                    slide.titleEle.style.opacity = 0;
                }
            }
        }

        let sX = 0
        let cX = 0
        let sY = 0
        let cY = 0
        let ts = this;

        slide.ondragstart = function(e){
            sX = e.clientX;
            sY = e.clientY;
            cX = 0;
            cY = 0;
            slide.style.transition = 'none';
            slide.next.style.transition = 'none';
            slide.prev.style.transition = 'none';
        }

        slide.ondragover = function(e) {
            cX = sX - e.clientX;
            cY = sY - e.clientY;
            slide.style.left = -cX + 'px'
            
            if (cX > 0) {
                slide.next.style.left = (window.innerWidth - cX) + 'px';
                slide.prev.style.left = (-window.innerWidth - cX) + 'px';
            } else if (cX < 0) {
                slide.prev.style.left = (-screen.width - cX) + 'px';
                slide.next.style.left = (window.innerWidth - cX) + 'px';
            } 
            
            if (cY > 0 && cY > cX) {
                slide.style.top = -cY + "px";
                slide.firstChild.style.transform = 
                    `scale(${Math.abs(1 - (cY/700))})`;
            }
            e.preventDefault();
        }

        slide.ondragend = function() {
            let tX = window.innerWidth / 8;
            let tY = window.innerHeight / 4;
            slide.style.transition = 'all .3s';
            slide.next.style.transition = 'all .3s';
            slide.prev.style.transition = 'all .3s';
            slide.parentElement.style.transition = 
            'opacity 0.3s linear';

            if(cX > tX) {
                slide.style.left = "-100vw";
                slide.next.style.left = "0";
                slide.prev.style.left = "-100vw";
                ts.active = slide.next.i;
                slide.firstChild.style.transform = 'none';
                slide.style.top = 0;
            } else if (cX < -tX) {
                slide.style.left = "100vw";
                slide.prev.style.left = "0";
                slide.next.style.left = "100vw";
                ts.active = slide.prev.i;
                slide.firstChild.style.transform = 'none';
                slide.style.top = 0;
            } else if (cY > tY) {
                slide.style.top = "-100vh"
                slide.parentElement.style.opacity = 0;
                setTimeout(function() {
                    slide.parentElement.style.display = "none";
                    slide.parentElement.style.opacity = 1;
                    slide.style.top = 0;
                    slide.firstChild.style.transform = 'none';                    
                }, 350)
            } else {
                slide.style.left = 0;
                slide.next.style.left = "100vw";
                slide.prev.style.left = "-100vw";
                slide.firstChild.style.transform = 'none';
                slide.style.top = 0;
            }
        }

        slide.ontouchstart = function(e) {
            sX = e.touches[0].clientX;
            sY = e.touches[0].clientY;
            cX = 0;
            cY = 0;
            slide.style.transition = 'none';
            slide.next.style.transition = 'none';
            slide.prev.style.transition = 'none';
        }

        slide.ontouchmove = function(e) {
            if(TouchList.length < 1) {
                cX = sX - e.touches[0].clientX;
                cY = sY - e.touches[0].clientY;
                slide.style.left = -cX + 'px'

                if (cX > 0) {
                    slide.next.style.left = (screen.width - cX) + 'px';
                    slide.prev.style.left = (-screen.width - cX) + 'px';
                } else if (cX < 0) {
                    slide.prev.style.left = (-screen.width - cX) + 'px';
                    slide.next.style.left = (screen.width - cX) + 'px';
                } 

                if (cY > 0 && cY > cX) {
                    slide.style.top = -cY + "px";
                    slide.firstChild.style.transform = 
                        `scale(${Math.abs(1 - (cY/700))})`;
                } else if (cY < 0) {
                    slide.next.style.display = 'none';
                    slide.prev.style.display = 'none';
                    slide.firstChild.style.transform = `scale(${1+ Math.abs(cY)/100})`
                }
            } else {
            }
            e.preventDefault();
        }

        slide.ontouchend = function() {
            let tX = window.innerWidth / 5
            let tY = window.innerHeight / 4
            slide.style.transition = 'all .3s';
            if (Math.abs(cX) > 10 || Math.abs(cY) > 10) {
                slide.next.style.transition = 'all .3s';
                slide.prev.style.transition = 'all .3s';
                slide.next.style.display = "grid";
                slide.prev.style.display = "grid";
            }
            slide.parentElement.style.transition = 
            'opacity 0.3s linear';
            if(cX > tX) {
                slide.style.left = "-100vw";
                slide.next.style.left = "0";
                ts.active = slide.next.i;
                slide.firstChild.style.transform = 'none';
                slide.style.top = 0;
            } else if (cX < -tX) {
                slide.style.left = "100vw";
                slide.prev.style.left = "0";
                ts.active = slide.prev.i;
                slide.firstChild.style.transform = 'none';
                slide.style.top = 0;
            } else if (cY > tY) {
                slide.style.top = "-100vh"
                slide.parentElement.style.opacity = 0;
                setTimeout(function() {
                    slide.parentElement.style.display = "none";
                    slide.parentElement.style.opacity = 1;
                    slide.style.top = 0;
                    slide.firstChild.style.transform = 'none';                    
                }, 350)
            } else {
                slide.style.left = 0;
                slide.next.style.left = "100vw";
                slide.prev.style.left = "-100vw";
                slide.firstChild.style.transform = 'none';
                slide.style.top = 0;
            }
        }

        slide.ontouchcancel = slide.ontouchend;
        slide.appendChild(ele);

        return slide
    }

    buildSlideImg(ele) {
        let slideImg = document.createElement('img');
        slideImg.id = `ts${this.index}-img${ele.i}`;
        slideImg.className = "ts-img";
        slideImg.i = ele.i;
        slideImg.src = ele.src;
        slideImg.style.maxWidth = '100vw';
        slideImg.style.maxHeight = '100vh';
        slideImg.style.alignSelf = 'center';
        slideImg.style.justifySelf = 'center';
        slideImg.style.userSelect = "none";
        slideImg.zIndex = -1;
        slideImg.style.cursor = 'all-scroll';

        return slideImg;
    }

    fetchNeighbors() {
        for (let ele of this.slides) {
            if (ele.nextElementSibling) {
                ele.next = ele.nextSibling;
            } else {
                ele.next = ele.parentElement.firstChild;
            }
    
            if (ele.previousElementSibling) {
                ele.prev = ele.previousSibling;
            } else {
                ele.prev = ele.parentElement.lastChild;
            }
        }
    }

    show(index) {
        this.canvas.style.display = "block";
        this.canvas.style.opacity = 1;
        for (let slide of this.slides){
            if (slide.i < index) {
                slide.style.left = "-100vw";
            }
            else if(slide.i > index) {
                slide.style.left = "100vw";
            } else {
                slide.style.left = "0";
                this.active = slide.i
            }
        }
    }

    resize() {
        for (let slide of this.slides) {
            if (slide.i < this.active) {
                slide.style.transition = "none";
                slide.style.left = "-100vw";
            } else if (slide.i > this.active) {
                slide.style.transition = "none";
                slide.style.left = "100vw";
            }
        }
    }
}