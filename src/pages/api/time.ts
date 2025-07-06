import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const date = new Date();
  res.json({ date: date.toLocaleDateString() });
};

export default handler;
