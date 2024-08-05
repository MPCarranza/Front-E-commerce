import React from "react";

const Landing: React.FC = () => {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center text-center text-white px-5">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-gray-800">
          <video
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
            src="https://videos.pexels.com/video-files/3209829/3209829-uhd_2560_1440_25fps.mp4"
            autoPlay
            muted
            loop
          ></video>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        </div>
        <div className="relative z-10">
          <h1 className="font-light text-6xl mb-4">Buy Future</h1>
          <h3 className="text-2xl mb-4">Technology of Tomorrow, today</h3>
          <a
            href="/home"
            className="inline-block px-8 py-3 bg-[#5A3BC3] text-white rounded hover:scale-95 transition-transform"
          >
            Buy now
          </a>
        </div>
      </section>
    </>
  );
};

export default Landing;
