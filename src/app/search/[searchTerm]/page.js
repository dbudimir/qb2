// Utils
import { cleanText, cleanPosts } from '../../../../utils/cleanText'
import { getReturn } from '../../../../utils/getReturn'
import buildQuery from '../../../../utils/buildQuery'

// Components
import LatestPosts from '../../../../components/postgrid/LatestPosts'
import Search from '../../../../components/pages/Search'

const getData = async ({ params }) => {
  const { searchTerm } = params

  const results = await getReturn(
    buildQuery({
      objectType: 'search',
      filter: 'search',
      filterKey: searchTerm,
      fields: ['url', 'title', 'subtype'],
      perPage: 50
    })
  )

  const cleanResults = results
    .map(({ title, url, subtype }) => ({
      title: cleanText(title),
      link: cleanText(url),
      subtype
    }))
    .filter(({ subtype }, i) => ['page', 'post'].some(type => type === subtype))
    .filter((result, index) => index < 10)

  // Generate recent posts
  const latestPosts = await getReturn(
    `${process.env.WP_API}/posts/?per_page=3&_fields=link,excerpt,title,date,jetpack_featured_media_url`
  )

  return {
    searchTerm: decodeURIComponent(searchTerm),
    results: cleanResults,
    posts: cleanPosts(latestPosts)
  }
}

export async function generateMetadata ({ params }) {
  const data = await getData({ params })

  // Capitalize the first letter of each word
  const words = data.searchTerm.split(' ')
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  const searchTerm = capitalizedWords.join(' ')

  return { title: `${searchTerm} Search Results | Queen Ballers` }
}

export default async function SearchPage ({ params }) {
  const data = await getData({ params })

  return (
    <>
      <Search searchResults={data.results} searchTerm={data.searchTerm} />
      <LatestPosts latestPosts={data.posts} />
    </>
  )
}
