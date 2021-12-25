import express from 'express' ;
import { engine } from 'express-handlebars';
const app = express()
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/projet_node', { useNewUrlParser: true });

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String
});

app.engine('handlebars',engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.get('/views', (req, res) => {
  res.render('home', { msg : 'Handlebars are Cool!' });
})
// OUR MOCK ARRAY OF PROJECTS
let reviews = [
  { title: "Great Review", movieTitle: "Batman II" },
  { title: "Awesome Movie", movieTitle: "Titanic" }
]

// INDEX
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})
app.listen(3000);