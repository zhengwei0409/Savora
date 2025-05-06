const express = require('express');
const router = express.Router();

const{ getNews,getCompanyProfile ,getQuote} =require('../controller/market_controller')


router.get('/news',getNews)

router.get('/company_profile/:symbol',getCompanyProfile)

router.get('/quote/:symbol',getQuote)

module.exports=router