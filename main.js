const axios = require('axios');

const data = axios.get('https://cat-fact.herokuapp.com/facts/random');

data.then((res) => {
    console.log(res.data.text);
})
.catch((err) => {
    console.log(`Error! ${err}`);
}).finally(() => {
    console.log("Promise resolved!");
});
