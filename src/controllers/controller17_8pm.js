const axios = require("axios");
const { response } = require("express");
const api_key = "66b45054f09ccb85c9e78997eaa2a2da";
const news_key ="c4o5a4aad3ie88npo6p0";
const Stockmarket = require("../model/Stockmarket");
const { all } = require("../router");

exports.renderHomePage = (req,res) => {
    res.render("index"); 
}

exports.getStock = (req, res) => {
    const comp_symbol = req.body.comp_symbol;
   // console.log(req.body)
    const url = `https://financialmodelingprep.com/api/v3/profile/${comp_symbol}?apikey=${api_key}`
    const second_url = `https://finnhub.io/api/v1/news-sentiment?symbol=${comp_symbol}&token=${news_key}`
   
    //`https://financialmodelingprep.com/api/v3/quote/${comp_symbol}?apikey=${api_key}`
    const company = new Stockmarket(req.body.comp_symbol);
    company.inputCheck() //prompt user to not leave the input empty
    
    if(company.errors.length) {
        res.render("index", {
            error: company.errors.toString()
        })
    }
    else {
       async function makeReq()  {
            const object1 = axios.get(url);
            console.log(object1)
                const object2= await  axios.get(second_url);
                axios.all([object1,object2]).then(axios.spread((...responses)=> {
                    const response_Object1 = responses[0];
                    const response_Object2 = responses[1];
                //  console.log(response_Object1);
                 // console.log(response_Object2 +" second")
                }))
        
               
                .catch((error) => {
                    console.log(error)
                  })
        }
        makeReq();
    }
    
}
exports.renderProfilePage = (req,res) => {
    res.render("profile")
}
exports.renderNewsPage = (req,res) => {
    res.render("news")
}


exports.getProfile = (req, res) => {
    const comp_symbol = req.body.comp_symbol;
   // console.log(req.body)
    const url = `https://financialmodelingprep.com/api/v3/quote/${comp_symbol}?apikey=${api_key}`
    const second_url = `https://finnhub.io/api/v1/news-sentiment?symbol=${comp_symbol}&token=${news_key}`
 // console.log(url)
 //  const obj3 = 
    const company = new Stockmarket(req.body.comp_symbol);
    company.inputCheck();

    if(company.errors.length) {
        res.render("profile", {
            error: company.errors.toString()
        })
    }
    //compare url responses
    else {
        axios.get(url)
        .then((response) => {
     //  console.log(response)
      res.render("profile", {
                company: ` ${response.data[0].name}`,
               symbol: ` ${comp_symbol}` , 
               price : `${response.data[0].price} ` ,
               exchange: `${response.data[0].exchange}`
               
       }) 
    })
        .catch((error) => {
            console.log(error)
          })
    }
}
exports.getNews = (req,res) => {
    const comp_symbol = req.body.comp_symbol;
    const url = `https://finnhub.io/api/v1/news-sentiment?symbol=${comp_symbol}&token=${news_key}`
   
    const company = new Stockmarket(req.body.comp_symbol);
    company.inputCheck();
    if(company.errors.length) {
        res.render("news", {
            error: company.errors.toString()
        })
    }
    else {
        axios.get(url).then((response) => {
         //   const ob2 = response
          //  console.log(ob2);
            console.log(response.data.sentiment)
            res.render("news", {
                symbol: `${comp_symbol}`,
                bearish: `${response.data.sentiment.bearishPercent}`,
                bullish: `${response.data.sentiment.bullishPercent}`
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}