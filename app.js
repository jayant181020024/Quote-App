const express=require("express");

const https=require("https");

const app=express();

app.use(express.static("public"));

app.set('view engine', 'ejs');

const startingQuote="Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.";

const startingAuthor="Buddha";

app.get("/",function(req,res){

    res.render("index",{Quote :startingQuote,Author: startingAuthor});
    
});

app.post("/",function(req,res){

    const url="https://api.quotable.io/random";
    https.get(url,function(response){
        response.on("data",function(data){
            const quote=JSON.parse(data);
            const quoteData=quote.content;
            const quoteAuthor=quote.author;
            res.render("index",{Quote:quoteData,Author:quoteAuthor});
        });
    });
    

});


app.listen(3000,function(){
    console.log("server started");
});