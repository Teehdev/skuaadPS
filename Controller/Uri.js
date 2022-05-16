const validator = require('validator');
const nanoid = require('nanoid');
const cuid = require('cuid');
const Regex = require('regex');
const Url = require('../Models/skuaadUrl');
const res = require('express/lib/response');

const shortenUrl = async(req,res)=> {
const url = req.body;

// Check that input is not empty
if (validator.isEmpty(url, { ignore_whitespace: true})) {
    return res.status(400).json({
        message: "Url should not be empty"
    })
}
// Check if user input is a string
if (!["string"].includes(typeof url)) {
    return res.status(400).json({
        message: "Url should be a string"
    })       
    }
// validate if Url is correct
if (!validator.isURL(url)) {
    return res.status(400).json({
        message: "Invalid Url"
    })
}

try {
    const regex = new RegExp('^[0-9a-zA-Z_]{4,}$')
    let shortCode = await nanoid(10)
    const cc = await cuid.slug()
    let startDate = ""
    let lastSeenDate = ""
    let redirectCount = 0

let uri = await Url.findOne({
    url
})
if (uri) {
    res.status(400).json({
        message: "url already exists"
    })
} else {
     // Create data
     const urlDoc = await Url.create({
        shortCode,
        url,
        startDate,
        lastSeenDate,
        redirectCount,
    })
    res.send(urlDoc)
}
} catch (error) {
    res.err(error)
}

}

const getUrl = async (req,res)=> {
const shortCode = req.body

// Check that input is not empty
if (validator.isEmpty(shortCode, { ignore_whitespace: true})) {
    return res.status(400).json({
        message: "short code should not be empty"
    })
}

const uri = await Url.findOne({
    shortCode: shortCode
})

if (uri) {
    res.redirect(301, uri.url)
    res.writeheader()
} else {
    res.status(404).json({
        "Error": "shortcode does not exist"
    })
}

}

const getStats = async (req, res)=> {
    const shortCode = req.body

// Check that input is not empty
if (validator.isEmpty(shortCode, { ignore_whitespace: true})) {
    return res.status(400).json({
        message: "short code should not be empty"
    })
}

const uri = await Url.findOne({
    shortCode: shortCode
})

if (uri) {
    res.send(uri)
} else {
    res.status(404).json({
        "Error": "shortcode does not exist"
    })
}

}





module.exports = {
    shortenUrl,
    getUrl,
    getStats,

}