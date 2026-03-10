import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { Button, Card } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";

const performers = [
  {
    name: "Rubell",
    role: "Physics Teacher",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rubell",
  },
  {
    name: "Hassan",
    role: "Math Teacher",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan",
  },
  {
    name: "Sania",
    role: "English Teacher",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sania",
  },
];

const students = [
  {
    name: "Tenesa",
    role: "XII A",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tenesa",
  },
  {
    name: "Talha",
    role: "XII B",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Talha",
  },
];

const arrowBtn =
  "flex items-center justify-center rounded-full bg-white text-gray-600 shadow p-0 w-6 h-6 min-w-0 min-h-0";

const ProfileAndPerformance = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {/* Performer Card */}
      <Card
        bordered={false}
        className="rounded text-center shadow-lg p-6 bg-[#526BB1] text-white h-full"
      >
        {/* Title */}
        <h3 className="text-sm font-semibold tracking-wide">Best Performer</h3>

        {/* Swiper */}
        <Swiper
          slidesPerView={1}
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop
          speed={700}
          navigation={{ nextEl: ".performer-next", prevEl: ".performer-prev" }}
          className="mt-4"
        >
          {performers.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold">{item.name}</h2>
                <p className="text-sm opacity-80 mb-3">{item.role}</p>

                {/* Arrows */}
                <div className="flex gap-6 mb-4">
                  <Button
                    type="default"
                    className={`${arrowBtn} performer-prev`}
                    icon={<ChevronLeft size={14} />}
                  />
                  <Button
                    type="default"
                    className={`${arrowBtn} performer-next`}
                    icon={<ChevronRight size={14} />}
                  />
                </div>

                {/* Image */}
                <div className="w-full h-40 flex justify-center">
                  <img
                    src={item.img}
                    className="h-full object-contain drop-shadow-xl"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Card>

      {/* Student Card */}
      <Card
        bordered={false}
        className="rounded text-center shadow-lg p-6 bg-[#64C4B2] text-white h-full"
      >
        <h3 className="text-sm font-semibold tracking-wide">Star Student</h3>

        <Swiper
          slidesPerView={1}
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop
          speed={700}
          navigation={{ nextEl: ".student-next", prevEl: ".student-prev" }}
          className="mt-4"
        >
          {students.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold">{item.name}</h2>
                <p className="text-sm opacity-80 mb-3">{item.role}</p>

                <div className="flex gap-6 mb-4">
                  <Button
                    type="default"
                    className={`${arrowBtn} student-prev`}
                    icon={<ChevronLeft size={14} />}
                  />
                  <Button
                    type="default"
                    className={`${arrowBtn} student-next`}
                    icon={<ChevronRight size={14} />}
                  />
                </div>

                <div className="w-full h-40 flex justify-center">
                  <img
                    src={item.img}
                    className="h-full object-contain drop-shadow-xl"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Card>
    </div>
  );
};

export default ProfileAndPerformance;
