import { useState , useEffect } from 'react'
import './App.css'
import { TbCloudSearch } from "react-icons/tb";
import { TiWeatherPartlySunny } from "react-icons/ti";
import Show_Weather from './componenet/Show_Weather';
import Future_Hours from './componenet/Future_Hours';
import {countries} from './Json/handlerJsonCountry';
import { Weathers } from './Json/handlerJsonWeather';
// import Seven_Days from './cmponenet/Seven_Days';
import Swal from 'sweetalert2'


interface infoShow{
  city : string,
  countri : string,
  time: [number,number],
  main:string,
  description:string,
  temp : number,
  feels_like: number,
  humidity: number,
  wind: {deg:number,speed:number},
  rain : number,
  icon: string
}

interface infoFutHou{
  city: string,
  country: string,
  list : []
}


const apiKey = import.meta.env.VITE_WEATHER_API_KEY ;

function App() {
  const [InfoShow, setInfoShow] = useState<infoShow>({
    city: '',
    countri: '',
    time: [0,0],
    main: '',
    description: '',
    temp: 0,
    feels_like: 0,
    humidity: 0,
    wind: {deg: 0, speed: 0},
    rain : 0.0,
    icon : '10d'
  });

  const [InfoFutHou, setInfoFutHou] = useState<infoFutHou>({
    city: '',
    country: '',
    list :[]
  });

  const [cityInput, setCityInput] = useState('مشهد');

  const [defaultDeg, setDefaultDeg] = useState(() => {
    const saved = localStorage.getItem('defaultDeg');
    return saved || 'C';
  });

  const [originalTemp, setOriginalTemp] = useState(0);

  useEffect(() => {
    const newTemp = defaultDeg === 'C' ? originalTemp : Math.round((originalTemp * 1.8) + 32);
    setInfoShow(prev => ({ ...prev, temp: newTemp }));
  }, [defaultDeg, originalTemp]);

  function ToggleDegToF() {
    setDefaultDeg('F');
    localStorage.setItem('defaultDeg', 'F');
  }

  function ToggleDegToC() {
    setDefaultDeg('C');
    localStorage.setItem('defaultDeg', 'C');
  }

  function ShowWeather() {
    let time = new Date(Date.now())

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.trim().replace(/\s+/g, ' ')}&appid=${apiKey}&units=metric&lang=fa`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.cod == '200') {
            const celsiusTemp = Math.round(data.main.temp);
          setOriginalTemp(celsiusTemp);
          const displayTemp = defaultDeg === 'C' ? celsiusTemp : Math.round((celsiusTemp * 1.8) + 32);
          setInfoShow({
            city: data.name,
            countri: countries[data.sys.country],
            description: data.weather[0].description,
            feels_like: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            main: Weathers[data.weather[0].main],
            temp: displayTemp,
            time: [time.getHours(),time.getMinutes()],
            wind: data.wind,
            rain : data.rain !== undefined ? data.rain['1h'] : 0.0,
            icon : data.weather[0].icon
          });
          }
          else if(data.cod == '401'){
            Swal.fire({
              title: 'خطا!',
              text: 'مشکل سرور!! لطفا چند لحظه دیگر تلاش کنید...',
              icon: 'error',
              confirmButtonText: 'باشه!'
            })
          }
          else if(data.cod == '404'){
            Swal.fire({
              title: 'خطا!',
              text: 'چنین شهری وجود ندارد!! دوباره تلاش کنید',
              icon: 'error',
              confirmButtonText: 'باشه!'
            })
          }
          else if(data.cod== '429'){
            Swal.fire({
              title: 'خطا!',
              text: 'محدودیت درخواست بیش از 60 بار در دقیقه!! لطفا فردا تلاش کنید',
              icon: 'error',
              confirmButtonText: 'باشه!'
            })
          }
          else{
            Swal.fire({
              title: 'خطا!',
              text: `خطای ناشناخته: ${data.message}`,
              icon: 'error',
              confirmButtonText: 'باشه!'
            })
          }
        })
        .catch(error => console.error('خطا:', error));
    
  }

  function FutureHours () {
    const url =`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric&lang=fa`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod == '200') {
          setInfoFutHou({
            city: data.city.name,
            country: countries[data.city.country],
            list: data.list
          });
        }
        else{
          console.log(data.message)
        }
      })
      .catch(error => console.log('خطا:',error))
  }

  // function SevenDays() {
  //   const url= `http://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric&lang=fa`;
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data=>{
  //       console.log(data)
  //     })
  //     .catch(error => console.log('خطا:',error))
  // }

  function getWeather() {
    ShowWeather();
    FutureHours();
    // SevenDays();
  }



  return (
    <>
      <header className='flex md:items-center md:flex-row justify-between flex-col'>
        <div className='cursor-default flex flex-col my-[20px] text-right'>
          <div className='text-[30px] font-bold flex '>
            <span>نمایش آب و هوا</span>
            <TiWeatherPartlySunny className='m-[10px]'/>
            </div>
          <span> با دکمه‌های بالا واحد دما را تغییر دهید یا شهر دیگری جستجو کنید </span>
        </div>
        <div className='bg-[#ffffff5a] flex  md:h-[30%] border-[1px] border-[#ffffff] rounded-[100px]'>
          <button className={`mx-[10px] hover:scale-150 hover:bg-transparent hover:text-[#ffffff]  ${defaultDeg =='C'? 'bg-[#ffffff81] text-[#8AAAE5]' :''}`} onClick={ToggleDegToC}>°C</button>
          <button className={`mx-[10px] hover:scale-150 hover:bg-transparent hover:text-[#ffffff] ${defaultDeg =='F'? 'bg-[#ffffff81]  text-[#8AAAE5]' :''}`} onClick={ToggleDegToF}>°F</button>
        </div>
      </header>
      <section className='flex w-[100%] items-center justify-between h-[20%] my-[10px] p-[10px] bg-[#ffffff5a] rounded-[30px] border-[1px] border-[#ffffff]'>
        <div className='flex items-center w-[80%]'>
        <TbCloudSearch className='m-[10px] text-[25px]'/>
        <input className='h-[100%] w-[80%] focus-visible:' type="text" placeholder='نام شهر (مثلا مشهد)' value={cityInput} onChange={(e) => setCityInput(e.target.value)}/>
        </div>
        <button className='text-[#8AAAE5] bg-[#ffffff] ' onClick={getWeather}>جستجو</button>
      </section>
      <div className='flex md:flex-row flex-col justify-around'>
      <section className='flex flex-col md:w-[45%] p-[10px] bg-[#6178a3] mb-[20px] rounded-[20px]'>
        <Show_Weather icon={InfoShow.icon} rain={InfoShow.rain} city={InfoShow.city} countri={InfoShow.countri} temp={InfoShow.temp} time={InfoShow.time} main={InfoShow.main} description={InfoShow.description} wind={InfoShow.wind} feels_like={InfoShow.feels_like} humidity={InfoShow.humidity}/>
      </section>
      <section className='flex h-[40%] md:w-[45%] flex-col bg-[#6178a3] p-[10px] rounded-[20px] mb-[20px]'>
        <Future_Hours deg={defaultDeg} city={InfoFutHou.city} country={InfoFutHou.country} list={InfoFutHou.list}/>
      </section>

      </div>
      {/* <section className='flex flex-col bg-[#6178a3] mb-[20px] p-[10px] rounded-[20px]'>
        <span className='text-right mx-[10px] text-[25px]'> پیش بینی 7 روزه</span>
        <div className='flex flex-wrap m-[10px]'>
          <Seven_Days/>
        </div>
      </section> */}
      <footer className='flex items-center mx-[10px] my-[20px]'>
        <span className='ml-[8px]'>منبع داده:</span>
        <a target="_blank" href="https://openweathermap.org"> OpenWeather </a>
      </footer>
    </>
  )
}

export default App

