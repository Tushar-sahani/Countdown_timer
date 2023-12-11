import React, { useState, useEffect } from 'react';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import RestartAltIcon from '@mui/icons-material/RotateLeft';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const Countdown = () => {
    const [timer, setTimer] = useState(0);
    const [countdown, setCountdown] = useState({ hours: '00', minutes: '00', seconds: '00' });
    const [isPause, setIsPause] = useState(false);

    const handleTimer = (e) => {
        setTimer(e.target.value);
        setCountdown({ hours: '00', minutes: '00', seconds: '00' });
    };
    const countdownToSeconds = ({ hours, minutes, seconds }) => {
        return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    };
    const handlePause = () => {
        setIsPause(!isPause);

        if (isPause) {
            localStorage.setItem('remainingTime', JSON.stringify(countdownToSeconds(countdown)));
        }
        
    };

    const handleReset = () => {
        setTimer(0);
        setIsPause(false)
        setCountdown({ hours: '00', minutes: '00', seconds: '00' });
        localStorage.removeItem('remainingTime');
    };

    useEffect(() => {
        let remainingTime = JSON.parse(localStorage.getItem('remainingTime')) || timer * 60;
        if(!isPause){
            localStorage.removeItem('remainingTime');
        }
        let totalSeconds = remainingTime - 1;

        const time = setInterval(() => {
            if (totalSeconds >= 0 && !isPause) {
                let hours = Math.floor(totalSeconds / 3600);
                let minutes = Math.floor((totalSeconds % 3600) / 60);
                let seconds = totalSeconds % 60;

                hours = hours < 10 ? '0' + hours : hours;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;

                setCountdown({ hours, minutes, seconds });
                totalSeconds -= 1;
            }
        }, 1000);
        

        return () =>{
            clearInterval(time);
        } 
            
    }, [timer, isPause]);

    return (
        <div className="w-[100vw] h-[100vh] bg-[#1c222f] ">
            <div className="flex flex-col lg:w-1/3 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <label htmlFor="minute" className="text-2xl mb-3 text-[#2b768d]">
                    Enter Minutes
                </label>
                <input
                    type="numeric"
                    name="minute"
                    value={timer}
                    id="minute"
                    onChange={handleTimer}
                    className="h-16 outline-none p-2 bg-[#1c222f] border-2 border-gray-600 rounded-md text-white text-2xl font-semibold"
                />
                <button onClick={handleReset} className="absolute right-4 top-16">
                    <RestartAltIcon sx={{ color: 'white', fontSize: '2rem' }} />
                </button>

                <div className="flex m-auto mt-6 relative">
                    <div className="bg-[#06accd3d] w-16 h-16 absolute rounded-full -z-10 blur-lg top-2 left-2 cursor-pointer"></div>
                    <button onClick={handlePause} className="">
                    {!isPause?<PauseCircleIcon sx={{ color: '#06abcd', fontSize: '5rem' }}/>:<PlayCircleFilledIcon sx={{ color: '#06abcd', fontSize: '5rem' }} />}
                        
                    </button>
                    <p className="text-[#06abcd] text-6xl p-2 font-bold">
                        {countdown.hours + ':' + countdown.minutes + ':' + countdown.seconds}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
