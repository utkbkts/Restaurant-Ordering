import imgHero from "/hero/hero.png";
import { useLocation } from "react-router-dom";
import { cn } from "../../utils/TailwindMerge";
import PropTypes from "prop-types";
const Hero = ({
  title,
  titleClass,
  subTitleClass,
  subTitle,
  titleMainClass,
  classNameHero,
}) => {
  const pathname = useLocation().pathname;
  return (
    <section className={cn("bg-hero", classNameHero)}>
      <div className="flex items-center justify-center h-full w-full">
        <div
          className={cn(
            "flex-1 flex flex-col items-start gap-4 justify-center py-4 px-7",
            titleMainClass
          )}
        >
          <h1
            className={cn(
              "text-[64px] font-[800] leading-[77px] text-white",
              titleClass
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "text-[16px] leading-[24px] text-white  text-center",
              subTitleClass
            )}
          >
            {subTitle}
          </p>
          {pathname === "/" && (
            <button className="py-3 px-4 rounded-md bg-[#FEA116] text-white hover:bg-[#c47f17] transition-all duration-300">
              Şimdi Rezervasyon Yap
            </button>
          )}
        </div>
        {pathname === "/" && (
          <div className="flex-[2] items-center justify-center flex hero-active">
            <img
              src={imgHero}
              alt=""
              className="w-[400px] h-[400px] animate-spin "
            />
          </div>
        )}
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
  subTitleClass: PropTypes.string,
  subTitle: PropTypes.string,
  titleClass: PropTypes.string,
  titleMainClass: PropTypes.string,
  className: PropTypes.string,
  classNameHero: PropTypes.string,
};

export default Hero;
