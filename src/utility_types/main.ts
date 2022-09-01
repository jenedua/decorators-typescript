interface Todo{
    priority: number
    description: string
    done: boolean 
}
 const todo: Partial<Todo> =  {
    
    description: "todo 1",
    done: false


 }
 console.log(todo);