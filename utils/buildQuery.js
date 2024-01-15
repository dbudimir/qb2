// Makes it a little easier to build query strings for the WP api
const buildQuery = (queryParams) => {
  const {
    objectType,
    fields,
    filter,
    filterKey,
    perPage,
    page,
    before,
    after,
    order,
    orderby,
  } = queryParams;

  const selectedFilter = filter ? `${filter}=${filterKey}` : '';
  const selectedFields = fields ? `${fields.join()}` : '';
  const selectedPerPage = perPage ? `,&per_page=${perPage}` : '';
  const selectedBefore = before ? `&before=${before}` : '';
  const selectedAfter = after ? `&after=${after}` : '';
  const selectedOrder = order ? `&order=${order}` : '';
  const selectedOrderby = orderby ? `&orderby=${orderby}` : '';
  const pageNumber = page ? `&page=${page}` : '';

  const query = `https://queenballers.wpcomstaging.com/wp-json/wp/v2/${objectType}?${selectedFilter}&_${selectedFields}${selectedPerPage}${pageNumber}${selectedBefore}${selectedAfter}${selectedOrderby}${selectedOrder}`;

  return query;
};

export default buildQuery;
