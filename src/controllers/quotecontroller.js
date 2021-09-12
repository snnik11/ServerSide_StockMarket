const axios = require("axios");
const api_key = "66b45054f09ccb85c9e78997eaa2a2da";
const Quote = require("../model/Quote");
const { all } = require("../router");

exports.renderQuotePage = (req,res) => {
    res.render("index"); 
}

exports.getQuote = (req, res) => {
    const quoteSymbol = req.body.quoteSymbol;
    const url = `https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=${api_key}`
    //`https://financialmodelingprep.com/api/v3/quote/${quoteSymbol}?apikey=${api_key}`
    const companyQuote = new Quote(req.body.quoteSymbol);
    companyQuote.validateInput() //change var name

    if(companyQuote.errors.length) {
        res.render("index", {
            error: companyQuote.errors.toString()
        })
    }
    else {
        axios.get(url)
        .then((response) => {
       console.log(response)
        //  console.log(response.data.sector)
       // const {symbol : mySymbol} = response.data
         //  const {sector: mySector} = response.data
          res.render("index", {       
               symbol: ` ${quoteSymbol}` ,
            //   companyQuote: ` ${response.data.name}`, 
             //  period: `${response.data[0].period}`,
              // price : `${response.data[0].price} ` ,
              //   sector: ` ${response.data[0].sector} ` ,
               //  description : ` ${response.data[0].description}`
       }) 
    })
        .catch((error) => {
            console.log(error)
          })
    }
}
exports.renderProfilePage = (req,res) => {
    res.render("profile")
}

exports.getProfile = (req, res) => {
    res.render("profile")
}