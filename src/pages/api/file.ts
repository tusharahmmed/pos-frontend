import type {NextApiRequest, NextApiResponse} from "next";
type Data = {
  name: string;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // Process a POST request
    res.json({name: "File uploaded"});
  } else {
    // Handle any other HTTP method
    res.json({name: "Not supported"});
  }
}
