import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>CAT ROOM</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <div className="center">
        <h1 className="title">A server used for various projects</h1>
        <a href="https://github.com/kaliiiiiiiiii/vercel_utils_server" className="link">Repo</a>
      </div>
    </>
  );
}
