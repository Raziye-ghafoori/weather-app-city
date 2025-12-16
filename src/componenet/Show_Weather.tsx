import { Deg } from '../Json/handlerJsonDeg';

interface info {
    city : string,
    countri : string,
    time: [number,number],
    main:string,
    description:string,
    temp : number,
    feels_like: number,
    humidity: number,
    wind: {deg:number,speed:number},
    rain: number,
    icon: string
}
const Show_Weather = (props:info ) => {

    const url = `https://openweathermap.org/img/wn/${props.icon}@2x.png`

    function getDirection(degree:number) {
      const normalized = Math.round(degree / 45) * 45;  // گرد کردن به نزدیک‌ترین 45 درجه
      const key = normalized % 360;  // محدود به 0-315
      return Deg[key.toString()] || "نامشخص";
    }
    return <>
    <div className='flex md:m-[10px] justify-between items-center '>
          <div>
            <div className='text-right'>
              <span className='text-[50px] m-[5px]'>{props.city}</span>
              <span className='text-[15px] text-[#ffffff81] m-[10px]'> {props.countri} </span>
            </div>
            <div className='text-[15px] text-[#ffffff81] text-right'>
              <span className='m-[5px]'>بروزرسانی:</span>
              <span>{props.time[0]}:{props.time[1]}</span>
            </div>
          </div>
          <div className='p-[10px] flex flex-col md:w-[30%] md:h-[100%] items-center'>
            <img className='md:w-[200px]' src={url} alt={props.description}/>
            <span >{props.description}</span>
          </div>
        </div>
        <div className='flex items-center'>
          <span className=' text-[70px] px-[20px]'>{props.temp}°</span>
          <div className='flex flex-col items-start'>
            <span className='text-[20px] font-bold'>{props.main}</span>
            <div className='text-[15px] text-[#ffffff81]'>
              <span>حس شده: </span>
              <span>°{props.feels_like}</span>
            </div>
          </div>
        </div>
        <div className='flex md:flex-row flex-col mb-[20px]'>
          <div className=' md:w-[30%] flex flex-col items-start p-[10px] md:mx-[10px] my-[10px] bg-[#ffffff5a] rounded-[20px]'>
            <span className='text-[25px]'>رطوبت</span>
            <span>% {props.humidity}</span>
            </div>
          <div className='md:w-[30%] flex flex-col items-start p-[10px] md:mx-[10px] my-[10px] bg-[#ffffff5a] rounded-[20px]'>
            <span className='text-[25px]'>باد</span>
            <div className='flex justify-between items-center w-[100%]'>
              <span className='px-[5px]'>{Math.round(props.wind.speed)} m/s</span>
              <span className='bg-[#ffffff81] rounded-[10px] w-[40%] py-[2px] m-[5px]'>{getDirection(Math.round(props.wind.deg))}</span>
            </div>
          </div>
          <div  className='md:w-[30%] flex flex-col items-start p-[10px] md:mx-[10px] my-[10px] bg-[#ffffff5a] rounded-[20px]'>
            <span className='text-[25px]'>بارش</span>
            <span>{props.rain} میلی متر</span>
          </div>
        </div>
    </>;
}


export default Show_Weather;      