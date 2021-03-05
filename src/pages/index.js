import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { baseUrl } from '../../docusaurus.config';

const features = [
  {
    title: 'Real-World Use Cases',
    imageUrl: 'img/global.svg',
    description: (
      <>
        Use cases mainly collected directly from the field and customer experiences.
      </>
    ),
  },
  {
    title: 'Community Driven',
    imageUrl: 'img/evangelize.svg',
    description: (
      <>
        Completely open-source, and built upon the efforts of the CIAM community.
      </>
    ),
  },
  {
    title: 'Simply Readable',
    imageUrl: 'img/docs.svg',
    description: (
      <>
        Quick and simple examples to unfold your own solutions.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div class={clsx('col col--6', styles.heroIntro)}>
              <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                  <Link
                    className={clsx(
                      'button button--outline button--secondary button--lg',
                      styles.getStarted,
                    )}
                    to={useBaseUrl('docs/')}>
                    Read Now
                  </Link>
                </div>
            </div>
            <div class="col col--6">
              <img src={useBaseUrl('img/cookbook-cover.png')} className="hero__cover" alt="Cover of Cookbook"/>
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
