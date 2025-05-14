import Layouts from "@layouts/Layouts";
import dynamic from "next/dynamic";

import { getSortedProjectsData } from "@library/projects-soft";

import PageBanner from "@components/PageBanner";

const ProjectsGrid = dynamic( () => import("@components/ProjectsGrid-Soft"), { ssr: false } );

const Portfolio = (props) => {
  return (
    <Layouts>
      <PageBanner pageTitle={"Our Work"} pageDesc={"Bringing together art and innovative technology to craft unique digital experiences."} />

      <ProjectsGrid projects={props.projects} layout={"grid"} masonry />
      
    </Layouts>
  );
};
export default Portfolio;

export async function getStaticProps() {
  const allProjects = getSortedProjectsData();
  

  return {
    props: {
      projects: allProjects
    }
  }
}