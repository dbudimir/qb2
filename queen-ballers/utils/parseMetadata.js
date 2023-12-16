import { JSDOM } from 'jsdom'

const parseMetadata = htmlString => {
  const dom = new JSDOM(htmlString)
  const doc = dom.window.document

  const metadata = {
    title: doc.querySelector('title').textContent || '',
    description: doc.querySelector('meta[name="description"]').content || '',
    openGraph: {
      title: doc.querySelector('meta[property="og:title"]').content || '',
      description:
        doc.querySelector('meta[property="og:description"]').content || '',
      url: doc.querySelector('meta[property="og:url"]').href || '',
      siteName:
        doc.querySelector('meta[property="og:site_name"]').content || '',
      images: [
        {
          url: doc.querySelector('meta[property="og:image"]').content || '',
          width:
            doc.querySelector('meta[property="og:image:width"]').content || 0,
          height:
            doc.querySelector('meta[property="og:image:height"]').content || 0
        }
      ],
      locale: doc.querySelector('meta[property="og:locale"]').content || '',
      type: doc.querySelector('meta[property="og:type"]').content || ''
    }
  }

  return metadata
}

module.exports = { parseMetadata }
