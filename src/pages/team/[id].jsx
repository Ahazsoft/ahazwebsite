import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layouts from "@layouts/Layouts";

import TeamData from "@data/sections/team.json";
import { getAllTeamIds, getSortedTeamData, getTeamData } from "@library/team";

const nameScale = (name) => {
  if (name.length > 18) return "is-long";
  if (name.length > 14) return "is-medium";
  return "is-short";
};

const TeamDetail = ({ postData, index, total, prev, next }) => {
  const [shown, setShown] = useState(false);
  const social = postData.social || [];
  const number = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  useEffect(() => {
    setShown(false);
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, [postData.id]);

  return (
    <Layouts
      pageTitle={postData.name}
      pageDescription={`${postData.name}, ${postData.role} at Ahaz. ${postData.bio}`}
      pageCanonical={`https://ahaz.io/team/${postData.id}`}
    >
      <Head>
        <title>{`${postData.name} | Ahaz`}</title>
      </Head>

      <article className={`ahaz-profile ${nameScale(postData.name)} ${index % 2 ? "is-flip" : ""} ${shown ? "is-shown" : ""}`}>
        <header className="ahaz-profile-mast">
          <div className="ahaz-profile-mast-copy">
            <p className="ahaz-profile-kicker">
              <Link href="/team">Team</Link>
              <span>{number} / {count}</span>
            </p>
            <h1 className="ahaz-profile-name">{postData.name}</h1>
            {postData.role ? <p className="ahaz-profile-role">{postData.role}</p> : null}
          </div>

          <figure className="ahaz-profile-portrait">
            <img src={postData.image} alt={postData.name} />
            {postData.hover_image ? (
              <img className="ahaz-profile-portrait-alt" src={postData.hover_image} alt="" />
            ) : null}
          </figure>
        </header>

        <div className="ahaz-profile-sheet">
          <section className="ahaz-profile-body">
            <h2 className="ahaz-profile-label">Profile</h2>
            <p className="ahaz-profile-bio">{postData.bio}</p>

            {postData.education ? (
              <>
                <h2 className="ahaz-profile-label">Education</h2>
                <p className="ahaz-profile-education">{postData.education}</p>
              </>
            ) : null}

            {social.length ? (
              <>
                <h2 className="ahaz-profile-label">Connect</h2>
                <ul className="ahaz-profile-social">
                  {social.map((item) => (
                    <li key={item.link}>
                      <a href={item.link} target="_blank" rel="noreferrer">
                        <i aria-hidden="true" className={item.icon} />
                        <span>{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>

          <nav className="ahaz-page-navigation" aria-label="Other team members">
            <div className="ahaz-page-navigation-content">
              <Link href={`/team/${prev.id}`} className="page-navigation__prev">
                <span className="ahaz-prev ahaz-hover-2">
                  <i />
                </span>
                <img className="ahaz-page-navigation-photo" src={prev.image} alt="" />
                <span className="ahaz-page-navigation-label">
                  <small>Previous</small>
                  <strong>{prev.name}</strong>
                  <em>{prev.role}</em>
                </span>
              </Link>
              <Link href="/team" className="page-navigation__posts">
                <i className="fas fa-th" />
              </Link>
              <Link href={`/team/${next.id}`} className="page-navigation__next">
                <span className="ahaz-page-navigation-label">
                  <small>Next</small>
                  <strong>{next.name}</strong>
                  <em>{next.role}</em>
                </span>
                <img className="ahaz-page-navigation-photo" src={next.image} alt="" />
                <span className="ahaz-next ahaz-hover-2">
                  <i />
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </article>
    </Layouts>
  );
};

export default TeamDetail;

export async function getStaticPaths() {
  const paths = getAllTeamIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getTeamData(params.id);
  const all = getSortedTeamData();
  const order = (TeamData.homepageIds || [])
    .map((id) => all.find((item) => item.id === id))
    .filter(Boolean);
  const index = Math.max(order.findIndex((item) => item.id === params.id), 0);
  const total = order.length || 1;
  const prev = order[(index - 1 + total) % total];
  const next = order[(index + 1) % total];

  return {
    props: {
      postData,
      index,
      total,
      prev,
      next,
    },
  };
}
