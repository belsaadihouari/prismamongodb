import Head from "next/head";
import Cardsales from "@/component/cardsales";
import "@/app/globals.css";
async function getData() {
  const res = await fetch("http://localhost:3000/api/get/getsalesmany", {
    cache:"no-cache",
    
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
          <Cardsales
            key={index}
            id={item.id}
            title={item.productTitle}
            price={item.price}
            salemen={item.username}
            deleted={item.deleted}
            iduser={item.iduser}
          />
        ))}
      </div>
    </>
  );
}
