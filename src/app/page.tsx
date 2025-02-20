// import Image from "next/image";
// import styles from "./page.module.css";
"use client";

import Link from "next/link";
import AppTable from "./components/app.table";
import useSWR from "swr";
import Image from 'next/image'

export default function Home() {

  return (
    <div>
      <Image 
  src="/trangchu.JPG"
  alt="Mô tả hình ảnh"
  width={1000}  // Giá trị tạm, không ảnh hưởng do layout responsive
  height={600}
  style={{ width: '100%', height: 'auto' }}
/>
    </div>
  );
}
