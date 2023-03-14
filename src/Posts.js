import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';



const Posts = () => {
    const url = "https://dummyjson.com/posts";
    const [postData, setPostData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(url)
            result.json().then(data => setPostData(data.posts))
        }
        fetchData()
    }, []);

    const handleChangePage = (newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
      };



    return (
        <>
            <Paper elevation={10} sx={{ width: "80%", margin: "100px auto" }}>
                <Typography variant='h4' className='head'>Dummy Table</Typography>
                <TableContainer sx={{ padding: "20px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>User Id</TableCell>
                                <TableCell>Reactions</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Body</TableCell>
                                <TableCell>Tag 1</TableCell>
                                <TableCell>Tag 2</TableCell>
                                <TableCell>Tag 3</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                postData && postData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell>{post.id}</TableCell>
                                        <TableCell>{post.userId}</TableCell>
                                        <TableCell>{post.reactions}</TableCell>
                                        <TableCell>{post.title}</TableCell>
                                        <TableCell>{post.body}</TableCell>
                                        <TableCell>{post.tags[0]}</TableCell>
                                        <TableCell>{post.tags[1]}</TableCell>
                                        <TableCell>{post.tags[2]}</TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5,10, 20, 30]}
                    count={postData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    )
}

export default Posts