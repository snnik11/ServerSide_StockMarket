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
    
    const url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${api_key}`
  axios.get(url).then((res)=> {
      console.log(res)
      res.render("index", {
         result:  res.data
      }); 
  }).catch((err)=> {
      console.log(err)
  })
   
}


exports.renderProfilePage = (req,res) => {
    res.render("profile")
}
exports.renderNewsPage = (req,res) => {
    res.render("news")
}


