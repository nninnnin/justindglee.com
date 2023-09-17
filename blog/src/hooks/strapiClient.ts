import axios from "axios";

const strapiClient = axios.create({
  baseURL: `${process.env.GATSBY_STRAPI_API_URL}`,
  headers: {
    authorization: `Bearer ${process.env.GATSBY_STRAPI_TOKEN}`,
  },
});

export default strapiClient;
