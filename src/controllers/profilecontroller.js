const axios = require("axios");
const { response } = require("express");
const news_key ="c4o5a4aad3ie88npo6p0";
const profile_key = "PgqE2u1cFdzIduJkEZy3XoUlHniBB7Mz";
const Stockmarket = require("../model/Stockmarket");
const { all } = require("../router");

exports.getProfile = async (req,res) => {
    const comp_symbol = req.body.comp_symbol;
    const first_url = `https://finnhub.io/api/v1/stock/profile2?symbol=${comp_symbol}&token=${news_key}`
   const third_url = `https://api.polygon.io/v1/meta/symbols/${comp_symbol}/company?apiKey=${profile_key}`
    const company = new Stockmarket(req.body.comp_symbol);
    company.inputCheck();
    
    let resultProfile = await fetchProfile(first_url, third_url);

    res.render("profile", {
        resultName: resultProfile.f1_name,
        resultTicker: resultProfile.f1_ticker,
        resultCeo: resultProfile.f3_ceo,
        resultHq: resultProfile.f3_hq,
        resultHqCountry: resultProfile.f3_hq_country,
        resultSimilar: resultProfile.f3_similar,
        resultDescription: resultProfile.f3_description,
        resultShare: resultProfile.f1_share

    })
}
const fetchProfile = async (first,third) => {
    try {
        const res = await Promise.all([
            axios.get(first),
            axios.get(third)
        ]);
        const data = res.map((res)=> res.data);
        const f1_name = data[0].name;
        const f1_ticker = data[0].ticker;
        const f3_ceo = data[1].ceo;
        const f3_hq =data[1].hq_address;
        const f3_hq_country = data[1].hq_country;
        const f3_similar = data[1].similar;
        const f3_description = data[1].description;
        const f1_share = data[0].shareOutstanding;
        return {
            f1_name: f1_name,
            f1_ticker: f1_ticker,
            f1_share: f1_share,
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

