const fs = require('fs');
const https = require('https');

const url = 'https://dummyjson.com/products?limit=100';

https.get(url, (res)=>{
    let data = '';

    res.on('data', chunk =>{
        data += chunk;
    });

    res.on('end', ()=>{
        const parsed = JSON.parse(data);
        const products = parsed.products;

        fs.writeFile('./data/products.json', JSON.stringify(products, null, 2), (err)=>{
            if(err) throw err;
            console.log('products.json created with', products.length, 'products!');
        });
    });
}).on('error', (err)=>{
    console.error('Error fetching data:', err.message);
});