import Head from "next/head";
import Card from "@/component/card";
import "@/app/globals.css";
async function getData() {
  const res = await fetch("http://localhost:3000/api/get/getmany", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Pageone() {
  const posts = await getData();

  return (
    <>
      <Head>
        <title>Prisma APP</title>
        <meta name="description" content="use prisma orm" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container border">
        {posts.map((item, index) => (
          <Card
            key={index}
            id={item.id}
            username={item.username}
            email={item.email}
          />
        ))}
      </div>
    </>
  );
}
