import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const PostTable = ({ posts, onPostClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID Usuario</TableCell>
            <TableCell>Contenido del Post</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post, index) => (
            <TableRow
              key={post.id}
              onClick={() => onPostClick(post.title, post.body)}
              sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }} //we alternate between gray and white in the table results (rows)
            >
              <TableCell>{post.userId}</TableCell>
              <TableCell>{post.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PostTable;
