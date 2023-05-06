//holds all the threads
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Buffer } from 'buffer';

export function Threads() {
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    async function getThreads() {
      const response = await fetch("http://localhost:3001/threads/");
      const data = await response.json();
      setThreads(data);
    }
    getThreads();
  }, []);

  function getThreadImage(thread) {
    console.log("getThreadImage called with arguments:", thread);

    if (!thread) {
      return <></>;
    }
  
    if (thread.data) {
      const base64String = Buffer.from(thread.data.data).toString("base64");

      return (
        <img
          src={`data:${thread.contentType};base64,${base64String}`}
          width="200"
          height="200"
          className="mx-auto"
          alt=""
        />
      );
    } else {
      return (
        <img
          src={require("./3Clogo.png")}
          width="200"
          height="200"
          className="mx-auto"
          alt=""
        />
      );
    }
  }

  return (
    <>
      <div>
        <div className="container mx-auto bg-bGround max-w-lg  shadow border p-4 m-5 border-none">
          <div className="flex justify-between">
            <img src={require("./3Clogo.png")} width="50" height="50" />
            <h1 className="text-darkText text-center m-3 text-xl">
              {" "}
              Welcome to 3Chan!{" "}
            </h1>
            <img src={require("./3Clogo.png")} width="50" height="50" />
          </div>
        </div>

        <div className="flex space-around container mx-auto max-w-[400px] m-5">
          <div className="container mx-auto bg-bGround max-w-[150px] text-darkText text-center">
            <Link className="text-center" to="/">
              {" "}
              Hide Threads
            </Link>
          </div>

          <div className="container mx-auto bg-bGround max-w-[150px] text-darkText text-center">
            <Link className="text-center" to="/newThread">
              {" "}
              New Thread
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-lg mx-auto shadow bg-bGround">
        <div className="grid threadGrid gap-4 py-4 px-3">
          {threads.map((thread) => (
            <div key={thread._id}>
            <Link to={`${thread._id}`}>
              <div
                key={thread._id}
                className="container border-double border-2 border-darkText min-h-[150px] text-center  bg-baseObj p-1 mx-1"
              >
                <h1 className="text-[10px] text-lightText">
                  {thread.poster}:posted
                </h1>
                <div className="container bg-bGround mx-auto   max-w-[100px] p-1 m-2">
                  {getThreadImage(thread)}
                </div>
                <h1 className="text-[10px] text-darkText">{thread.title}</h1>
              </div>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
