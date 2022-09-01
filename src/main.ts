class Person{
    name: string;
    age: number
    constructor(name: string, age:number){
        this.name =name;
        this.age = age;

    }
}
 const person = new Person('Vann Leunon', 45);
 console.log(person);

 class BaseClass {
    constructor(id: number){

    }
 }

 interface  Item {
    description : string;
    price: number;
    calculTax () : number
    
}

class RealItem  extends BaseClass implements Item {
    id: number;
    description: string;
    price: number;

    constructor(descripton: string, price:number){
        super(100);
        this.id =Math.random()
        this.description = descripton;
        this.price = price

    }
     
    calculTax(): number {
        return this.price * 0.3
    }
    
 }


//  abstract class Item {
//     description : string;
//     price: number;
//     constructor(descripton: string, price:number){
//         this.description = descripton;
//         this.price = price

//     }

//     calculateTax(){
//         return this.price * this.getTax()
//     }

//     abstract getTax(): number;
//  }

//  class RealItem extends Item {
//     getTax(): number {
//         return  0.4
//     }
//  }
//   const item = new RealItem("Livro" ,100)
//   console.log(item.calculateTax());
  const item = new RealItem("Livro" ,100)
  console.log(item.calculTax());

