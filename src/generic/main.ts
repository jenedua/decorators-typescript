import { Repository } from "./Repository";
import { Person2 } from "./Person2";

const persons2 = new Repository<Person2>()
persons2.add(new Person2("Bob White",60))
//persons2.add(new Book("Bible"))
console.log(persons2);
