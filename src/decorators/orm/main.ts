 import pgp from "pg-promise";
 interface Connection{
    query(statement: string, params: any): Promise<any>
    close(): Promise<void>
 }

 class PostgreSQLConnection implements Connection{
    pgp: any
        constructor(){
            this.pgp = pgp()("postgres://postgres:postInfo84@localhost:5432/app")
        }

     query(statement: string, params: any): Promise<any> {
         return this.pgp.query(statement, params)
     }

     close(): Promise<void> {
         return this.pgp.$pool.end()
     }
    
 }

class ORM{
    constructor (readonly connection: Connection){

    }

    async save(entity: Entity){
        //console.log(entity.schema,entity.table,entity.columns);
        const columns = entity.columns.map(column => column.column).join(",")
        const params = entity.columns.map(( column, index) => `$${index + 1}`).join(",")
        const values = entity.columns.map(column => entity[column.property])
        const statement = `insert into ${entity.schema}.${entity.table} (${columns}) values (${params})`
        this.connection.query(statement, [...values])

        // console.log(columns);
        // console.log(params);
        // console.log(values);
        //console.log(entity.schema,entity.table);
         //const params: any[] =[]
         //this.connection.query(`insert into ${entity.schema}.${entity.table}`, params)

         //this.connection.query("insert into book(title, author) values($1, $2)", ["Clean Code", "Robert Martin"])

    }

    async list( entity : Function){
        // const books = await this.connection.query("select * from branas.book", [])
        // const cars = await this.connection.query("select * from branas.car", [])
        // return [...books, ...cars]
        return this.connection.query(`select * from ${entity.prototype.schema}.${entity.prototype.table}`, [])
    }
}

class Entity{
    declare schema: string
    declare table: string
    declare columns: { property: string, column: string}[]
    [key: string]: any

}

function entity(config: {schema: string, table: string}){
    return ( constructor: Function) => {
        // console.log(constructor);
        constructor.prototype.schema = config.schema
        constructor.prototype.table = config.table

    }
}

function column (config: {name: string}) {
    return (target: Entity, propertykey: string) => {
        target.columns = target.columns || []
        target.columns.push({ property: propertykey, column: config.name})

    }
}

@entity({schema: "branas", table: "book"})
class Book extends Entity {
    @column({name: "title"})
    title: string;
    @column({name: "author"})
    author:string;
    constructor(title: string, author: string){
        super();
        this.title = title;
        this.author = author;
    }
}
@entity({ schema: "branas", table: "car"})
class Car extends Entity{
    @column({ name: "br"})
    brand: string;
    @column({ name: "md"})
    model: string;
    constructor(brand: string, model: string){
        super()
        this.brand = brand
        this.model = model
    }

}

async function init () {

    const connection = new PostgreSQLConnection()
    const orm = new ORM(connection)
    const book = new Book("Clean Code", "Robert Martin")
    await orm.save(book)
    const books = await orm.list(Book)
    console.log(books);


    const car = new Car("Corsa", "Hatch")
    await orm.save(car)
    const cars = await orm.list(Car)
    console.log(cars);
    await connection.close()
}
 init()
