import React, { useState, useRef } from "react";
import image from "../Assests/image.jpeg";
import "./styles.css"; // Import your CSS file

export const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    const [loading, setLoading] = useState(false);
    let inputRef = useRef(null);
    const API_SECRET_KEY = process.env.REACT_APP_API_SECRET_KEY;

    const imageGenerator = async () => {
        if (!inputRef.current.value.trim()) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "https://api.openai.com/v1/images/generations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_SECRET_KEY}`,
                        "User-Agent": "Chrome",
                    },
                    body: JSON.stringify({
                        prompt: inputRef.current.value.trim(),
                        n: 1,
                        size: "512x512",
                    }),
                }
            );

            let data = await response.json();
            let data_array = data.data;
            setImage_url(data_array[0].url);

            // Update the image URL state with the generated image URL
            if (data?.images?.[0]?.url) {
                setImage_url(data.images[0].url);
            }
        } catch (error) {
            console.error("Error generating image:", error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col m-auto items-center mt-[80px] mb-[20px] gap-[30px]">
            <div className="text-3xl font-medium text-center">
                AI image <span className="text-[#DE1B89] ">generator</span>
                <div className="flex flex-col">
                    <div>
                        <img src={image_url === "/" ? image : image_url} alt="" className="p-10"/>
                    </div>
                    <div className="p-2 ml-10">
                        <div className="loading-bar-container">
                            <div className={loading ? "loading-bar animate-loading-bar" : "loading-bar"}></div>
                        </div>
                    </div>
                    <div className="w-[80%] mx-auto h-[95px] flex justify-around align-center rounded-full bg-[#1F3540]">
                        <input
                            type="text"
                            placeholder="Describe what you want to say"
                            ref={inputRef}
                            className="h-[60%] w-[40%] my-auto text-sm text-white pl-[35px] mr-[35px] bg-transparent rounded-full"
                        />
                        <div onClick={imageGenerator} className="text-sm text-[white] flex items-center justify-center bg-[#DE1B89] rounded-full w-[50%] h-[100%] cursor-pointer">
                            Generate
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
