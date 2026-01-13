import Image from "next/image";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="relative max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      {/* Background Map */}
      <div className="hero-map absolute inset-0 -z-10 bg-[url('/pattern-bg.png')] bg-cover bg-center opacity-40 sm:opacity-100" />

      {/* LEFT SIDE */}
      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <Image
          src="/camp.svg"
          alt="camp"
          width={50}
          height={50}
          className="absolute left-0 top-0 sm:-top-10 md:-top-20 w-8 sm:w-10 md:w-12"
        />

        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-[88px] font-bold leading-tight">
          Truno Camp Area
        </h1>

        <p className="mt-6 text-gray-400 font-medium xl:max-w-[520px]">
          We want to be on each of your journeys seeking the satisfaction of
          seeing the incorruptible beauty of nature. We can help you on an
          adventure around the world in just one app
        </p>

        {/* Stars & Reviews */}
        <div className="my-11 flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap-2 relative">
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Image
                  src="/star.svg"
                  key={index}
                  alt="star"
                  height={24}
                  width={24}
                />
              ))}
          </div>
          <p className="font-bold text-lg text-blue-700">
            198k
            <span className="font-normal text-lg ml-1 underline">
              Excellent Reviews
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex w-full flex-col sm:flex-row gap-3">
          <Button type="button" title="Download App" variant="btn-green" />
          <Button
            type="button"
            title="How we Work?"
            icon="/play.svg"
            variant="btn-white-text"
          />
        </div>

        {/* Info Box */}
        <div className="mt-8 xl:mt-0 xl:absolute xl:bottom-[130px] xl:left-[55%] sm:left-[50%] md:left-[52%] lg:left-[58%] xl:left-[70%] w-[240px]">
          <div className="relative flex flex-col xl:flex-none">
            <div className="flex w-full flex-col gap-8 rounded-3xl bg-gray-900 px-7 py-8">
              {/* Location */}
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-200">Location</p>
                <Image src="/close.svg" alt="close" width={24} height={24} />
              </div>
              <p className="font-bold text-white">Aguas canlients</p>

              {/* Distance & Elevation */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="font-medium text-gray-200">Distance</p>
                  <p className="font-bold text-white">173.28 mi</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-gray-200">Elevation</p>
                  <p className="font-bold text-white">2.040 km</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
