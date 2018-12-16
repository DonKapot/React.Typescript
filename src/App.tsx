import * as React from "react";

//components
import Canvas from "./components/Canvas";
// import Hello from "./components/Hello";
// import CleanReact from "./components/CleanReact";

interface IState {
    id: string;
  }
//   export default class App extends React.Component<propsInterface, Interface, ...others> {

export default class App extends React.Component<{}, IState> {

    public state: IState;

    constructor(props:any){
        super(props);
        this.state = {id: "myCanvas"}
    }

    render() {
        return (
            <div className="wrapper">
                <Canvas id={this.state.id}/>
            </div>
        );
    }
}