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
