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
import Tooltip from "@mui/material/Tooltip";
import PlaceIcon from "@mui/icons-material/Place";
import GoogleMapReact from "google-map-react";
import MapExample from "../account-settings/MapExample";

const Cardproduct = (props) => {
 const { spreload, auth, setMasp} = props;
  const [product, setProduct] = useState({});
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://test.nhanchauthanhdt.vn/api/product/fetch?user=${auth}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setProduct(data[0] || {})
        setMasp && setMasp(data[0].masp)
      })
    fetch(`http://test.nhanchauthanhdt.vn/api/user/get?user=${auth}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setUser(data[0] || {})
      })
  }, [spreload, auth])

  const AnyReactComponent = ({text}) => {
    return <div style={{  position: 'absolute',
      transform: 'translate(-50%, -50%)'}}>
      <Tooltip title={"Địa chỉ: " + text}>
        <PlaceIcon sx={{fontSize: "40px !important"}} color={"error"}/>
      </Tooltip>
    </div>
  };


  const RenderMap = () => {
    let lat = user.location && parseFloat(user.location.split(',')[0]) || 0;
    let lng = user.location && parseFloat(user.location.split(',')[1]) || 0;

      return(
        <MapExample center={{lat, lng}} markers={[{lat, lng}]}
                    zoom={15} height={'200px'}
                    address={"Địa chỉ: " + user.name}
        />
      )
  }


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
    <>
    {product.id && <Card sx={{ position: 'relative'}}>
      <CardMedia sx={{ height: '12.625rem' }} image={product && product.image && 'http://test.nhanchauthanhdt.vn/api/FileManagers/download?filename='+ product.image} />
      <Avatar
        alt='Robert Meyer'
        src={user && user.image && 'http://test.nhanchauthanhdt.vn/api/FileManagers/download?filename='+ user.image}
        sx={{
          width: 150,
          height: 150,
          left: '10%',
          top: '10.28125rem',
          position: 'absolute',
          border: theme => `0.25rem solid ${theme.palette.common.white}`
        }}
      />
      <CardContent>
        {loading && <Loading/>}
        <Box
          sx={{
            marginTop: "6rem",
            marginBottom: "2.2rem",
            ml: '10%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5'>{product.cssx}</Typography>
            <Typography variant='subtitle1'>{user.name}</Typography>
            <Typography variant='subtitle2'>{user.donvi}</Typography>
          </Box>
          {/*<Button variant='contained'>Send Request</Button>*/}
        </Box>
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          {product.chungchi && <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            Tiêu chuẩn:
          </Typography>}
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            Đóng gói:
          </Typography>
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            Thu hoạch:
          </Typography>
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            HSD:
          </Typography>

        </Box>
        <Divider/>
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          {product.chungchi && <Typography  sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            {product.chungchi}
          </Typography>}
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
        <Divider/>
        <Box>
          <RenderMap/>
        </Box>
      </CardContent>
    </Card>
    }
  </>
  )
}

export default Cardproduct
