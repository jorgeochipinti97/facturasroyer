import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { format } from '../../utils/currency';
import { Box, capitalize, Divider, Typography } from '@mui/material';
import { IProduct } from '../../interface/invoice';
import { FC } from 'react';

interface Props {
    productos: IProduct[]
}

export const TableGrid: FC<Props> = ({ productos }) => {
    return (
        <>
            <Box display='flex' justifyContent='center'>
                    <Table aria-label="simple table" sx={{ width: '90%', m: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ backgroundColor: '#043464', color: 'white' , }}>Name</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#043464', color: 'white' , }}>Description</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#043464', color: 'white' ,}}>Quantity</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#043464', color: 'white' ,}}>Price</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#043464', color: 'white' ,}}>shipping</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productos.map((row) => (
                                <TableRow
                                    key={row.name}
                                >
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold',  }}
                                    >
                                         {capitalize(row.name)}
                                    </TableCell>
                                    <TableCell align="center" sx={{}}  >{row.description.slice(0, 45)}...</TableCell>
                                    <TableCell align="center" sx={{}}>{row.quantity}</TableCell>
                                    <TableCell align="center" sx={{}}>{format(row.price)}</TableCell>
                                    <TableCell align="center" sx={{}}>{format(0)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            </Box>

        </>
    );
}