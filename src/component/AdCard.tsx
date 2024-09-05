/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

export const AdCard = (props: any) => {
    const [timeLeft, setTimeLeft] = useState(16); // Start with 60 seconds

    useEffect(() => {
      // Only start the timer once the component is mounted (page is loaded)
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => { 
          if (prevTime <= 1) {
            clearInterval(timer);
            if(props.redirectUrl)
                history.back();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  
      // Cleanup the interval on component unmount
      return () => clearInterval(timer);
    }, []); // Empty dependency array ensures this effect runs only once on mount
  
    return (
            <>
                <div>
                    <title>Ad Card Example</title>
                    <meta name="description" content="Ad card example using Next.js and Tailwind CSS" />
                    <link rel="icon" href="/favicon.ico" />
                </div>

                <div>
                    <div className="max-w-sm mx-auto rounded-xl overflow-hidden">
                        <div className=" shadow-md h-[262px] bg-gray-200 flex items-center justify-center border border-white vorder-2 bg-cover bg-center"  style={{ backgroundImage: `url(${props.imageUrl})`}}>
                            {/* Placeholder for image */}
                            {
                                !props.imageUrl ?? (
                                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                )
                            }
                        </div>
                        <div className=" shadow-md p-4  bg-white">
                            <h2 className="font-semibold text-md mb-2">{props.title ? props.title : 'Title'}</h2>
                            <p className="w-[262px] text-gray-700 text-sm text-ellipsis overflow-hidden">{props.description ? props.description : 'Description of your amazing channel or brand'}</p>
                            <div className="mt-4 flex items-center">
                                <span className="text-sm text-[#2390cf] font-semibold">Advertiser</span>
                                <span className="ml-auto text-xs text-gray">Ad · 18+</span>
                            </div>
                        </div>
                        <a href={props.redirectUrl ? props.redirectUrl : 'https://t.me/blahblah'}>
                            <button className={`w-full bg-[#6ea662] text-white py-2 font-bold transition-colors mt-1 transform transition-all duration-300 ease-in-out ${
                                timeLeft <= 9 ? 'opacity-100 scale-100' : ' opacity-0 scale-50 shadow-md '
                            }`}>
                                Go!
                            </button>
                        </a>
                    </div>
                    <div className="mt-10 text-center text-sm text-gray-500 ">
                        <div className=' flex flex-row justify-center'>
                            <p className='px-2 rounded-full bg-[#6ea662] text-white font-semibold text-[12px]'>00:{timeLeft}</p>
                        </div>
                        <div className=' flex flex-row justify-center mt-3'>
                            <p className='px-2 rounded-full bg-[#6ea662] text-white font-semibold text-[12px]'>TMAds, Ads for Games</p>
                        </div>
                    </div>
                </div>
            </>
    )
}