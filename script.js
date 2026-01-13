function updateClock() {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);

function addLog(msg) {
    const log = document.getElementById('event-log');
    const entry = document.createElement('div');
    entry.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
    log.prepend(entry);
}

if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        function updateBattery() {
            const level = Math.round(battery.level * 100);
            document.getElementById('bat-level').innerText = level;
            document.getElementById('bat-status').innerText = battery.charging ? "CHARGING" : "DISCHARGING";
            
            const core = document.getElementById('battery-core');
            core.style.borderColor = level < 20 ? '#ff3333' : '#00f3ff';
            
            addLog(`Power level updated: ${level}%`);
        }
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
    });
}

function updateNetwork() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
        document.getElementById('net-type').innerText = conn.effectiveType.toUpperCase();
        document.getElementById('net-speed').innerText = conn.downlink;
        document.getElementById('net-rtt').innerText = conn.rtt;
        addLog(`Network scan: ${conn.effectiveType} detected.`);
    }
}
updateNetwork();
window.addEventListener('online', () => addLog("Connection: ONLINE"));
window.addEventListener('offline', () => addLog("Connection: OFFLINE"));

document.getElementById('cpu-cores').innerText = navigator.hardwareConcurrency || "UNK";
document.getElementById('platform').innerText = navigator.platform.substring(0, 8);

addLog("System diagnostic complete. All sensors operational.");
window.addEventListener('mousemove',(e)=>{
    const glow=document.getElementById('cursor-glow');
    glow.style.setProperty('--x',e.clientX+'px');
    glow.style.setProperty('--y',e.clientY='px');
});
