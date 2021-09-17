const axios = require("axios");
const api_key = "66b45054f09ccb85c9e78997eaa2a2da";
const NewsSentiment = require("../model/NewsSentiment");
const { all } = require("../router");

exports.renderNewsPage = (req,res) => {
    res.render("news");
}

exports.getNews = (req, res) => {
    const dynamicNews = req.body.dynamicNews;
    //console.log(api_key);
   // console.log(req.body);
    //console.log(dynamicNews);
    const news_url = //`https://financialmodelingprep.com/api/v3/profile/${comp_symbol}?apikey=${api_key}`
    `https://financialmodelingprep.com/api/v3/quote/${dynamicNews}?apikey=${api_key}`
    const companyNews = new NewsSentiment(req.body.dynamicNews);
    companyNews.validateInput() //change var name

    if(companyNews.errors.length) {
        res.render("news", {
            error: companyNews.errors.toString()
        })
    }
    else {
        axios.get(news_url)
        .then((response) => {
     console.log(response)
        //  console.log(response.data.sector)
         res.render("news", {
                // company: ` ${response.data[0].companyName}`,
               symbol: ` ${dynamicNews}` ,
            //    price : `${response.data[0].price} ` ,

       }   ) })
        .catch((error) => {
            console.log(error)
          })
    }
}
// exports.renderProfilePage = (req,res) => {
//     res.render("new")
// }

// exports.getProfile = (req, res) => {
//     res.render("news")
// }

