"use client";
import { useState } from "react";
import Image from "next/image";
import MemeSearch from "./MemeSearch";

import type { Memes } from "@prisma/client";
import Link from "next/link";

const MemeList = ({ initMemes }: { initMemes: Memes[] }) => {
  const [memes, setMemes] = useState(initMemes);

  return (
    <div className="w-1/2 mt-4 mx-auto">
      <div className="flex gap-5">
        <MemeSearch {...{ setMemes, initMemes }} />
        <Link
          className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/4 sm:w-1/4 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          href="/new"
        >
          Add new meme
        </Link>
      </div>

      <ul className="flex flex-col items-center	mt-4 gap-10">
        {memes.map(({ id, image_url, title, created_at }, index) => (
          <li
            key={id}
            className="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <Image
              className="rounded-lg"
              src={image_url}
              alt={title}
              width={616}
              height={100}
              priority={index < 3}
            />
            <h2 className="py-3 text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p>{new Date(created_at).toUTCString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemeList;
