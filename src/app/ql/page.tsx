"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import useSWR from "swr";
import AppTable from "../components/app.table";
import axios from "axios";

const QL = () => {

  const fetcher = (url: string) =>
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`).then((res) => res.data);
  
  const { data, error, isLoading, mutate } = useSWR(
    "/users",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const router = useRouter();

  const handlebtn = () => {
    router.push("/");
  };
  
if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <AppTable users={data} mutate={mutate} />
    </div>
  );
};

export default QL;
