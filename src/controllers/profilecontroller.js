const axios = require("axios");
const { response } = require("express");
const news_key ="c4o5a4aad3ie88npo6p0";
const profile_key = "PgqE2u1cFdzIduJkEZy3XoUlHniBB7Mz";
const Stockmarket = require("../model/Stockmarket");
const { all } = require("../router");

//callback function for rendering results 

exports.getProfile = async (req,res) => {
    const comp_symbol = req.body.comp_symbol;
    const first_url = `https://finnhub.io/api/v1/stock/profile2?symbol=${comp_symbol}&token=${news_key}`
    const third_url = `https://api.polygon.io/v1/meta/symbols/${comp_symbol}/company?apiKey=${profile_key}`
    const company = new Stockmarket(req.body.comp_symbol);
    company.inputCheck(); //validating input
    

    if (company.errors.length) {
        res.render("profile", {
            error: company.errors.toString()
        })
    }
    else {
    let resultProfile = await fetchProfile(first_url, third_url);

    res.render("profile", {
        resultName: resultProfile.f1_name,
        resultTicker: resultProfile.f1_ticker,
        resultCountry: resultProfile.f1_country,
        resultIndustry: resultProfile.f1_industry,
        resultExchange: resultProfile.f1_exchange,
        resultCurrency: resultProfile.f1_currency,
        resultCeo: resultProfile.f3_ceo,
        resultHq: resultProfile.f3_hq,
        resultHqCountry: resultProfile.f3_hq_country,
        resultSimilar: resultProfile.f3_similar,
        resultDescription: resultProfile.f3_description,
       

    })
}
}
//Promise calls and the main logic
const fetchProfile = async (first,third) => {
    try {
        const res = await Promise.all([
            axios.get(first),
            axios.get(third)
        ]);
        const data = res.map((res)=> res.data);
        const f1_name = data[0].name;
        const f1_ticker = data[0].ticker;
        const f1_country = data[0].country;
        const f1_currency = data[0].currency;
        const f1_industry = data[0].finnhubIndustry;
        const f1_exchange = data[0].exchange;
        const f3_ceo = data[1].ceo;
        const f3_hq =data[1].hq_address;
        const f3_hq_country = data[1].hq_country;
        const f3_similar = data[1].similar;
        const f3_description = data[1].description;
       
        return {
            f1_name: f1_name,
            f1_ticker: f1_ticker,
            f1_country: f1_country,
            f1_industry: f1_industry,
            f1_currency: f1_currency,
            f1_exchange: f1_exchange,
            f3_ceo: f3_ceo,
            f3_hq: f3_hq,
            f3_hq_country: f3_hq_country,
            f3_similar: f3_similar,
            f3_description: f3_description,
           
        }
    }
    catch {
        throw Error("Profile unable to load due to error")
    }

}
exports.renderProfilePage = (req, res) => {
    res.render("profile")
}

