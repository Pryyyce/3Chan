import {useEffect,useState } from 'react';
import {Link, useParams} from 'react-router-dom';



export function NewComment(){
    const [contents, setContents] = useState('empty');
    const [commenterName, setCommenterName] = useState('Alias');
    const [isSubmitted, setIsSubmitted] = useState(false); // [isSubmitted, setIsSubmitted
    const [isPending, setIsPending] = useState(false);
    const thread_id=useParams().threadId;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = {contents, commenterName};
        setIsPending(true);
        fetch(`http://localhost:3001/threads/${thread_id}/comments`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(comment)
        }).then(() => {
            console.log('new comment added');
            
            setIsSubmitted(true);
        })
    }
    return(
        <div className="container mx-auto bg-bGround max-w-lg  shadow border p-4 m-5 border-none text-center">
        <form className='bg-baseObj m-2 border-double border-2 border-darkText mx-auto my-7 max-w-[500px] ' onSubmit={handleSubmit}>
        <label className="text-lightText text-center ">
                Alias
        </label>
            <br></br>
            <textarea
                type="text"
                rows="1"
                className='m-3 rounded-lg border-2 border-darkText bg-baseObj  min-w-[350px] max-w-[400px] text-lightText text-center'
                value={commenterName}
                defaultValue={'anonymous'}
                onChange={(e) => setCommenterName(e.target.value)}
                required
            />
     <br></br>
        <label className="text-lightText text-center">
                Body
        </label>
            <br></br>
            <textarea
                type="text"
                rows="2"
                className='m-3  rounded-lg border-2 border-darkText bg-baseObj min-w-[350px] max-w-[400px] text-lightText text-center'
                value={contents}
                defaultValue={'this is some body text!'}
                onChange={(e) => setContents(e.target.value)}
                required
            />
            <br></br>
            {!isPending && <button className="bg-baseObj text-lightText text-center m-3 p-2 rounded-lg border-2 border-darkText">Submit</button>}
            {isSubmitted && <Link to=".."><button className="bg-baseObj text-lightText text-center m-3 p-2 rounded-lg border-2 border-darkText">Back</button></Link>}

        </form>
    </div>
    )
}
export function NewReply(){
    const [contents, setContents] = useState('empty');
    const [commenterName, setCommenterName] = useState('Alias');
    const [isSubmitted, setIsSubmitted] = useState(false); // [isSubmitted, setIsSubmitted
    const [isPending, setIsPending] = useState(false);
    const [replyToId, setReplyToId] = useState(''); // [comment, setComment
    const {threadId,commentId}=useParams([]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const comment = {contents, commenterName, replyToId};
        setIsPending(true);
        fetch(`http://localhost:3001/threads/${threadId}/comments`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(comment)
        }).then(() => {
            console.log('new comment added');
            
            setIsSubmitted(true);
        })
    }
    useEffect(() => {
        setReplyToId(commentId);
    },[commentId]);
    return(
        <div className="container mx-auto bg-bGround max-w-lg  shadow border p-4 m-5 border-none text-center">
        <form className='bg-baseObj m-2 border-double border-2 border-darkText mx-auto my-7 max-w-[500px] ' onSubmit={handleSubmit}>
        <label className="text-lightText text-center ">
            Reply to 
        </label>
        <br></br>
        
        <label className="text-lightText text-center ">
           {replyToId}
         
        </label>
        
        <br>
        </br>
        <br>
        </br>
        <label className="text-lightText text-center ">
                Alias
        </label>
            <br></br>
            <textarea
                type="text"
                rows="1"
                className='m-3 rounded-lg border-2 border-darkText bg-baseObj  min-w-[350px] max-w-[400px] text-lightText text-center'
                value={commenterName}
                defaultValue={'anonymous'}
                onChange={(e) => setCommenterName(e.target.value)}
                required
            />
     <br></br>
        <label className="text-lightText text-center">
                Body
        </label>
            <br></br>
            <textarea
                type="text"
                rows="2"
                className='m-3  rounded-lg border-2 border-darkText bg-baseObj min-w-[350px] max-w-[400px] text-lightText text-center'
                value={contents}
                defaultValue={'this is some body text!'}
                onChange={(e) => setContents(e.target.value)}
                required
            />
            <br></br>
            {!isPending && <button className="bg-baseObj text-lightText text-center m-3 p-2 rounded-lg border-2 border-darkText">Submit</button>}
            {isSubmitted && <Link to=".."><button className="bg-baseObj text-lightText text-center m-3 p-2 rounded-lg border-2 border-darkText">Back</button></Link>}

        </form>
    </div>
    )
}


export function NewThread() {

    const [title, setTitle] = useState('Untitled');
    const [contents, setContents] = useState('Alias');
    const [poster, setPoster] = useState('Empty');
    const [isSubmitted, setIsSubmitted] = useState(false); // [isSubmitted, setIsSubmitted
    const [isPending, setIsPending] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const thread = {title, contents, poster};
        setIsPending(true);
        fetch('http://localhost:3001/threads', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(thread)
        }).then(() => {
            console.log('new thread added');
            
            setIsSubmitted(true);
        })
    }

    return(
        <div className="container mx-auto bg-bGround max-w-lg  shadow border p-4 m-5 border-none text-center">
            <form className='bg-baseObj m-2 border-double border-2 border-darkText mx-auto my-7 max-w-[400px] ' onSubmit={handleSubmit}>
                <label className="text-lightText text-center">
                    Title
                </label>
                <br></br>
                <textarea
             type="text"
             rows="3"
             className=' rounded-lg m-3 border-2 border-darkText bg-baseObj text-lightText text-center'
             value={title}
             defaultValue={'Untitled'}
            onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br></br>
            <label className="text-lightText text-center">
                    Alias
            </label>
                <br></br>
                <textarea
                    type="text"
                    rows="1"
                    className='m-3  rounded-lg border-2 border-darkText bg-baseObj text-lightText text-center'
                    value={poster}
                    defaultValue={'anonymous'}
                    onChange={(e) => setPoster(e.target.value)}
                    required
                />
         <br></br>
            <label className="text-lightText text-center">
                    Body
            </label>
                <br></br>
                <textarea
                    type="text"
                    rows="11"
                    className='m-3  rounded-lg border-2 border-darkText bg-baseObj text-lightText text-center'
                    value={contents}
                    defaultValue={'this is some body text!'}
                    onChange={(e) => setContents(e.target.value)}
                    required
                />
                <br></br>
                {!isPending && <button className="bg-baseObj text-lightText text-center m-3 p-2 rounded-lg border-2 border-darkText">Submit</button>}
                {isSubmitted && <Link to="/threads"><button className="bg-baseObj text-lightText text-center m-3 p-2 rounded-lg border-2 border-darkText">Back to Home</button></Link>}

            </form>
        </div>
    );
}