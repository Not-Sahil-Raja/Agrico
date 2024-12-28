import React from "react";
import { motion } from "framer-motion";

const reviewData = [
  {
    name: "Priya Sharma",
    email: "[email address removed]",
    date: "2023-12-15",
    review:
      "Agrico Framers is a fantastic platform that has helped me learn so much about sustainable farming practices. The courses are well-structured and informative, and the instructors are knowledgeable and passionate. I've  already noticed a difference in the yield of my crops since implementing the techniques I've learned. Thanks, Agrico!",
  },
  {
    name: "Rahul Kumar",
    email: "[email address removed]",
    date: "2024-01-10",
    review:
      "I'm impressed with the variety of courses offered on Agrico Framers. There's something for everyone, from beginners to experienced farmers. I recently completed the course on organic pest control and found it to be very helpful. I'm now using organic methods to keep pests at bay and  am seeing great results. Keep up the good work, Agrico!",
  },
  {
    name: "Aisha Kapoor",
    email: "[email address removed]",
    date: "2024-02-22",
    review:
      "Agrico Framers has been a game-changer for me! I never thought I could learn so much about agriculture online. The platform is user-friendly and accessible, and the courses are engaging and informative. I've particularly enjoyed the courses on soil health and water management.  Thanks to Agrico, I'm now feeling more confident and empowered to manage my farm more effectively.",
  },
  {
    name: "Sunil Patel",
    email: "[email address removed]",
    date: "2023-11-21",
    review:
      "Agrico Framers is a breath of fresh air for Indian agriculture. The platform provides valuable knowledge in our local languages, making it accessible to farmers across the country. I've learned new techniques for dairy farming and  am  already seeing an improvement in milk production. Thank you, Agrico!",
  },
  {
    name: "Meena Devi",
    email: "[email address removed]",
    date: "2024-01-25",
    review:
      "I enrolled in Agrico Framers with some skepticism, but I'm pleasantly surprised! The platform offers practical and up-to-date information on various agricultural topics. The course on vegetable gardening was particularly helpful,  and I'm now enjoying a bountiful harvest of fresh vegetables in my own backyard.",
  },
  {
    name: "Rajeev Singh",
    email: "[email address removed]",
    date: "2024-02-08",
    review:
      "Agrico Framers has been a valuable resource for me as I transition into organic farming. The platform provides in-depth explanations of organic principles and practices.  The course on composting has been instrumental  in creating nutrient-rich fertilizer for my crops. I highly recommend Agrico  to anyone looking to embrace sustainable farming.",
  },
  {
    name: "Manisha Joshi",
    email: "[email address removed]",
    date: "2023-12-07",
    review:
      "Agrico Framers has rekindled my passion for agriculture! The platform offers a supportive online community where farmers can connect and share their experiences. I've learned so much from other farmers  on the platform, in addition to the valuable information in the courses. Thank you, Agrico, for creating a space for farmers to learn and grow together!",
  },
  {
    name: "Vikram Malhotra",
    email: "[email address removed]",
    date: "2024-01-18",
    review:
      "As a young farmer, I find Agrico Framers to be an invaluable resource. The platform offers affordable and accessible education,  which is crucial for new farmers like me. The courses  on precision agriculture have been particularly eye-opening,  and I'm excited to implement these techniques to optimize my farm's yield.",
  },
  {
    name: "Swati Das",
    email: "[email address removed]",
    date: "2024-02-15",
    review:
      "Agrico Framers has empowered me to take control of my farm's financial health. The platform offers courses on farm business management and marketing,  which  have helped me make informed decisions about my crops and pricing strategies.  I'm now seeing a significant increase in my farm's profitability. Thank you, Agrico!",
  },
  {
    name: "Amit Yadav",
    email: "[email address removed]",
    date: "2023-10-29",
    review:
      "Agrico Framers has made a significant impact on my poultry farming practices. The platform offers comprehensive courses on poultry health, nutrition, and breeding.  Since implementing the techniques I've learned, I've seen a notable improvement in the health and  productivity of my flock. I highly recommend Agrico Framers to any poultry farmer looking to  enhance their operations.",
  },
  {
    name: "Neha Gupta",
    email: "[email address removed]",
    date: "2024-01-04",
    review:
      "As a woman in agriculture, I appreciate the supportive and inclusive environment of Agrico Framers. The platform empowers female farmers  by providing them with the knowledge and resources needed to succeed. The course on women's leadership in agriculture  has been particularly inspiring, and I'm now actively involved in promoting sustainable farming practices within my community. Thank you, Agrico!",
  },
];

const Reviews = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Heading Part  */}
      <div className=" w-full sm:h-[25%] sm:py-0 py-4 h-fit mb-10  flex flex-col justify-center items-center font-Archivo">
        <h1 className="sm:text-[5vh] text-2xl mb-4 font-semibold">
          Our Beloved Members
        </h1>
        <h4 className="sm:px-[17%] sm:leading-right mt-2 leading-tight text-center text-black/65 font-medium">
          Enhance your skills and knowledge with our diverse learning styles
          including videos, courses, downloadable guides, and live sessions with
          experts.
        </h4>
      </div>
      <div className=" w-full h-fit overflow-hidden py-2 relative rounded-2xl">
        <div className=" w-full h-full absolute from-[#05050505] to-[#2c422f8c]  bg-gradient-to-b z-30" />
        <motion.div
          className="flex space-x-4 pb-8 w-fit"
          animate={{ x: ["0%", "-60%", "0%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {reviewData.map((review, index) => (
            <div
              className=" w-80 bg-white rounded-2xl flex flex-col p-4 drop-shadow-md text-gray-800 mb-4 md:mb-0 font-Archivo"
              key={index}
            >
              <div className="flex flex-col leading-none font-semibold mb-2">
                <span className="text-lg">{review.name}</span>
                <span className="text-sm font-medium text-gray-600">
                  {review.email}
                </span>
              </div>
              <p className="text-sm leading-snug overflow-hidden text-ellipsis">
                {review.review}
              </p>
            </div>
          ))}
        </motion.div>
        <motion.div
          className="flex space-x-4 pb-8 w-fit"
          animate={{ x: ["0%", "-65%", "0%"] }}
          transition={{
            duration: 45,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            repeatDelay: 0.5,
            easings: "easeInOut",
          }}
        >
          {reviewData.map((review, index) => (
            <div
              className=" w-80 bg-white rounded-2xl flex flex-col p-4 drop-shadow-md text-gray-800 mb-4 md:mb-0 font-Archivo"
              key={index}
            >
              <div className="flex flex-col leading-none font-semibold mb-2">
                <span className="text-lg">{review.name}</span>
                <span className="text-sm font-medium text-gray-600">
                  {review.email}
                </span>
              </div>
              <p className="text-sm leading-snug overflow-hidden text-ellipsis">
                {review.review}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews;
