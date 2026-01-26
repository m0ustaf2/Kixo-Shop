import React from "react";

export default function FromHeader({
  Header,
  subHeader,
  icon,
}: {
  Header: string;
  subHeader: string;
  icon?: React.ReactNode;
}) {
  return (
    <>
      <div className="relative bg-linear-to-br from-purple-600 to-blue-600 p-8 text-white">
        <div className="absolute inset-0 " />
        <div className="relative">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
            {icon}
          </div>
          <h1 className="text-3xl font-bold mb-2">{Header}</h1>
          <p className="text-purple-100">{subHeader}</p>
        </div>
      </div>
    </>
  );
}
