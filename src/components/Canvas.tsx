import * as React from 'react';
import Ctx from '../services/Ctx';

interface Iprops {
  id: string
}

// interface Istate {
//   name: string
//   // ctx: any
// }

export default class Canvas extends React.Component<Iprops> {

  width: number;
  height: number;

  constructor(props: Iprops){
    super(props);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  componentDidMount(){
    Ctx.init(this.props.id);
    Ctx.drawRect({lineWidth:5});
    Ctx.drawRect({leftX:20,topY:20,lineColor:"#2986fc",backColor:"green",lineWidth:15});
    Ctx.drawRect({leftX:160,topY:160,lineColor:"#2986fc",backColor:"blue",lineWidth:35});
    // Ctx.drawSquaresRandom(3);
  }

  render() {
    // let {ctx} = this.state;
    return (
      <div className="canvasWrap" onMouseMove={(e)=>Ctx.showMouseCoords(e)}>
        <canvas 
        id={this.props.id} 
        height={innerHeight-25} 
        width={innerWidth-25} 
        onMouseMove={(e)=>Ctx.createRect(e)}
        onClick={(e)=>Ctx.createRect(e)}
        >
            Cannot load canvas
        </canvas>
        <div id="result"></div>
      </div>
    )
  }
}