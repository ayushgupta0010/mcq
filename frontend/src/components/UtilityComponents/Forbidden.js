import React, { useEffect } from "react";

const Forbidden = () => {
  useEffect(() => {
    let script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return (
    <div className='container my-3'>
      <div
        className='tenor-gif-embed'
        data-postid='17209394'
        data-share-method='host'
        data-aspect-ratio='0.86875'
        data-width='100%'
      />
    </div>
  );
};

export default Forbidden;
