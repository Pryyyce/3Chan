import { useEffect, useState, } from "react";
import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Buffer } from 'buffer'; 
import { v4 as uuidv4 } from 'uuid';

export function NewComment(props) {
  const [contents, setContents] = useState("Hello world!");
  const [commenterName, setCommenterName] = useState("Anonymous");
  const [isSubmitted, setIsSubmitted] = useState(false); // [isSubmitted, setIsSubmitted
  const [isPending, setIsPending] = useState(false);
  const thread_id = useParams().threadId;

  // props stuff
  const comments = props.comments;
  const setComments = props.setComments;

  const handleSubmit = (e) => {
    e.preventDefault();
    const _id = uuidv4();
    const comment = { contents, commenterName, _id };
    setIsPending(true);
    fetch(`http://localhost:3001/threads/${thread_id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    }).then((response) => {
      console.log("new comment added");
      
      setIsSubmitted(true);
      setComments([...comments, comment]);
    });
    
  };
  
  return (
    <div className="container mx-auto bg-bGround max-w-lg  shadow border p-4 m-5 border-none text-center">
      <form
        className="bg-baseObj m-2 border-double border-2 border-darkText mx-auto my-7 max-w-[500px] "
        onSubmit={handleSubmit}
      >
        <label className="text-lightText text-center font-bold p-2 ">Alias</label>
        <br></br>
        <textarea
          type="text"
          rows="1"
          className="m-3 rounded-lg border-2 border-darkText bg-baseObj  min-w-[350px] max-w-[400px] text-lightText text-center p-2"
          value={commenterName}
          onChange={(e) => setCommenterName(e.target.value)}
          required
        />
        <br></br>
        <label className="text-lightText text-center font-bold p-2">Body</label>
        <br></br>
        <textarea
          type="text"
          rows="2"
          className="m-3  rounded-lg border-2 border-darkText bg-baseObj min-w-[350px] max-w-[400px] text-lightText text-center p-2"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          required
        />
        <br></br>
        {!isPending && (
          <button className="bg-baseObj text-lightText text-center m-3 p-2 rounded-lg border-2 border-darkText">
            Submit
          </button>
        )}
        {isSubmitted && (
          <Link to="..">
            <button className="bg-baseObj text-lightText text-center m-3 p-2 rounded-lg border-2 border-darkText">
              Back
            </button>
          </Link>
        )}
      </form>
    </div>
  );
}

export function Thread(props) {
  const [thread, setThread] = useState([]);
  const comments = props.comments;
  const setComments = props.setComments;
  const thread_id = useParams().threadId;
  const [base64String, setBase64String] = useState("");

  useEffect(() => {
    async function getThread() {
      const response = await fetch(
        `http://localhost:3001/threads/${thread_id}`
      );
      const data = await response.json();
      console.log(data);
      setThread(data);

      if (data.data) {
        console.log(data);
        const newBase64String = Buffer.from(data.data).toString("base64");
        setBase64String(
          newBase64String
        );
      } else {
        // mark image field as unpopulated if user didn't upload one
        setBase64String("undefined");
      }
    }
    getThread();
  }, []);

  function getImage() {
    
    if (base64String === "undefined") {
      // if no image uploaded, use default
      return (
        <img
          src={require("./3Clogo.png")}
          width="200"
          height="200"
          className="mx-auto"
          alt=""
        />
      );
    } else {
      // if image was uploaded, use that
      return (
        <img
          src={`data:${thread.contentType};base64,${base64String}`}
          width="200"
          height="200"
          className="mx-auto"
          alt=""
        />
      );
    }
  }

  useEffect(() => {
    async function getThreadComments() {
      const response = await fetch(
        `http://localhost:3001/threads/${thread_id}/comments`
      );
      const data = await response.json();
      setComments(data);
    }
    getThreadComments();
  }, []);
  return (
    <>
      <div className="max-w-lg bg-bGround mx-auto my-5 py-3">
        <div className="text-left text-lightText mx-7 py-3">
          {thread.poster}
        </div>

        <div className="p-2  m-3 my-2 text-center text-[20px] text-lightText bg-baseObj">
          {thread.title}
        </div>

        <div>{getImage()}</div>

        <div className="p-2  m-3 my-2 text-center text-[17px] text-darkText bg-baseObj">
          {thread.contents}
        </div>
      </div>
      <div className="flex space-around container   mx-auto max-w-[400px]">
        <Link
          className="container mx-auto bg-bGround max-w-[150px] text-darkText text-center p-2"
          to="/threads"
        >
          <div className="container mx-auto bg-bGround max-w-[150px] text-darkText text-center">
            Back to Home
          </div>
        </Link>

        <Link
          className="container mx-auto bg-bGround max-w-[150px] text-darkText text-center p-2"
          to="newComment"
        >
          <div className="container mx-auto bg-bGround max-w-[150px] text-darkText text-center">
            New Comment
          </div>
        </Link>
      </div>
      {<Outlet />}
      <div className="max-w-lg bg-bGround mx-auto my-3 py-1">
        {comments.map((comment) => (
          <div className="bg-baseObj shadow border-darkText border-2 border-double my-5 mx-2">
            {comment.replyToId !== undefined && (
              <div className="text-left text-lightText py-1 px-3">
                Reply to : {comment.replyToId}
              </div>
            )}
            <div className="text-left px-3  font-outline-2">
              {comment.commenterName}
            </div>
            <div className="text-left mx-2 p-3 text-darkText">
              {comment.contents}
            </div>
            <div className="text-left mx-2 p-1 font-outline-3 text-darkText">
              CID: {comment._id}
            </div>
            <div className="text-left mx-2 p-1 font-outline-3 text-darkText">
              <Link to={`comments/${comment._id}/reply`}>reply</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
