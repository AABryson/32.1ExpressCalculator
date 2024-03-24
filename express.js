//######' '
const express = require('express')
const ExpressError = require('/app.js')

const app = express();
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 

app.get('/mean', (req, res, next) => {
    if (!req.query.nums){
        throw new ExpressError('use only valid numbers', 400)

    }
    let queryObject = req.query;
    console.log(queryObject);
    nums = req.query['nums'];
//########split into an array;
    let arr = nums.split(',');
    console.log(nums);
    console.log(arr);
    let total = 0
    let number = 0;
//######### add number to total
    arr.forEach(function(val){
//####convert string to number
        total += Number(val);
        number += 1})
    let answer = total/number;
//#####turn into string for res.send()
    return res.json({operation:'mean', value:answer.toString()});

})

app.get('/median', (req, res) => {
    let queryObject = req.query;
    let nums = queryObject['nums']
    let arr = nums.split(',');
    console.log(arr)
    let arrayNums = arr.map(Number)
    let count = arrayNums.length;
    console.log(count);
    if (count % 2 === 0) {
        let middle = Math.floor(count/2);

        let firstNumber = arrayNums[middle - 1];
        let secondNumber = arrayNums[middle]
        let total = firstNumber + secondNumber;
        let result = total/2;
        let stringResult = result.toString()
        console.log(result)
        
        return res.json({operation:'median', value:stringResult});
    } else {
        let result = Math.floor(count/2);
        let answer = arrayNums[result];
        let stringResult = answer.toString();
        console.log(stringResult);
        return res.json({operation:'median', value:stringResult});

    }
})

function frequency(arr) {
    return arr.reduce(function(acc, next) {
        acc[next] = (acc[next] || 0) + 1;
        return acc;
    }, {});
}



app.get('/mode', (req, res) => {
    let queryObject = req.query;
    console.log(queryObject);
    let nums = queryObject['nums'];
//########split into an array;
    let arr = nums.split(',');
    console.log(nums);
    console.log(arr);
    let result = frequency(arr)
    return res.json({operatiion: 'mode', value:result})  
})
    


// app.get('/median', (req, res) => {
//     let queryObject = req.query;
//     let nums = queryObject['nums']
//     let arr = nums.split(',');
//     console.log(arr)
//     let arrayNums = arr.map(Number)
//     let count = arrayNums.length;
//     console.log(count);
//     if (count % 2 === 0) {
//         let middle = Math.floor(count/2);


/** general error handler */

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);

    // pass the error to the next piece of middleware
    return next(err);
});

  /** general error handler */

    app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
        error: err,
        message: err.message
    });
});
  














app.listen(3000, function(){
    console.log('3000 is running')
})