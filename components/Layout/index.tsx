import { Box } from '@mui/system'
import Head from 'next/head'
import React, { FC } from 'react'
import { Divider, Typography } from '@mui/material';

interface Props {
    title: string,
    children: React.ReactNode
}

export const Layout: FC<Props> = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <Box >
                {children}
            </Box>
            <footer>
                <Box sx={{mt:4}}> 
                    <Divider />
                    <Typography variant='subtitle1' textAlign='center' sx={{m:4,fontWeight:900}}> Development by: Jorge Ochipinti</Typography>
                </Box>
            </footer>
        </>
    )
}
