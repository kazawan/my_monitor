const os = require('os')

const cpu = require('./src/cpu')

function showUptime(s) {
    let day = Math.floor(s / 86400)<10 ?  "0" + Math.floor(s / 86400 ) : Math.floor(s / 86400)
    let hour = Math.floor((s - day * 86400) / 3600) < 10 ? "0" + Math.floor((s - day * 86400) / 3600) : Math.floor((s - day * 86400) / 3600)
    let minute = Math.floor((s - day * 86400 - hour * 3600) / 60) < 10 ? "0"  + Math.floor((s - day * 86400 - hour * 3600) / 60) : Math.floor((s - day * 86400 - hour * 3600) / 60)
    let second = Math.floor(s - day * 86400 - hour * 3600 - minute * 60) < 10 ?  "0" + Math.floor(s - day * 86400 - hour * 3600 - minute * 60) : Math.floor(s - day * 86400 - hour * 3600 - minute * 60)
    return day + ':' + hour + ':' + minute + ':' + second
}

function showTotalMenory() {
    return (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + "GHz"


}

function showFreeMenory() {
    return (os.freemem() / 1024 / 1024 / 1024).toFixed(2)
}

function showMenoryUsage(){
    return (100-(os.freemem() / os.totalmem()*100).toFixed(2)) + "%"
}

function showNetWork() {
    return {
        address: os.networkInterfaces()['以太网'][3].address,
        netmask: os.networkInterfaces()['以太网'][3].netmask,
        mac: os.networkInterfaces()['以太网'][3].mac
    }
}

function showCpuTotal() {
    return ((os.cpus()[0].times.user + os.cpus()[0].times.sys + os.cpus()[0].times.idle + os.cpus()[0].times.irq)/1024/1024).toFixed(2) + 'GHz'

}


async function monitorTask() {
    return new Promise(resolve => {
        cpu.then((data) => resolve({
            cpuTotal:showCpuTotal(),
            cpuUsage:data,
            Uptime: showUptime(os.uptime()),
            TotalMenory: showTotalMenory(),
            FreeMenory: showFreeMenory(),
            MenoryUsage: showMenoryUsage(),
            NetWork: showNetWork(),
            
        }))

        
    })
}


setInterval(() => {
    monitorTask().then((data) => console.log(data))


}, 1000)


module.exports=monitorTask




