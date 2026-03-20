import { Heart } from "lucide-react";
import { SocialLinks } from "../shared/social-links";

const Footer = () => {
  return (
    <div className="px-3 md:px-24 pb-10">
      <div className=" mx-auto flex flex-col ">
        <div className="text-white text-center font-sans">
          <p className="inline-block max-w-full text-center text-sm: sm:text-base">
            Made with{" "}
            <Heart
              className="inline-block size-5 align-[-0.15em] text-primary"
              aria-hidden
            />{" "}
            using React Vite and Apollo Graphql
          </p>
        </div>
        <div className="border border-white/50 my-4 " />
        <SocialLinks />
        {/* <div></div> */}
      </div>
    </div>
  );
};

export default Footer;
