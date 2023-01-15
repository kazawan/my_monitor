const monitorTask = require('./os')

monitorTask().then((data)=>console.log(data));

setInterval(() => {
    monitorTask().then((data) => console.log(data))


}, 1000)