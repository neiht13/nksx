// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/lab/Skeleton";
import * as React from "react";
import {useEffect, useState} from "react";
import {useAuthContext} from "../../lib/auth";

const Cardproduct = () => {

  const { auth } = useAuthContext()
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://test.nhanchauthanhdt.vn/api/product/fetch?user=${auth}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setProduct(data[0])
      })
  }, [])


  const Loading = () => {
    return (
      <Box>
        <Skeleton variant="rectangular" width={210} height={118}/>
        <Skeleton/>
        <Skeleton width="60%"/>
      </Box>
    )
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardMedia sx={{ height: '12.625rem' }} image={product&&'http://test.nhanchauthanhdt.vn/api/FileManagers/download?filename='+ product.image} />
      <Avatar
        alt='Robert Meyer'
        src='/images/avatars/3.png'
        sx={{
          width: 75,
          height: 75,
          left: '20%',
          top: '10.28125rem',
          position: 'absolute',
          border: theme => `0.25rem solid ${theme.palette.common.white}`
        }}
      />
      <CardContent>
        {loading && <Loading/>}
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            ml: '16%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6'>{product.name}</Typography>
            <Typography variant=''>{product.cssx}</Typography>
          </Box>
          {/*<Button variant='contained'>Send Request</Button>*/}
        </Box>
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            Tiêu chuẩn:
          </Typography>
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            Đóng gói:
          </Typography>
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            Ngày thu hoạch:
          </Typography>
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            Hạn sử dụng:
          </Typography>

        </Box>
        <Divider/>
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography  sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            {product.chungchi}
          </Typography>
          <Typography  sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            {product.donggoi}
          </Typography>
          <Typography  sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            {product.ngaythuhoach}
          </Typography>
          <Typography  sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            {product.hsd}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Cardproduct
