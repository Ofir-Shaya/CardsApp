import React from "react";
import PageHeader from "./common/PageHeader";

const About = () => {
  return (
    <PageHeader
      title={
        <>
          <span>
            Cards <i className="bi bi-geo-fill"></i> App
          </span>
        </>
      }
      description="As a full stack web development student, Ofir was excited to finally be working on his first big project. He had spent the last year learning about front-end technologies such as HTML, CSS, and JavaScript, as well as back-end technologies such as Python, PHP, and SQL. He was ready to put all of his knowledge to the test as he designed and built a full-featured web application from scratch. Ofir worked closely with his project manager to define the requirements and scope of the project, and spent countless hours coding and debugging to ensure that everything was just right. Despite the challenges he faced along the way, Ofir persevered and was proud of the final result - a beautifully designed and seamlessly functioning web application that he knew would be a valuable asset to the client."
    />
  );
};

export default About;
