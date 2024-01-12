import Admin from '/components/pages/Admin';

export async function generateMetadata({}) {
  return {
    title: `Admin`,
    description: `Admin page for Queen Ballers Club`,
    image: `https://queenballers.club/static/images/qb-background.png`,
    url: `https://queenballers.club/admin`,
  };
}

export default async function AdminPage({}) {
  return <Admin />;
}
