/* eslint-disable tailwindcss/classnames-order */
"use client";
import React, { useEffect } from "react";

import Prism from "prismjs";
import parse from "html-react-parser";

// import "prismjs/components/prism-javascript";

interface props {
  data: string;
}

const ParseHtml = ({ data }: props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return <div className="dark:text-light-700 text-dark-400  body-regular">{parse(data)}</div>;
};

export default ParseHtml;
