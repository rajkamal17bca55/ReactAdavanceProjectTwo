import { Component } from "react";
import ChildClass from "./ChildClass";



class  Classcomponenet extends Component
{
    constructor()
    {
        super()
        this.state={count:30,count1:10};
    }
    render()
    {
        return(
            <div>
                <h1>parent{this.state.count}</h1>
               <ChildClass child={this.state.count} child1={this.state.count1} ></ChildClass>
            </div>
        )
    }

}
export default Classcomponenet;