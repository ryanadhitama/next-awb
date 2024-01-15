export default async function handler(req, res) {
  const host = process.env.NEXT_PUBLIC_RAJAONGKIR_HOST;
  const key = process.env.NEXT_PUBLIC_RAJAONGKIR_KEY;
  try {
    const { waybill, courier } = req.body;
    const response = await fetch(`${host}/waybill`, {
      method: "POST",
      body: JSON.stringify({
        waybill,
        courier,
        key,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!data?.rajaongkir?.result) {
      res.status(400).json({ message: data?.rajaongkir?.status?.description });
    }
    res.status(200).json(data?.rajaongkir?.result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
