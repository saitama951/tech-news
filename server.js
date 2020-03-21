const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('3706d5cc76c8405887f722ea6fd0140f');
var express = require('express');
var bodyparser=require('body-parser');
//app.use(bodyparser.urlencoded({extended:false}))


var app=express();
 var arr=[];
 var a=[];
 var search;
 var date = new Date();
// To query articles:

app.use(express.static("public"));

newsapi.v2.topHeadlines({
  q: '',
  category: 'technology',
  language: 'en',
  country: 'us'
}).then(response => {

   arr.push(response);

  });

app.get("/",function(req,res)
{
  res.render("homepage.ejs",{arr:arr});
})

app.get("/search",function(req,res)
{
  search=req.query.search;



 newsapi.v2.everything({
  q: ''.concat(search),
  sources: '',
  domains: '',
  from: date.toISOString().slice(0,10),
  to: date.toISOString().slice(0,10),
  language: 'en',
  sortBy: 'relevancy',
  //page: 2
}).then(response => {

  a.push(response)
});

  //res.render("search.ejs",{arr:a})
  setTimeout(function render(){ res.render("search.ejs",{arr:a})},5000);
  a=[];

})


app.listen(3000,function(){console.log("listening...")})








































































// To query sources:
/*newsapi.sources({
  category: 'technology', // optional
  language: 'en', // optional
  country: 'us' // optional
}).then(sourcesResponse => {
  console.log(sourcesResponse);

  /*
    {
      status: "ok",
      sources: [...]
    }
  
});*/
 
// For both methods you can also use traditional Node callback style:
/*newsapi.articles({
  source: 'associated-press',
  sortBy: 'top'
}, (err, articlesResponse) => {
  if (err) console.error(err);
  else console.log(articlesResponse);
});*/