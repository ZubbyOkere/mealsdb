import Image from "next/image";
import Link from "next/link";
import React from "react";
import heroimg from "../../public/1674498764655.jpeg";

const Hero = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row items-center gap-x-20 gap-y-10">
        <div className="my-10 md:my-20 w-full text-center md:text-start order-2 md:order-1">
          <h1 className="capitalize text-4xl leading-10">
            find the perfect <br />{" "}
            <span className="text-pink-600  capitalize">Food recipe</span> for
            you
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum,
            voluptates!
          </p>

          <div className="my-10 md:my-5 flex gap-x-5 items-center">
            <Link href={`/meals`}>
              <button className="btn capitalize hover:bg-blue-700">explore meals</button>
            </Link>
            <Link href={`/savedmeals`}>
              <button className="btn capitalize bg-red-500 hover:bg-red-900">saved meals</button>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <Image
            src={heroimg}
            className="w-full"
            width={500}
            height="500"
            alt="hero image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
