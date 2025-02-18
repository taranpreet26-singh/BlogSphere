import React from "react";

type CardType={
    name:string,
    title:string,
    subtitle:string,
    date:string,
    content:string
}
const Cards:React.FC<CardType> = ({name,title,subtitle,date,content}) => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
          {name.substring(0,1).toUpperCase()}
        </div>
        <div className="text-gray-700 font-semibold">{name}</div>
      </div>

      <div className="mt-4 text-xl font-bold text-gray-900 leading-tight">
        {title}
      </div>

      <p className="mt-2 text-gray-600 text-sm">
        {subtitle}
      </p>
      <p className="mt-2 text-gray-600 text-sm whitespace-pre-wrap  ">
        {content.substring(0,21)}
      </p>

      <div className="mt-4 text-gray-500 text-xs">Posted On : {date.substring(0,date.indexOf('T'))} </div>
    </div>
  );
};

export default Cards;
