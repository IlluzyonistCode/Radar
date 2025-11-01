import { Demodulator } from './demodulator.mjs';

let readSamples = true;
let button = document.querySelector('#connect-btn');
let introSection = document.querySelector('.intro');
let mainSection = document.querySelector('.app');
let waitingMessage = document.querySelector('#waiting-message');
let started = false;
let msgReceived = false;
let aircraftData = new Map();
let aircraftCountElement = document.querySelector('#count-value');
let aircraftListElement = document.querySelector('#aircraft-list');
let rawDataElement = document.querySelector('#raw-data');

const demodulator = new Demodulator();

async function start() {
    const sdr = await RtlSdr.requestDevice();
    introSection.style.display = 'none';
    mainSection.style.display = 'block';

    await sdr.open({ ppm: 0.5 });

    const actualSampleRate = await sdr.setSampleRate(2000000);
    const actualCenterFrequency = await sdr.setCenterFrequency(1090000000);

    await sdr.resetBuffer();

    while (readSamples) {
        if (!started) {
            console.log('starting...');

            started = true;
        }

        const samples = await sdr.readSamples(128000);
        const data = new Uint8Array(samples);

        demodulator.process(data, 256000, onMsg)
    }
}

const onMsg = (msg) => {
    if (!msgReceived) {
        waitingMessage.style.display = 'none';
        msgReceived = true;
    }

    displayAircraftData(msg);
    updateRawData(msg);
}

function displayAircraftData(msg) {
    if (!msg.crcOk || !msg.icao) return;

    const icao = '0x' + msg.icao.toString(16).toUpperCase().padStart(6, '0');
    
    if (!aircraftData.has(icao)) {
        aircraftData.set(icao, {
            icao: icao,
            callsign: '',
            altitude: null,
            speed: null,
            heading: null,
            latitude: null,
            longitude: null,
            verticalRate: null,
            lastUpdate: Date.now()
        });
    }

    const aircraft = aircraftData.get(icao);
    
    if (msg.callsign) aircraft.callsign = msg.callsign.trim() || 'N/A';
    if (msg.altitude) aircraft.altitude = msg.altitude + (msg.unit === 0 ? ' ft' : ' m');
    if (msg.speed !== null) aircraft.speed = Math.round(msg.speed) + ' kts';
    if (msg.heading !== null) aircraft.heading = Math.round(msg.heading) + '°';
    if (msg.vertRate !== null) {
        const verticalRate = msg.vertRateSign ? -msg.vertRate : msg.vertRate;
        aircraft.verticalRate = verticalRate + ' ft/min';
    }
    aircraft.lastUpdate = Date.now();

    updateAircraftDisplay();
}

function updateAircraftDisplay() {
    aircraftCountElement.textContent = aircraftData.size;
    
    aircraftListElement.innerHTML = '';
    
    const sortedAircraft = Array.from(aircraftData.values())
        .sort((a, b) => b.lastUpdate - a.lastUpdate);
    
    sortedAircraft.forEach(aircraft => {
        const card = createAircraftCard(aircraft);
        aircraftListElement.appendChild(card);
    });
}

function createAircraftCard(aircraft) {
    const card = document.createElement('div');
    card.className = 'aircraft-card';
    
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    
    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = aircraft.callsign || 'UNKNOWN';
    
    const icaoBadge = document.createElement('div');
    icaoBadge.className = 'card-icao';
    icaoBadge.textContent = aircraft.icao;
    
    cardHeader.appendChild(title);
    cardHeader.appendChild(icaoBadge);
    
    const dataGrid = document.createElement('div');
    dataGrid.className = 'data-grid';
    
    addDataItem(dataGrid, 'Altitude', aircraft.altitude || 'N/A');
    addDataItem(dataGrid, 'Speed', aircraft.speed || 'N/A');
    addDataItem(dataGrid, 'Heading', aircraft.heading || 'N/A');
    addDataItem(dataGrid, 'Vertical Rate', aircraft.verticalRate || 'N/A');
    
    card.appendChild(cardHeader);
    card.appendChild(dataGrid);
    
    return card;
}

function addDataItem(grid, label, value) {
    const item = document.createElement('div');
    item.className = 'data-item';
    
    const labelEl = document.createElement('div');
    labelEl.className = 'data-label';
    labelEl.textContent = label;
    
    const valueEl = document.createElement('div');
    valueEl.className = 'data-value';
    valueEl.textContent = value;
    
    item.appendChild(labelEl);
    item.appendChild(valueEl);
    grid.appendChild(item);
}

function updateRawData(msg) {
    const keys = Object.keys(msg).filter(k => k !== 'msg');
    const rawText = keys.map(k => `${k}: ${msg[k]}`).join(', ');
    
    rawDataElement.textContent += rawText + '\n';
    
    const panelContent = rawDataElement.parentElement;
    panelContent.scrollTop = panelContent.scrollHeight;
}

window.togglePanel = function() {
    const panel = document.querySelector('#raw-data-panel');
    panel.classList.toggle('collapsed');
    const button = document.querySelector('.toggle-panel');
    button.textContent = panel.classList.contains('collapsed') ? '+' : '−';
}

button.onclick = () => start();
