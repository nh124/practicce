import Navbar from "~/Components/Navbar";
import Head from "next/head";
import AddItem from "~/Components/AddItem";

const SellAnItem: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Navbar />
        <AddItem />
      </main>
    </>
  );
};

export default SellAnItem;
