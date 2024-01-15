import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    waybill: "",
    courier: "anteraja",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [error, setError] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult();
    setError();
    try {
      const data = await fetch("/api/waybill", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        if (response.ok) {
          return response.json();
        }
        const err = await response.json();
        setError(err.message);
      });
      if (data) {
        setResult(data);
      }
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Airway Bill Tracker</title>
      </Head>
      <div
        className={`max-w-[600px] container mx-auto px-5 md:px-0 ${
          !result && "h-[100svh] flex justify-center flex-col items-center"
        }`}
      >
        <div className="w-full">
          <div className="pt-10">
            <h2 className="text-3xl mb-1 font-medium">Airway Bill Tracker</h2>
            <p className="text-gray-400 font-light text-xl">
              Effortless Tracking, Seamless Deliveries.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="my-3 grid grid-cols-2 gap-3">
              <input
                value={formData.waybill}
                onChange={handleChange}
                name="waybill"
                placeholder="Ex : 10008263285439"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              />
              <select
                value={formData.courier}
                onChange={handleChange}
                name="courier"
                placeholder="Courier"
                className="bg-white mt-1 px-4 py-2 pr-4 border border-gray-300 rounded-md block w-full"
              >
                <option value="anteraja">AnterAja</option>
                <option value="jne">JNE</option>
                <option value="pos">POS</option>
                <option value="wahana">Wahana</option>
                <option value="jnt">JNT</option>
                <option value="sicepat">SiCepat</option>
                <option value="ninja">Ninja</option>
                <option value="lion">Lion Parcel</option>
              </select>
            </div>
            <button
              disabled={loading}
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Search
            </button>
          </form>
          <div className="my-5 flex-col flex gap-3">
            {loading && <div className="text-center py-10">Loading</div>}
            {error && (
              <div className="text-center py-10 text-red-400">{error}</div>
            )}
            {result?.summary && (
              <div className="border border-dashed border-gray-500 rounded px-6 py-5">
                <div>
                  <span className="font-medium">Waybill Number : </span>
                  {result?.summary?.waybill_number}
                </div>
                <div>
                  <span className="font-medium">Courier : </span>
                  {result?.summary?.courier_name}
                </div>
                <div>
                  <span className="font-medium">Receiver Name : </span>
                  {result?.summary?.receiver_name}
                </div>
              </div>
            )}
            {result &&
              result?.manifest?.map((m, i) => (
                <div
                  className="border border-gray-200 rounded px-6 py-5"
                  key={`m-${i}`}
                >
                  <div className="font-medium">{m?.manifest_description}</div>
                  <div className="font-light text-gray-500 text-sm">
                    {m?.manifest_date} {m?.manifest_time}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
