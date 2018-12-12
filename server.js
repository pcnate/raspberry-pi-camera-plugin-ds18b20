const sensor = require('ds18b20-raspi');


async function getTemp() {
  const temps = readAllF();
  const temps2 = [];
  temps.forEach( ( temp, index ) => {
    temps2.push({
      id: temp.id,
      f: temp.t,
      c: Number( ( ( temp.t - 32 ) * 5 / 9 ).toFixed(3) )
    }); 
  });
  console.log( temps2, new Date().toISOString() );
}

function readAllF() {
  if (process.env.TEMP_SENSOR === 'randomNumber') {
    return [
      { id: '28-0000068b6fe9', t: ( Math.floor( Math.random() * 10000 ) ) / 100 },
    ];
  } else {
    return sensor.readAllF();
  }
}



setInterval( () => {
  getTemp();
}, 1000 );
