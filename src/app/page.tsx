"use client";

import Link from "next/link";
import AppTable from "./components/app.table";
import useSWR from "swr";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="/trangchu.JPG"
        alt="Mô tả hình ảnh"
        width={1000}
        height={600}
        style={{ width: "100%", height: "auto", margin: "10px" }}
      />
    </div>
  );
}
