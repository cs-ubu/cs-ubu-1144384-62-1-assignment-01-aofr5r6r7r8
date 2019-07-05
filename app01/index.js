//import * as request from 'request' #เป็นคำสั่ง typesscript
//import * as readline from 'readline'  #เป็นคำสั่ง typesscript

const request = require('request') // #เป็นคำสั่ง javascript //import request
const readline = require('readline') // #เป็นคำสั่ง javascript //import readline

const rl = readline.createInterface({input: process.stdin, output: process.stdout})

function showExchange(rates) {
  rl.question('กรอกจำนวนเงิน (บาท) ', (answer) => {
    const money = parseFloat(answer)
    console.log(`ผู้ใช้มีเงิน ${money} บาท`)
    for (let k in rates) {
      console.log(`\t: ${k} ${(money*rates[k]/rates['THB']).toFixed(2)}`) //แสดงทศนิยม 2 ตำแหน่ง
    }
    rl.close()
  })
}

const url = `https://api.exchangeratesapi.io/latest`

let result = '';
request
    .get(url)
    .on('response', res => {
            console.log(`response statusCode : ${res.statusCode}`)
            // console.log(res.headers)
        })
    .on('data', data => {       //เอา data มาต่อกัน
      result += data
        })
    .on('end', () => {
      const exchange = JSON.parse(result) // convert to json object
      showExchange(exchange.rates)
        })
