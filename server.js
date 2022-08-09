const { query } = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.get('/api/quotes/random', (req, res, next) => {
  res.status(200).send({
    quote: getRandomElement(quotes)
  })
})

app.get('/api/quotes', (req, res) => {
  if(req.query.person !== undefined){
    const quotesPerson = quotes.filter(quote => quote.person === req.query.person)
    res.send({
      quotes: quotesPerson
    })
  } else {
    res.send({
      quotes: quotes
    });
  }
});

app.post('/api/quotes', (req, res) => {
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person
  };
  
  if(req.query.quote && req.query.person){
    quotes.push(newQuote)
    res.send({
      quote: newQuote
    })
  } else {
    res.status(400).send();
  }
}) 

app.listen(PORT, () => {
  console.log(`Sever listen at port ${PORT}`)
});