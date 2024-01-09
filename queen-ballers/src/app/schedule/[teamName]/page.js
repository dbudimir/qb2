import _ from 'lodash';
import { cleanText, cleanHead, cleanPosts } from '/utils/cleanText';
import { getReturn, getPage } from '/utils/getReturn';

import buildQuery from '/utils/buildQuery';
import { parseMetadata } from '/utils/parseMetadata';

import WNBATeamSchedule from '/components/pages/WNBATeamSchedule';

// export async function generateMetadata() {
//   // Data fetch here should be cached
//   const data = await getData();

//   const head = cleanHead(
//     data.head,
//     `/wnba-free-agency`,
//     data.jetpack_featured_media_url
//   );

//   return parseMetadata(head);
// }

export default async function WNBASchedulePage({}) {
  // const data = await getData();

  return <WNBATeamSchedule />;
}
