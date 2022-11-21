import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
  YouTubeIcon,
} from '@/components/SocialIcons'
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';


function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/article/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.created_at} decorate>
        {dayjs(article.created_at).format('MMMM D, YYYY')}
      </Card.Eyebrow>
      <Card.Description>{article.excerpt.split(" ").splice(0, 36).join(" ")}...</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
      onSubmit={subscribeNewsletter}
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

function Resume({ Resume }) {

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {Resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <img src={role?.url} width="150" height="150" alt="" className="h-7 w-7" />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.Company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.Title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.Start?.label ?? role.Start} until ${role.End?.label ?? role.End
                  }`}
              >
                <time dateTime={role.Start?.dateTime ?? role.Start}>
                  {role.Start?.label ?? role.Start}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.End?.dateTime ?? role.End}>
                  {role.End?.label ?? role.End}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function Photos({ Carousel }) {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {Carousel.map((image, imageIndex) => (
          <div
            key={image.url}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length]
            )}
          >
            <img
              src={image.url}
              width={image.width}
              height={image.height}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home({ articles, PageTitle, MainHeader, MainSubtext, TwitterUrl, GitHubUrl, LinkedInUrl, InstagramUrl, YouTubeUrl, Resume: JobHistory, Carousel }) {
  return (
    <>
      <Head>
        <title>
          {PageTitle}
        </title>
        <meta
          name="description"
          content={PageTitle}
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {MainHeader}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {MainSubtext}
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href={TwitterUrl}
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href={InstagramUrl}
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href={GitHubUrl}
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href={LinkedInUrl}
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href={YouTubeUrl}
              aria-label="Subscribe on YouTube"
              icon={YouTubeIcon}
            />
          </div>
        </div>
      </Container>
      <Photos Carousel={Carousel} />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume Resume={JobHistory} />
          </div>
        </div>
      </Container>
    </>
  )
}

function subscribeNewsletter(e) {
  e.preventDefault();
  const email = e.target.email.value;

  // Admin API key goes here
  const key = '6361ecc8dc0a53003d04930d:e194a63c4903d573ef3d70d9ce9250a547f3ffe74d68987e8a74554aa1b9adbb';

  // Split the key into ID and SECRET
  const [id, secret] = key.split(':');

  // Create the token (including decoding secret)
  const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: `/admin/`
  });

  fetch('https://michael-pope-developer.ghost.io/ghost/api/admin/members', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Ghost ${token}`
    },
    body: JSON.stringify({ members: [{ email }] }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    }
    )
    .catch((error) => {
      console.error('Error:', error);
    }
    );
}

export async function getStaticProps() {
  const STRAPI_API = process.env.STRAPI_API;

  // Fetch data from external API
  const res = await fetch(`${STRAPI_API}/api/home-page?populate=Resume.Logo&populate=Avatar&populate=Resume.Logo&populate=Carousel`);
  const data = await res.json();

  console.dir(data, { depth: null });

  const ghostRes = await fetch('https://michael-pope-developer.ghost.io/ghost/api/v3/content/posts?key=143c78f5906205a54bf79c23af');
  const ghostData = await ghostRes.json();

  const { PageTitle, MainHeader, MainSubtext, TwitterUrl, GitHubUrl, LinkedInUrl, InstagramUrl, YouTubeUrl, Resume, Carousel } = data.data.attributes;

  return {
    props: {
      PageTitle,
      MainHeader,
      MainSubtext,
      TwitterUrl,
      GitHubUrl,
      LinkedInUrl,
      InstagramUrl,
      YouTubeUrl,
      Resume: Resume.map((role) => ({
        ...role,
        url: `${process.env.STRAPI_API}${role.Logo?.data?.attributes?.url}`,
      })),
      articles: ghostData?.posts
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
      Carousel: Carousel.data?.map((image) => {
        console.log(image);
        return ({
          url: `${process.env.STRAPI_API}${image.attributes.url}`,
          width: image.attributes.width,
          height: image.attributes.height,
        })
      })
    },
  }
}



