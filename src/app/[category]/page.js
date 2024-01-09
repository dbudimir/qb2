import { redirect } from 'next/navigation';

export default function CategoryPage({ homePage, posts, category }) {
  redirect('/', 'push');

  return <></>;
}
