import Box_weatherHou from "./Box_weatherHou"
import WeatherChart from './WeatherChart';

interface info{
    city: string,
    country: string,
    deg : string,
    list:[]
}

const FutureHours = (props:info) => {

  const weatherBoxes = props.list.slice(0, 8).map((item:any) => { 
    const time = new Date(item.dt * 1000).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    const temp = props.deg === 'C' ? Math.round(item.main.temp): Math.round((Math.round(item.main.temp) * 1.8) + 32)
    return {
        time,
        icon,
        temp: temp.toString()
    };
});
  
    return <>
    <div>
          <div className='flex md:flex-row flex-col items-start md:items-center h-[10%] md:mb-[20px] mb-[40px] justify-between mx-[10px]'>
            <span className='text-[25px] font-bold'>ساعت های آینده</span>
            <span>{props.city} / {props.country}</span>
          </div>
          <span className='flex md:h-[30%] h-[40%] justify-center mx-[auto] rounded-[20px] w-[95%] bg-[#ffffff81] '>
          <WeatherChart deg={props.deg} list={props.list}/>
          </span>
        </div>
        <div className='flex h-[40%] overflow-x-auto w-[95%] mx-[auto] pb-[10px] my-[10px]'>
          {weatherBoxes.length != 0 ? weatherBoxes.map((box)=>(
            <Box_weatherHou list={box}/>
          )) : <></> }
        </div>
    </>;
}

export default FutureHours;