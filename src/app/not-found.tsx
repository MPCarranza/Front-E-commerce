import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <Image
        src="https://estaticosgn-cdn.deia.eus/clip/dea7463b-7304-4a45-9d77-0851e0c6bcd4_16-9-discover-aspect-ratio_default_0.jpg"
        className="absolute object-cover w-full h-full"
        alt="shakira"
      />
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
        <div className="relative z-10 flex flex-col items-center w-full font-mono">
          <h1 className="mt-[120px] text-5xl font-extrabold leading-tight text-center text-white">
            Whoops, site not found!
          </h1>
          <p className="mt-10 font-extrabold text-white text-8xl my-[30px] animate-bounce">
            404
          </p>
          <Link href="/">
            <h2 className="m-[0px] text-xl font-extrabold leading-tight text-center text-white underline">
              Go back home!
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
