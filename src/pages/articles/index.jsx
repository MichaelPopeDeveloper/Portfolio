import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import dayjs from 'dayjs';

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/article/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.created_at}
          className="md:hidden"
          decorate
        >
          {dayjs(article.created_at).format('MMMM D, YYYY')}
        </Card.Eyebrow>
        <Card.Description>{article.excerpt}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.created_at}
        className="mt-1 hidden md:block"
      >
        {dayjs(article.created_at).format('MMMM D, YYYY')}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Articles - Michael Pope</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more."
        />
      </Head>
      <SimpleLayout
        title="Writing on software design, company building, and the content creation."
        intro="All of my long-form thoughts on programming, leadership, product design, and more."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {

  const ghostRes = await fetch('https://michael-pope-developer.ghost.io/ghost/api/v3/content/posts?key=143c78f5906205a54bf79c23af');
  const { posts } = (await ghostRes.json());

  return {
    props: {
      articles: posts?.map(({ component, ...meta }) => meta),
    },
  }
}
