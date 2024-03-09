import React from "react";
import image from "../Assests/image.jpeg";

export const ImageGenerator = () => {
  return (
    <div className="flex flex-col m-auto items-center mt-[80px] mb-[20px] gap-[30px]">
      <div className="text-3xl font-medium text-center">
        AI image <span className="text-[#DE1B89] ">generator</span>
        <div className="flex flex-col">
          <div>
            <img src={image} alt="" className="h-[30%] w-[50%] mx-auto py-6" />
          </div>
          <div className="w-[90%] mx-auto h-[95px] flex justify-around align-center rounded-full bg-[#1F3540]">
            <input
              type="text"
              placeholder="Describe what you want to say"
              className="h-[60%] w-[40%] my-auto text-sm text-white pl-[35px] mr-[35px] bg-transparent rounded-full"
            />
            <div className="text-sm text-[white] flex items-center justify-center bg-[#DE1B89] rounded-full w-[50%] h-[100%] cursor-pointer">
              Generate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
