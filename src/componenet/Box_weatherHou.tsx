
interface info {
    list:{
        time: string;
        icon: string;
        temp: string;
    }
  }
  

const Box_weatherHou = (props:info) => {
    return <>
    <div className='flex flex-col items-center w-[30%] mx-[5px] md:p-[10px] bg-[#ffffff5a] rounded-[10px] '>
            <span className='md:m-[0] m-[10px] md:text-[15px] text-[20px]'>{props.list.time}</span>
            <img src={props.list.icon} alt="عکس اب و هوا" className='md:w-[70%] w-[100%] md:h-[70%] h-[100%]'></img>
            <span className='font-bold md:m-[15px] m-[30px]'>{props.list.temp}°</span>
          </div>
    </>
}



export default Box_weatherHou;