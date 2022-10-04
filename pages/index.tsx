import { Box, Button, Chip, Divider, TextField, Typography } from '@mui/material';
import type { NextPage } from 'next'
import { useState } from 'react';
import { InvoicePage } from '../components/Invoice/index';
import { _InterfaceInvoice } from '../interface';
import { IProduct } from '../interface/invoice';

const Home: NextPage = () => {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPayMethod] = useState('')
  const [nOrder, setNOrder] = useState(0)
  const [total, setTotal] = useState(0)
  const [products, setProducts] = useState<IProduct[]>([])
  const [nameOfProduct, setNameOfProduct] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)


  const onCreateProduct = () => {
    const newProduct: IProduct = {
      name: nameOfProduct,
      description,
      quantity,
      price
    }
    setProducts(products.concat(newProduct))

  }

  const onDeleteProduct = (name: string) => {
    const newProducts = products.filter(e => e.name != name)
    setProducts(newProducts)
  }

  return (

    <Box>

      <Box sx={{ m: 2, }} display='flex' justifyContent='center'>
        <Box sx={{ m: 2, borderRadius: '10px', border: '1px solid black', width: 500 }}>
          <Typography variant='h3' sx={{ textAlign: 'center', m: 4 }}>Datos de la Factura</Typography>

          <Box display='flex' justifyContent='center'>
            <Box display='flex' flexDirection='column' justifyContent='space-around'>
              <Box>
                <TextField label={'Nombre completo'}
                  sx={{ m: 1 }}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <TextField label='dirección'
                  sx={{ m: 1 }}
                  onChange={(e) => setAddress(e.target.value)}

                />
              </Box>
              <Box>
                <TextField label='Método de Pago'
                  sx={{ m: 1 }}
                  onChange={(e) => setPayMethod(e.target.value)}

                />
              </Box>
              <Box>
                <TextField label='Numero de Orden'
                  sx={{ m: 1 }}
                  onChange={(e) => setNOrder(parseInt(e.target.value))}
                />
              </Box>
              <Box>
                <TextField label='Total' type='number'
                  sx={{ m: 1 }}
                  onChange={(e) => setTotal(parseInt(e.target.value))}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: 'black' }} />
      <Box sx={{ m: 4 }} display='flex' justifyContent='center'>
        <Box sx={{ border: '1px solid black', width: 500, borderRadius: '10px' }}>
          <Typography variant='h3' sx={{ textAlign: 'center', mb: 4, }}>Agregar Producto</Typography>
          <Box display='flex' justifyContent='center'>
            <Box display='flex' flexDirection='column'>
              <Box>
                <TextField label='Nombre'

                  sx={{ m: 1 }}
                  onChange={(e) => setNameOfProduct(e.target.value)}
                />
              </Box>
              <Box>
                <TextField label='descripción'
                  sx={{ m: 1 }}
                  onChange={(e) => setDescription(e.target.value)}

                />
              </Box>
              <Box>
                <TextField label='Precio' type='number'
                  sx={{ m: 1 }}
                  onChange={(e) => setPrice(parseInt(e.target.value))}

                />
              </Box>
              <Box>
                <TextField label='Cantidad' type='number'
                  sx={{ m: 1 }}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}

                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display='flex' justifyContent='center' sx={{ mt: 4 }}>
        <Button onClick={() => onCreateProduct()} variant='contained'>
          agregar producto
        </Button>
      </Box>


      <Box display='flex' justifyContent='center' flexWrap='nowrap' sx={{ m: 3 }}>
        {
          products.map(e => (

            <Box key={e.name} flexWrap='nowrap'>
              <Chip color='success' label={`${e.name} - ${e.quantity} `}
                onDelete={() => onDeleteProduct(e.name)}
                sx={{ m: 1 }}
              />
            </Box>

          ))
        }
      </Box>
      <Divider sx={{ backgroundColor: 'black', mb: 2 }} />
      <Box display='flex' justifyContent='center' sx={{ m: 3 }}>

        <InvoicePage order={{
          name,
          nOrder,
          price: total,
          paymentMethod,
          products,
          address,

        }} />
      </Box>
    </Box>

  )
}

export default Home
