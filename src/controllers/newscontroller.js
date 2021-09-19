const axios = require("axios");
const { response } = require("express");
const api_key = "66b45054f09ccb85c9e78997eaa2a2da";
const news_key ="c4o5a4aad3ie88npo6p0";
const Stockmarket = require("../model/Stockmarket");
const { all } = require("../router");

//INCLUDES NEWS

const fetchStocks = async (first,second, newsthird) => {
    try {
        const res = await Promise.all([
            axios.get(first),
            axios.get(second),
            axios.get(newsthird)
        ]);
        const data = res.map((res)=> res.data);
const f1_name = data[0].name
const  f1 = data[0].exchange; //first api
const f1_share = data[0].shareOutstanding;
const f1_logo =data[0].logo;
const f1_ticker = data[0].ticker;
const f2 = data[1].sentiment; //second api
const f2_articles = data[1].buzz.articlesInLastWeek;
const f2_avg = data[1].sectorAverageNewsScore;
const f2_score = data[1].buzz.weeklyAverage;
//console.log(f1,f2)
return {
    f1: f1,  
    f1_share: f1_share,
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
        throw Error("News sentiment unable to load due to error")
        }      
}


exports.renderNewsPage = (req,res) => {
    res.render("news")
}


exports.getNews = async (req, res) => {
    const comp_symbol = req.body.comp_symbol;
   // console.log(req.body)
     const first_url = `https://finnhub.io/api/v1/stock/profile2?symbol=${comp_symbol}&token=${news_key}`
    const second_url = `https://finnhub.io/api/v1/news-sentiment?symbol=${comp_symbol}&token=${news_key}`
    const news_url = `https://finnhub.io/api/v1/company-news?symbol=${comp_symbol}&from=2021-03-01&to=2021-03-09&token=${news_key}`
    const company = new Stockmarket(req.body.comp_symbol);
    company.inputCheck() //prompt user to not leave the input empty

if (company.errors.length) {
    res.render("news", {
        error: company.errors.toString()
    })
}
else {
let resultStock = await fetchStocks(first_url, second_url, news_url);
res.render("news", {
    resultFirst: resultStock.f1,
    resultName: resultStock.f1_name,
    resultShare: resultStock.f1_share,
    resultLogo: resultStock.f1_logo,
    resultTicker: resultStock.f1_ticker,
    resultSecond: resultStock.f2,
    resultArticles: resultStock.f2_articles,
    resultScore: resultStock.f2_score,
    resultAvg: resultStock.f2_avg
})

    
}

}