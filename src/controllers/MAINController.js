
const axios = require("axios");
const { response } = require("express");
const api_key = "66b45054f09ccb85c9e78997eaa2a2da";
const news_key ="c4o5a4aad3ie88npo6p0";
const Stockmarket = require("../model/Stockmarket");
const { all } = require("../router");

exports.renderHomePage = (req,res) => {
    res.render("index"); 
}

exports.getStock = async (req, res) => {
    res.render("index"); 
}



//reduce const
const fetchNews = async (second,third) => {

    try {
        const res = await Promise.all([
            axios.get(third),
            axios.get(second)
        ]);
        const data = res.map((res)=> res.data);

const  f1 = data[1].sentiment; //first api
const f2 = data[0].employees //second api
//console.log(f1,f2)
return {
    f1: f1,
    f2: f2,
   
}
    }
    catch{
        throw Error("keep trying")
    }      
}

const fetchStocks = async (first,second) => {

    try {
        const res = await Promise.all([
            axios.get(first),
            axios.get(second)
        ]);
        const data = res.map((res)=> res.data);
const f1_name = data[0].name
const  f1 = data[0].exchange; //first api
const f1_country = data[0].country;
const f1_currency = data[0].currency;
const f1_industry = data[0].finnhubIndustry;
const f1_logo =data[0].logo;
const f1_ticker = data[0].ticker;
const f2 = data[1].sentiment; //second api
const f2_articles = data[1].buzz.articlesInLastWeek;
const f2_avg = data[1].sectorAverageNewsScore;
const f2_score = data[1].buzz.weeklyAverage
//console.log(f1,f2)
return {
    f1: f1,  
    f1_country: f1_country,
    f1_industry: f1_industry,
    f1_currency: f1_currency,
    f1_logo: f1_logo,
    f1_name: f1_name,
    f1_ticker: f1_ticker,
    f2: f2,
    f2_articles: f2_articles,
    f2_score: f2_score,
    f2_avg: f2_avg
}
    }
    catch{
        throw Error("keep trying")
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
exports.getNews = async (req, res) => {
    const comp_symbol = req.body.comp_symbol;
   // console.log(req.body)
    //const first_url = `https://financialmodelingprep.com/api/v3/profile/${comp_symbol}?apikey=${api_key}`
    const first_url = `https://finnhub.io/api/v1/stock/profile2?symbol=${comp_symbol}&token=${news_key}`
    const second_url = `https://finnhub.io/api/v1/news-sentiment?symbol=${comp_symbol}&token=${news_key}`
   const third_url =   `https://api.polygon.io/v1/meta/symbols/${comp_symbol}/company?apiKey=PgqE2u1cFdzIduJkEZy3XoUlHniBB7Mz`
    //`https://financialmodelingprep.com/api/v3/quote/${comp_symbol}?apikey=${api_key}`
    const company = new Stockmarket(req.body.comp_symbol);
    company.inputCheck() //prompt user to not leave the input empty
    


let resultStock = await fetchStocks(first_url, second_url);
res.render("news", {
    resultFirst: resultStock.f1,
    resultName: resultStock.f1_name,
    resultCountry: resultStock.f1_country,
    resultCurrency: resultStock.f1_currency,
    resultLogo: resultStock.f1_logo,
    resultIndustry: resultStock.f1_industry,
    resultTicker: resultStock.f1_ticker,
    resultSecond: resultStock.f2,
    resultArticles: resultStock.f2_articles,
    resultScore: resultStock.f2_score,
    resultAvg: resultStock.f2_score
    

})
let result = await fetchNews(second_url,third_url);
    
}

