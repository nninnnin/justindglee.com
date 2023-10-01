import axios from "axios";
import {
  GatsbyFunctionRequest,
  GatsbyFunctionResponse,
} from "gatsby";

export default async function proxyHandler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const result = await axios.get(
    `https://justindglee.com/${req.params.address}`
  );

  res.send(result.data);
}
