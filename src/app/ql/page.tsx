"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import useSWR from "swr";
import AppTable from "../components/app.table";

const QL = () => {

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR(
    "http://127.0.0.1:5000/users",
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
