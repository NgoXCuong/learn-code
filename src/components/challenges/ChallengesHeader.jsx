import React from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";

const ChallengesHeader = () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Trang chủ", href: "/" }, { label: "Thử thách" }]}
      />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-exo">
              Thử thách lập trình
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-1 font-exo">
              Rèn luyện kỹ năng và leo bảng xếp hạng cùng mọi người
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChallengesHeader;
