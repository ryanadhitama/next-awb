import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Airway Bill Tracker</title>
      </Head>
      <div className="max-w-[600px] container mx-auto px-5 md:px-0">
        <div className="pt-10">
          <h2 className="text-3xl mb-1 font-medium">Airway Bill Tracker</h2>
          <p className="text-gray-400 font-light text-xl">
            Effortless Tracking, Seamless Deliveries.
          </p>
        </div>
        <form>
          <div className="my-3 grid grid-cols-2 gap-3">
            <input
              placeholder="Ex : 10008263285439"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
            />
            <select
              placeholder="Courier"
              className="bg-white mt-1 px-4 py-2 pr-4 border border-gray-300 rounded-md block w-full"
            >
              <option value="anteraja">Anteraja</option>
            </select>
          </div>
          <button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            Search
          </button>
        </form>
      </div>
    </>
  );
}
