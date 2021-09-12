const axios = require("axios");
const api_key = "66b45054f09ccb85c9e78997eaa2a2da";
const Stockmarket = require("../model/Stockmarket");
const { all } = require("../router");

exports.renderHomePage = (req,res) => {
    res.render("index"); 
}

exports.getStock = (req, res) => {
    const comp_symbol = req.body.comp_symbol;
    const url = //`https://financialmodelingprep.com/api/v3/profile/${comp_symbol}?apikey=${api_key}`
    `https://financialmodelingprep.com/api/v3/quote/${comp_symbol}?apikey=${api_key}`
    const company = new Stockmarket(req.body.comp_symbol);
    company.validateUserInput() //change var name

    if(company.errors.length) {
        res.render("index", {
            error: company.errors.toString()
        })
    }
    else {
        axios.get(url)
        .then((response) => {
       console.log(response)
        //  console.log(response.data.sector)
       // const {symbol : mySymbol} = response.data
           const {sector: mySector} = response.data
            res.render("index", {
                company: ` ${response.data[0].companyName}`,
                symbol: ` ${comp_symbol}` , 
                price : `${response.data[0].price} ` ,
                 sector: ` ${response.data[0].sector} ` ,
                 description : ` ${response.data[0].description}`
        },   )
        .catch((error) => {
            console.log(error)})
          })
    }
}
exports.renderProfilePage = (req,res) => {
    res.render("profile")
}

exports.getProfile = (req, res) => {
//     const comp_profile_symbol = req.body.comp_profile_symbol;
//     const all_url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${api_key}`
//     const quote_url = `https://financialmodelingprep.com/api/v3/quote/${comp_profile_symbol}?apikey=${api_key}`
//  // console.log("this is comp symbol" , comp_profile_symbol)
//     const company_quote = new Stockmarket(req.body.comp_profile_symbol);
//     company_quote.validateUserInput() //change var name

//     if(company_quote.errors.length) {
//         res.render("profile", {
//             error: company_quote.errors.toString()
//         })
//     }
//     else {
//         axios.get(quote_url)        
//         .then((response) => {
//   //  console.log(response)
//     console.log("this is comp symbol" , comp_profile_symbol)
//         //  console.log(response.data.sector)          
//             res.render("profile", {
//                 company_quote: ` ${response.data[0].name}`,
//                 symbol: ` ${comp_profile_symbol}` , 
//                 price : `${response.data[0].price} ` ,
                 
//         },  )
//         .catch((error) => {
//             console.log(error)
//         })
//         })
//     }


const comp_symbol = req.body.comp_symbol;
const url = `https://financialmodelingprep.com/api/v3/profile/${comp_symbol}?apikey=${api_key}`
 //   `https://financialmodelingprep.com/api/v3/quote/${comp_symbol}?apikey=${api_key}`
const quote_url = `https://financialmodelingprep.com/api/v3/quote/${comp_symbol}?apikey=${api_key}`
 const company = new Stockmarket(req.body.comp_symbol);
company.validateUserInput() //change var name

if(company.errors.length) {
    res.render("profile", {
        error: company.errors.toString()
    })
}
else {
    axios.get(url)
    .then((response) => {
 //  console.log(response)
    //  console.log(response.data.sector)
   // const {symbol : mySymbol} = response.data
       const {sector: mySector} = response.data
        res.render("profile", {
            company: ` ${response.data[0].companyName}`,
            symbol: ` ${comp_symbol}` , 
            price : `${response.data[0].price} ` ,
             sector: ` ${response.data[0].sector} ` ,
             description : ` ${response.data[0].description}`
    },   )
    .catch((error) => {
        console.log(error)})
      })

      axios.get(quote_url)
    .then((response) => {
//   console.log(response)
    //  console.log(response.data.sector)
   // const {symbol : mySymbol} = response.data
       const {sector: mySector} = response.data
        res.render("profile", {
          
            symbol: ` ${comp_symbol}` , 
            price : `${response.data[0].price} ` ,
           
    } )})
    .catch((error) => {
        console.log(error)
      })
}
}
