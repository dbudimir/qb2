// Utils
import { getPage } from '/utils/getReturn';
import { cleanHead } from '/utils/cleanText';
import { parseMetadata } from '/utils/parseMetadata';

// Components
import Shop from '/components/pages/Shop';

const getData = async ({ params }) => {
  const { slug } = params;

  const shopPages = {
    shorts: 23156,
    shoes: 23225,
    shirts: 23227,
    pants: 23229,
    basketballs: 23231,
    hoodies: 23237,
  };
  //
  const page = await getPage(shopPages[slug]);

  return {
    content: page.content.rendered,
    title: page.title.rendered,
  };
};

export async function generateMetadata({ params }) {
  const { slug } = params;

  const shopPages = {
    shorts: 23156,
    shoes: 23225,
    shirts: 23227,
    pants: 23229,
    basketballs: 23231,
    hoodies: 23237,
  };
  //
  const page = await getPage(shopPages[slug]);
  const head = await cleanHead(
    page.yoast_head,
    `/shop/${slug}`,
    'https://queenballers.club/static/images/qb-background.png'
  );
  return parseMetadata(head);
}

const ShopPage = async ({ params }) => {
  const { content, title } = await getData({ params });

  return <Shop content={content} title={title} />;
};

export default ShopPage;
