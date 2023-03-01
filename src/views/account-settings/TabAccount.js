// ** React Imports
import {useEffect, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import {styled} from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import PlaceIcon from '@mui/icons-material/Place';
import Tooltip from '@mui/material/Tooltip';

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {useAuthContext} from "../../lib/auth";

// import GoogleMapReact from 'google-map-react';
import MapExample from "./MapExample";


const ImgStyled = styled('img')(({theme}) => ({
  width: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({theme}) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const AnyReactComponent = ({text}) => {
  return <div style={{
    position: 'absolute',
    transform: 'translate(-50%, -50%)'
  }}>
    <Tooltip title={"Địa chỉ: " + text}>
      <PlaceIcon sx={{fontSize: "40px !important"}} color={"error"}/>
    </Tooltip>
  </div>
};


const TabAccount = (props) => {
  const {currentUser} = props;

  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('')

  const [id, setId] = useState(0)
  const [username, setUsername] = useState("")
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [donvi, setDonvi] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [noti, setNoti] = useState(false);
  const [maps, setMaps] = useState();

  // const [position, setPosition] = useState();
  const [currentUsers, setCurrentUsers] = useState({})
  const {auth} = useAuthContext()

  useEffect(() => {
    fetch(`http://test.nhanchauthanhdt.vn/api/user/get?user=${auth}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUsers(data[0])
        setName(data[0].name)
        setUsername(data[0].username)
        setDonvi(data[0].donvi)
        setPhone(data[0].phone)
        setRole(data[0].role)
        setImage(data[0].image)
        if (data[0].location) {
          setLat(data[0].location.split(',')[0])
          setLng(data[0].location.split(',')[1])

          setMaps(RenderMap(data[0].location.split(',')[0], data[0].location.split(',')[1]))

          // setPosition([data[0].location.split(',')[0], data[0].location.split(',')[1]]);

        }
        data[0].image && setImgSrc('http://test.nhanchauthanhdt.vn/api/filemanagers/download?filename=' + data[0].image)

      })

  }, [])

  useEffect(() => {
    setMaps(RenderMap(lat, lng))
  }, [lat, lng])

  const onChange = file => {
    const reader = new FileReader()
    const {files} = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
      setImageFile(files[0])
      setImage(files[0].name)
    }
  }

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    await fetch('http://test.nhanchauthanhdt.vn/api/filemanagers/upload', {
      method: 'POST',
      body: formData
    }).then(result => {
      return result.json();
    }).then(r => {
      fetch(`http://test.nhanchauthanhdt.vn/api/user/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: currentUser.id,
            username,
            password: currentUser.password,
            name, phone, donvi,
            role: currentUser.role,
            image: r.path,
            status: currentUser.status,
            location: lat + "," + lng
          }),
        }
      )
        .then((res) => setNoti(true))

    })
  }

  const deleteImage = async () => {
    await fetch('http://test.nhanchauthanhdt.vn/api/filemanagers/delete?filename=' + image).then(result => {
      setImgSrc("")
      setImageFile("")
      setImage("")
      fetch(`http://test.nhanchauthanhdt.vn/api/user/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: currentUser.id,
            username,
            password: currentUser.password,
            name, phone, donvi,
            role: currentUser.role,
            image, status: currentUser.status,
            location: lat + "," + lng
          }),
        }
      )
    })

  }

  const saveForm = async (e) => {
    e.preventDefault();
    if (imageFile) {
      await uploadImage();
    } else {
      await fetch(`http://test.nhanchauthanhdt.vn/api/user/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: currentUser.id,
            username,
            password: currentUser.password,
            name, phone, donvi,
            role: currentUser.role,
            image, status: currentUser.status,
            location: lat + "," + lng
          }),
        }
      )
        .then((res) => setNoti(true))
    }
  }

  const RenderMap = () => {
    return(
      <MapExample center={{lat, lng}} markers={[{lat, lng}]}
                  zoom={15} height={'200px'}
                  address={"Địa chỉ: " + name}
      />
    )
  }

  return (
    <CardContent>
      <Snackbar open={noti} autoHideDuration={2000} onClose={e => {
        setNoti(false)
      }}>
        <MuiAlert elevation={6} variant="filled" severity="success" sx={{width: '100%'}}>
          Chỉnh sửa thành công
        </MuiAlert>
      </Snackbar>
      <form onSubmit={saveForm}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{marginTop: 4.8, marginBottom: 3}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <ImgStyled src={imgSrc} alt="Ảnh đại diện"/>
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Tải lên ảnh đại diện
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={deleteImage}>
                  Xóa ảnh
                </ResetButtonStyled>
                <Typography variant='body2' sx={{marginTop: 5}}>
                  Tải lên hình ảnh chứng chỉ định dạng jpg/png.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField value={username} disabled fullWidth label='Tài khoản'/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField value={name} onChange={e => setName(e.target.value)} required fullWidth label='Tên'/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='number' value={phone} label='Số điện thoại'
                       placeholder='(0888) 888-888' onChange={e => setPhone(e.target.value)}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Quyền</InputLabel>
              <Select label='Quyền' value={role} disabled>
                <MenuItem value='ADMIN'>Quản trị</MenuItem>
                <MenuItem value='USER'>Người dùng</MenuItem>
                <MenuItem value='MASTER'>Toàn quyền</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select label='Trạng thái' value={currentUser.status} disabled>
                <MenuItem value='ACTIVE'>Hoạt động</MenuItem>
                <MenuItem value='INACTIVE'>Không hoạt động</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Địa chỉ' value={donvi}
                       onChange={e => setDonvi(e.target.value)}/>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField sx={{marginRight: 10}} label='Vĩ độ' placeholder={10.456529} value={lat}
                       onChange={e => setLat(e.target.value)}/>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField label='Kinh độ' value={lng} placeholder={105.635585}
                       onChange={e => setLng(e.target.value)}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <RenderMap/>
          </Grid>

          {/*{openAlert ? (*/}
          {/*  <Grid item xs={12} sx={{ mb: 3 }}>*/}
          {/*    <Alert*/}
          {/*      severity='warning'*/}
          {/*      sx={{ '& a': { fontWeight: 400 } }}*/}
          {/*      action={*/}
          {/*        <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>*/}
          {/*          <Close fontSize='inherit' />*/}
          {/*        </IconButton>*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>*/}
          {/*      <Link href='/' onClick={e => e.preventDefault()}>*/}
          {/*        Resend Confirmation*/}
          {/*      </Link>*/}
          {/*    </Alert>*/}
          {/*  </Grid>*/}
          {/*) : null}*/}

          <Grid item xs={12}>
            <Button type="submit" variant='contained' sx={{marginRight: 3.5}}>
              Lưu
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Xóa
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
