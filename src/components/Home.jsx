import { Typography } from "@mui/material";
import PageHeader from "./common/PageHeader";

const Home = () => {
  return (
    <>
      <PageHeader
        title={
          <>
            <span>
              Cards <i className="bi bi-geo-fill"></i> App
            </span>
          </>
        }
        description="As a full stack web development student, Ofir was excited to finally be working on his first big project. Read more in about..."
      />
      <Typography variant="h2" component="h2">
        Welcome to my home page
      </Typography>
    </>
  );
};

export default Home;
