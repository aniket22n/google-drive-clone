const mongoose = require('mongoose')

function connectDB() { 

    return new Promise((resolve , reject) => { 
        mongoose.connect('mongodb://127.0.0.1:27017/googledocs').then(() => {
            console.log('connected to database')
            resolve()
        }).catch((error) => { 
            console.error(error)
            reject(error)
        })
    })
    
}

export { connectDB}