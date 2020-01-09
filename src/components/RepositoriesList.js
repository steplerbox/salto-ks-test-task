import React from 'react';
import List from '@material-ui/core/List';
import TablePagination from '@material-ui/core/TablePagination';

import RepositoriesListItem from './RepositoriesListItem';

export default function RepositoriesList({ items, totalCount, page, rowsPerPage, onChangePage }) {
  return (
    <>
      <TablePagination
        component='div'
        count={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
        onChangePage={onChangePage}
      />

      <List>
        {items.map(repository => (
          <RepositoriesListItem key={repository.id} repository={repository}/>
        ))}
      </List>
    </>
  )
}
