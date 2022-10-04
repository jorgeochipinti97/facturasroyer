import { Box, Typography, Divider, Button, Grid, capitalize } from '@mui/material'
import { useEffect, useState, useRef, FC } from 'react'
import { TableGrid } from '../tablegrid'
import Image from 'next/image'
import html2canvas from 'html2canvas';
import { format } from '../../utils/currency';
import { _InterfaceInvoice } from '../../interface';
import { capitalizarPrimeraLetraPalabras } from '../../utils/capitalize';
import { jsPDF } from "jspdf";

interface Props {
  order: _InterfaceInvoice
}

export const InvoicePage: FC<Props> = ({ order }) => {



  const printRef = useRef<HTMLElement>()

  const handleDownloadImage = async () => {
    const element = printRef.current
    const canvas = await html2canvas(element ? element : document.createElement('div'), {
      allowTaint: true,
      useCORS: true
    })
    const data = canvas.toDataURL(`image/jpg`);
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = data;
      const doc = new jsPDF('p', 'px', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;
      doc.addImage(data, 'jpg', marginX, marginY, canvasWidth, canvasHeight);

      doc.save(`${order.name.trim()
        .replaceAll(' ', '-')
        .replaceAll("'", '')}-RoyerStoreInvoice.pdf`);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };



  return (



    <Box display='flex' flexDirection='column'>
      <Box display='flex' justifyContent='center' sx={{ minHeight: '29.7cm', width: '21cm' }} ref={printRef} flexWrap='wrap'>
        <Box>
          <Box display='flex' flexDirection='column' sx={{ backgroundColor: '#043464' }}>
            <Box display='flex' justifyContent='center' sx={{ ml: 5 }}>
              <Image src='https://res.cloudinary.com/djk4q3tys/image/upload/v1664297333/rkwkiqfct0mjl4q7vfnv.png' width={500} height={200} />
            </Box>
            <Box display='flex' justifyContent='center'>
              <Typography variant='h4' textAlign='center' sx={{ color: 'white' }}>✈️ Worldwide free shipping</Typography>
            </Box>
          </Box>
          <Box >
            <Box>
              <Typography variant='h5' sx={{ textAlign: 'start', color: 'black', m: 1 }}>Order Nº: {order.nOrder}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ width: 800, p: 2 }} >
            <Box display='flex' justifyContent='space-around' sx={{ textAlign: 'justify', mt: 3 }}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='subtitle1' sx={{ fontWeight: 800, color: '#043464' }}>
                  Invoice to:
                </Typography>
                <Typography variant='subtitle1' sx={{ fontWeight: 800, ml: 1, color: 'black' }}>
                  {capitalizarPrimeraLetraPalabras(order.name)}
                </Typography>
              </Box>
              <Box display='flex' flexDirection='column'>
                <Typography variant='subtitle1' sx={{ fontWeight: 800, color: '#043464' }}>
                  Shipping to:
                </Typography>
                <Typography variant='subtitle1' sx={{ fontWeight: 800, ml: 1, color: 'black' }}>
                  {capitalizarPrimeraLetraPalabras(order.address)}
                </Typography>
              </Box>
              <Box display='flex' flexDirection='column'>
                <Typography variant='subtitle1' sx={{ fontWeight: 800, color: '#043464' }}>
                  Date:
                </Typography>
                <Typography variant='subtitle1' sx={{ fontWeight: 800, ml: 1, color: 'black' }}>
                  {`${new Date().toLocaleDateString("en-EN", { year: 'numeric', month: 'long', day: 'numeric' })}`}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
          <TableGrid productos={order.products} />



          <Box display='flex' flexDirection='column' alignItems='end' sx={{ m: 2 }} >
            <Box display='flex' justifyContent='center' sx={{ mt: 2 }} >
              <Typography variant='h5' sx={{ textAlign: 'start', fontWeight: 800, color: 'black' }}>Payment Method: {capitalize(order.paymentMethod)}</Typography>
            </Box>
            <Box display='flex' justifyContent='center' sx={{ mt: 2 }} >
              <Typography variant='h4' sx={{ textAlign: 'start', fontWeight: 800, color: '#043464' }}>Gross total: {format(order.price)} USD</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ m: 1 }} display='flex' flexDirection='column' justifyContent='end' alignSelf='end'>
          <Box display='flex' justifyContent='center'>
            <Image src='/qr.png' width={80} height={80} />
          </Box>
          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', textAlign: 'center' }}>Royer Store</Typography>
          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', textAlign: 'center' }}>Buenos Aires, Argentina</Typography>
        </Box>
      </Box>


      <Box display='flex' justifyContent='center' sx={{ mt: 3 }}>
        <Box>
          <Button
            variant='contained'
            color='success'
            onClick={handleDownloadImage}>
            Descargar
          </Button>
        </Box>
      </Box>
    </Box>


  )
}
