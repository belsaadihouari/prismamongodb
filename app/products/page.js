import Head from "next/head";
import Cardproduct from "@/component/cardproduct";
import "@/app/globals.css";
async function getData() {
  const res = await fetch("http://localhost:3000/api/get/getproductmany", {
    cache:"no-cache"
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Products() {
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
          <Cardproduct
            key={index}
            id={item.id}
            title={item.title}
            descrip={item.description}
            createdBy={item.user.username}
            deleted={item.user.deleted}
            iduser={item.user.id}
          />
        ))}
      </div>
    </>
  );
}
