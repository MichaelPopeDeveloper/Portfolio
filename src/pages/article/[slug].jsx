import { ArticleLayout } from "@/components/ArticleLayout";
const parse = require('html-react-parser');

export default function Article({ article }) {

    return <ArticleLayout meta={{ ...article }}>
        {parse(article?.html)}
    </ArticleLayout>
};

export async function getStaticPaths() {
    const ghostRes = await fetch('https://michael-pope-developer.ghost.io/ghost/api/v3/content/posts?key=143c78f5906205a54bf79c23af');
    const { posts } = (await ghostRes.json());
    return {
        paths: posts?.map(({ slug }) => `/article/${slug}`) || [],
        fallback: false,
    };
};

export async function getStaticProps({ params }) {
    const { slug } = params;
    const articleData = await fetch(`https://michael-pope-developer.ghost.io/ghost/api/v3/content/posts/slug/${slug}?key=143c78f5906205a54bf79c23af`);
    const {posts} = await articleData.json();

    return {
        props: {
            article: posts?.[0] ?? null,
        }
    }
}