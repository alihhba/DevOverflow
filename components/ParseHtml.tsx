/* eslint-disable tailwindcss/classnames-order */
"use client";
import React, { useEffect } from "react";

import Prism from "prismjs";
import parse from "html-react-parser";


import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-c";
// import "prismjs/components/prism-php";
// import "prismjs/components/prism-django";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-ruby";

interface props {
  data: string;
}

const ParseHtml = ({ data }: props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="dark:text-light-700 text-dark-400  paragraph-regular leading-6 md:leading-8">
      {parse(data)}
    </div>
  );
};

export default ParseHtml;
