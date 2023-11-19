import axios from "axios";
import {
  GatsbyFunctionRequest,
  GatsbyFunctionResponse,
} from "gatsby";

export default async function deployHandler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const result = await axios.post(
    `https://api.netlify.com/build_hooks/64c1ed047fcba84073242316`
  );

  res.send(result.data);
}
