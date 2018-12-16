import { MouseEvent } from "react";

interface IShape {
    leftX?: number;
    topY?: number;
    lineWidth?: number;
    lineColor?: string;
    backColor?: string;
}

interface IRect extends IShape {
    width?: number; 
    height?: number;
}

abstract class Shape implements IShape {
    public static countShape: number = 0;
    public id: number | string;
    constructor(
        public leftX:number, 
        public topY:number, 
        public lineWidth:number, 
        public lineColor:string, 
        public backColor:string
        ) {   
        Shape.countShape++;
        let random = Math.random()*Math.random()+Shape.countShape;
        this.id = `id_${random.toString()}.${Shape.countShape}`;
    }
}

class Rect extends Shape implements IRect {
    public static countRect: number = 0;
    public rightX: number;
    public bottomY: number;
    constructor(
        public width:number, 
        public height:number, 
        public leftX:number, 
        public topY:number, 
        public lineWidth:number, 
        public lineColor:string, 
        public backColor:string
        ) {
        super(leftX,topY,lineWidth,lineColor,backColor);
        Rect.countRect++;
        this.bottomY = topY+height;
        this.rightX = leftX+width;

        if(this.lineWidth>this.width || this.lineWidth>this.height) {
            throw new RangeError("Толщина линии не может быть больше площади прямоугольника");
        }
    }
}

// class Ellipse extends Shape {
//     public static countEllipse: number = 0;
//     constructor(
//         _leftX:number, 
//         _rightX:number, 
//         _topY:number, 
//         _bottomY:number, 
//         _type:string="ellipse"){
//         Ellipse.countEllipse++;
//         super(_leftX,_rightX,_topY,_bottomY,_type);
//     }
// }

//-------------------------------------------------------------------------

export default class Ctx {

    private static canvas: any;
    private static ctx: any;
    public static width: number; //canvas width
    public static height: number; //canvas height
    public static centerX: number; //center canvas horizontal
    public static centerY: number; //center canvas vertical
    public static shapes: Shape[] = [];

    public static init(_id:string): void {        
        this.canvas = document.getElementById(_id);
        this.ctx = Ctx.canvas.getContext('2d');
        this.width = Ctx.ctx.width;
        this.height = Ctx.ctx.height;
        this.centerX = Ctx.ctx.width/2;
        this.centerY = Ctx.ctx.height/2;
    }
    /**
     * drawRect
     * Рисует Прямоугольник
     */
    public static drawRect({
        leftX = 0, 
        topY = 0, 
        width = 50, 
        height = 50, 
        lineWidth = 2, 
        lineColor = "black", 
        backColor = "orange"
    }: IRect = {}) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = lineColor;
        this.ctx.fillStyle = backColor;
        this.ctx.fillRect(leftX,topY,width,height);
            try {
                Ctx.shapes.push(new Rect(width,height,leftX,topY,lineWidth,lineColor,backColor));
                this.ctx.lineWidth = lineWidth;
                this.ctx.strokeRect(leftX,topY,width,height);
            } 
            catch (e) {
                Ctx.shapes.push(new Rect(width,height,leftX,topY,2,lineColor,backColor));
                console.log(e);         
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(leftX,topY,width,height);
            }
        this.ctx.stroke();
        // console.log(this.shapes);
    }
    /**
     * drawSquares
     * Рисует Прямоугольники рандомно
     */
    // public static drawSquaresRandom(count:number=2) {
    //     for(let i=0;i<count;i++){
    //         const randomX = Math.ceil(Math.random()*10)*i+i;
    //         const randomY = Math.ceil(Math.random()*10)*i+i;
    //         const checkOutOfX = randomX>Ctx.width || randomX<0;
    //         const checkOutOfY = randomX>Ctx.height || randomY<0;
    //         const x = checkOutOfX ? randomX-Ctx.centerX : randomX;
    //         const y = checkOutOfY ? randomX-Ctx.centerY : randomY;
    //         this.drawRect({x,y});
    //         // console.log(randomX,randomY);
    //     }
    // }

    /*
     ******** Events
    */

    /**
     * 
     * show Mouse Coordinates
     */

    public static showMouseCoords(e:MouseEvent): void {
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        document.getElementById("result").innerText = `X: ${mouseX} | Y: ${mouseY}`;
    }
        /**
     * 
     * Click to select Shape
     */
    public static selectShape(e:MouseEvent): void {
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        // for(let {leftX,rightX,topY,bottomY,width,height} of this.shapes){
        //     let checkMouseIn: boolean = mouseX>leftX && mouseX<rightX && mouseY>topY && mouseY<bottomY;
        //     if(checkMouseIn){
        //         this.ctx.fillRect(leftX,topY,width,height);
        //     }
        // }
    }

    public static createRect(e:MouseEvent): void {
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        if(e.buttons===1 && e.type==="mousemove"){
            this.drawRect({topY:mouseY, leftX:mouseX});
            console.log(e.type)
        }
        if(e.type==="click"){
            this.drawRect({topY:mouseY, leftX:mouseX});
            console.log(e.type)
        }
    }

    // public static animateShape(e:MouseEvent): void {

    // }
}
