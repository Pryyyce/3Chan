import {useEffect,useState} from 'react';
import {Link,Outlet} from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function Thread(){
    const [thread, setThread] = useState([]);
    const [comments, setComments] = useState([]); // [comment, setComment
    const thread_id= useParams().threadId;

    useEffect(() => {
        async function getThread() {
            const response = await fetch(`http://localhost:3001/threads/${thread_id}`);
            const data = await response.json();
            setThread(data);
        }
        getThread();
    },[]);

    useEffect(() => {
        async function getThreadComments() {
            const response = await fetch(`http://localhost:3001/threads/${thread_id}/comments`);
            const data = await response.json();
            setComments(data);
        }
        getThreadComments();
    });
    return (
        <>
        <div className='max-w-lg bg-bGround mx-auto my-5 py-3'>
            <div className='text-left text-lightText mx-7 py-3'>
                {thread.poster}
            </div>

            <div className='p-2  m-3 my-2 text-center text-[20px] text-lightText bg-baseObj'>
                {thread.title}
            </div>

            <div>
                <img src={require('./3Clogo.png')} width="200" height="200" className='mx-auto'/>
            </div>

            <div className='p-2  m-3 my-2 text-center text-[10px] text-darkText bg-baseObj'>
                {thread.contents}
            </div>
            
        </div>
        <div className="flex space-around container   mx-auto max-w-[400px]">

                <Link className="container mx-auto bg-bGround max-w-[150px] text-darkText text-center p-2" to="/threads">
                    <div className="container mx-auto bg-bGround max-w-[150px] text-darkText text-center">
                         Back to Home
                    </div>
                </Link>

                

                <Link className="container mx-auto bg-bGround max-w-[150px] text-darkText text-center p-2" to="newComment">
                    <div className="container mx-auto bg-bGround max-w-[150px] text-darkText text-center">
                        New Comment
                    </div>
                </Link>
          
        </div>
        { <Outlet/>}
        <div className='max-w-lg bg-bGround mx-auto my-3 py-1'>
          {  comments.map((comment) => (
                
            <div className="bg-baseObj shadow border-darkText border-2 border-double my-5 mx-2">
                {comment.replyToId !== undefined && <div className='text-left text-lightText py-1 px-3'>Reply to : {comment.replyToId}</div>}
                <div className='text-left px-3  font-outline-2'>
               ->
               {comment.commenterName}
               
               </div>
                <div className='text-left mx-2 p-3 text-darkText'>
            
                {comment.contents}
                </div>
                <div className='text-left mx-2 p-1 font-outline-3 text-darkText'>
            
                CID: {comment._id}
                </div>
                <div className='text-left mx-2 p-1 font-outline-3 text-darkText'>
            
                <Link to={`comments/${comment._id}/reply`} >
                    reply
                </Link>
                </div>
            </div>
          ))}
        </div>
        </>
    );
}