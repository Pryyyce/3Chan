//holds all the threads
import {useEffect,useState} from 'react';
import {link} from 'react-router-dom';

export  function Threads() {
 const [threads, setThreads] = useState([]);
    useEffect(() => {
        async function getThreads() {
            const response = await fetch('http://localhost:3001/threads/');
            const data = await response.json();
            setThreads(data);
        }
        getThreads();
    });   
    return (
        <>
        <div className='max-w-lg mx-auto shadow bg-bGround'>
            <div className='grid threadGrid gap-4 py-4 px-3' >
                { threads.map((thread) => (
                    <div key={thread._id} className='container border-double border-2 border-darkText  text-center  bg-baseObj p-1 mx-1'>
                        <h1 className='text-[10px] text-lightText'>
                            {thread.poster}:posted
                        </h1>
                        <div className='container bg-bGround mx-auto max-w-[100px] p-1 m-2'>
                       <img src={require('./3Clogo.png')} width="100" height="50" className='mx-auto'/>
                       </div>
                        <h1 className='text-[10px] text-darkText'>
                            {thread.title}
                        </h1>
                    </div>
           )) }
           </div>
        </div>
        </>
    );
}