import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";

const Home: NextPage = () => {
  return (
    <Layout title="OpenJira | Welcome UwU">
      <Typography variant="h1" color="primary">
        Hola Mundo
      </Typography>
    </Layout>
  );
};

export default Home;
