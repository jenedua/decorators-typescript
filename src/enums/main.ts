import { Categories } from "./Categories";
import Movie from "./Movie"

 console.log(Categories.Programing);
 console.log(Categories.Science);
 console.log(Categories.Entertainment);

 const movie = new Movie("Homme Aranha", Categories.Entertainment);
 console.log(movie);