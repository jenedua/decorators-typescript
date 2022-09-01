import  Entity, * as x   from "./Entity"
//import  Entity, { max}  from "./Entity"

export class Repository <T extends Entity>{
    list : T[]
    constructor(){
        console.log(x.max);
        this.list = []
    }

    add(element: T){
        this.list.push(element)
    }

}