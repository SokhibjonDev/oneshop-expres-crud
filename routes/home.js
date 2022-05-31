const express = require('express')
const router = express.Router() // {}

// GET method // Read
router.get('/', (req, res, next) => {
    res.render('index',
        {
            title: 'Home',
            isHome: true,
        })
})


module.exports = router
