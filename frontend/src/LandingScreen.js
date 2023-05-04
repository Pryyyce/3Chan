import {link, Outlet} from 'react-router-dom';
import {Threads} from './Threads';

//homePage

export function LandingScreen() {
    return (
        <div>
            <div className="container mx-auto bg-bGround max-w-lg  shadow border p-4 m-5 border-none">
                <div className='flex justify-between'>
                    <img src={require('./3Clogo.png')} width="50" height="50"/>
                    <h1 className="text-darkText text-center m-3 text-xl"> Welcome to 3Chan! </h1>
                    <img src={require('./3Clogo.png')} width="50" height="50"/>
                </div>
            </div>
            
            <div>
                <Threads></Threads>
            </div>
            <Outlet />
        </div>
    );
}