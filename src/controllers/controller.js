const axios = require("axios");
const api_key = "66b45054f09ccb85c9e78997eaa2a2da";
const Stockmarket = require("../model/Stockmarket");
const { all } = require("../router");

exports.renderHomePage = (req,res) => {
    res.render("index");
}

exports.getStock = (req, res) => {
    const comp_symbol = req.body.comp_symbol;
    const url = `https://financialmodelingprep.com/api/v3/profile/${comp_symbol}?apikey=${api_key}`
        const all_url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${api_key}`
    const company = new Stockmarket(req.body.comp_symbol);
    company.validateUserInput() //change var name

    if(company.errors.length) {
        res.render("index", {
            error: company.errors.toString()
        })
    }
    else {
        axios.get(url)
            // ,{
        //     data:{
        //         symbol:"DOCU",
        //         sector: "Technology"
        //  }
        // })
        .then((response) => {
     //  console.log(response)
        //  console.log(response.data.sector)
       // const {symbol : mySymbol} = response.data
           const {sector: mySector} = response.data
            res.render("index", {
                company: ` ${response.data[0].companyName}`,
                symbol: ` ${comp_symbol}` , 
                price : `${response.data[0].price} ` ,
                 sector: ` ${response.data[0].sector} ` ,
                 description : ` ${response.data[0].description}`
        }
        )
        .catch((error) => {
            console.log(error)
        })

        // axios.get(all_url)
        // .then((response) => {console.log(response)})
        // .catch((error) => {
        //     console.log(error)
         })
    }
}
exports.renderProfilePage = (req,res) => {
    res.render("profile")
}