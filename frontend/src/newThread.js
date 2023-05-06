import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


export function NewReply(props) {
  const [contents, setContents] = useState("Anonymous");
  const [commenterName, setCommenterName] = useState("Hello World!");
  const [isSubmitted, setIsSubmitted] = useState(false); // [isSubmitted, setIsSubmitted
  const [isPending, setIsPending] = useState(false);
  const [replyToId, setReplyToId] = useState(""); // [comment, setComment
  const { threadId, commentId } = useParams([]);

  // props stuff
  const comments = props.comments;
  const setComments = props.setComments;


  const handleSubmit = (e) => {
    e.preventDefault();
    const _id = uuidv4();
    const comment = { contents, commenterName, replyToId, _id};
    setIsPending(true);
    fetch(`http://localhost:3001/threads/${threadId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    }).then(() => {
      console.log("new comment added");
      setComments([...comments, comment]);
      setIsSubmitted(true);
    });
  };
  useEffect(() => {
    setReplyToId(commentId);
  }, [commentId]);
  return (
    <div className="container mx-auto bg-bGround max-w-lg  shadow border p-4 m-5 border-none text-center">
      <form
        className="bg-baseObj m-2 border-double border-2 border-darkText mx-auto my-7 max-w-[500px] "
        onSubmit={handleSubmit}
      >
        <label className="text-lightText text-center font-bold ">Reply to</label>
        <br></br>

        <label className="text-lightText text-center ">{replyToId}</label>

        <br></br>
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

export function NewThread() {
  const [title, setTitle] = useState("Untitled");
  const [contents, setContents] = useState("Hello World!");
  const [poster, setPoster] = useState("Anonymous");
  const [isSubmitted, setIsSubmitted] = useState(false); // [isSubmitted, setIsSubmitted
  const [isPending, setIsPending] = useState(false);
  const [fileSizeError, setFileError] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const fileExtension = file.type;
    const acceptedFileExtensions = ["image/png", "image/jpeg"];
    const maxSize = 1024 * 1024; // 1 MB
  
    if (!acceptedFileExtensions.includes(fileExtension)) {
      setFileError(true);
      alert(" Invalid file type. Please upload a .png or .jpeg file.");
    } else if (file.size > maxSize) {
      setFileError(true);
      alert("File size is too large. Please upload a file less than 1 MB.");
    } else {
      setFileError(false);
      // Do something with the file
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var imagedata = document.querySelector('input[type="file"]').files[0];

    // make sure something gets sent, even if user didn't upload anything
    // if (typeof imagedata === "undefined") imagedata = require("./3Clogo.png");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contents", contents);
    formData.append("poster", poster);
    formData.append("file", imagedata);

    setIsPending(true);

    fetch("http://localhost:3001/threads", {
      method: "POST",
      body: formData,
    }).then(() => {
      console.log("new thread added");

      setIsSubmitted(true);
    });
  };

  return (
    <div className="container mx-auto bg-bGround max-w-lg  shadow border p-4 m-5 border-none text-center">
      <form
        encType="multipart/form-data"
        className="bg-baseObj m-2 border-double border-2 border-darkText mx-auto my-7 max-w-[400px] p-5"
        onSubmit={handleSubmit}
      >
        <label className="text-lightText text-center font-bold text-lg">Title</label>
        <br></br>
        <textarea
          type="text"
          rows="3"
          className=" rounded-lg m-3 border-2 border-darkText bg-baseObj text-lightText text-center p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br></br>
        <label className="text-lightText text-center font-bold text-lg">Image (Optional)</label>
        <br></br>
        <input type="file" name="Image" accept="image/png, image/jpeg" className="m-3 rounded-lg border-2 border-darkText bg-baseObj text-lightText text-center p-2" onChange={(e) => handleFileUpload(e)}/>
        <br></br>
        {fileSizeError && <p className="m-3 bg-baseObj border-darkText text-center p-2" style={{ color: "red" }}>File size must be less than 1MB. Accepted formats: PNG, JPEG</p>}

        <label className="text-lightText text-center font-bold text-lg">Alias</label>
        <br></br>
        <textarea
          type="text"
          rows="1"
          className="m-3  rounded-lg border-2 border-darkText bg-baseObj text-lightText text-center p-2"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
        />
        <br></br>
        <label className="text-lightText text-center font-bold text-lg">Body</label>
        <br></br>
        <textarea
          type="text"
          rows="11"
          className="m-3  rounded-lg border-2 border-darkText bg-baseObj text-lightText text-center p-2"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          required
        />
        <br></br>
        {!isPending && !fileSizeError && (
          <button className="bg-baseObj text-lightText text-center m-3 p-2 rounded-lg border-2 border-darkText">
            Submit
          </button>
        )}
        {isSubmitted && (
          <Link to="/threads">
            <button className="bg-baseObj text-lightText text-center m-3 p-2 rounded-lg border-2 border-darkText">
              Back to Home
            </button>
          </Link>
        )}
      </form>
    </div>
  );
}
