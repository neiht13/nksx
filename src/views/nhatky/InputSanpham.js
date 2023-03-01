// ** React Imports
import {forwardRef, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import * as dayjs from 'dayjs'
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import BubbleChartOutlinedIcon from '@mui/icons-material/BubbleChartOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import Grid3x3OutlinedIcon from '@mui/icons-material/Grid3x3Outlined';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {useAuthContext} from "../../lib/auth";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Ngày thu hoạch'
                    helperText='Ví dụ: 22/02/2022'
                    fullWidth {...props} />
})

const CustomInput2 = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Hạn sử dụng'
                    helperText='Ví dụ: 22/02/2022'
                    fullWidth {...props} />
})

const ImgStyled = styled('img')(({theme}) => ({
  width: 150,
  height: 150,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
  objectFit: "cover"
}))

const ButtonStyled = styled(Button)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))


const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const InputSanpham = (props) => {
  // ** State
  const { auth } = useAuthContext()
  const { setSpreload} = props;

  const [id, setId] = useState(0)
  const [name, setName] = useState("")
  const [masp, setMasp] = useState("")
  const [cssx, setCssx] = useState("")
  const [chungchi, setChungchi] = useState("")
  const [donggoi, setDonggoi] = useState("")
  const [ngaythuhoach, setNgaythuhoach] = useState(dayjs())
  const [hsd, setHsd] = useState(dayjs())
  const [image, setImage] = useState('2022')
  const [imgSrc, setImgSrc] = useState('')
  const [imgFile, setImgFile] = useState()
  const [user, setUser] = useState(auth);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noti, setNoti] = useState(false);


  useEffect(() => {
    fetch(`http://test.nhanchauthanhdt.vn/api/product/fetch?user=${auth}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        if (data[0]) {
          setId(data[0].id)
          setName(data[0].name)
          setMasp(data[0].masp)
          setCssx(data[0].cssx)
          setChungchi(data[0].chungchi)
          setNgaythuhoach(dayjs(data[0].ngaythuhoach))
          setHsd(dayjs(data[0].hsd))
          setImage(data[0].image)
          setImgSrc("http://test.nhanchauthanhdt.vn/api/filemanagers/download?filename=" + data[0].image)
          setUser(data[0].user)
          setDonggoi(data[0].donggoi)
        }
      })
  }, [user])

  const onChange = file => {
    const reader = new FileReader()
    const {files} = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
      setImgFile(files[0])
      setImage(files[0].name)
    }
  }

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imgFile);
    await fetch('http://test.nhanchauthanhdt.vn/api/filemanagers/upload', {
      method: 'POST',
      body: formData
    }).then(result => {
      return result.json();
    }).then(r => {
      fetch(`http://test.nhanchauthanhdt.vn/api/product/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, name, cssx, user, donggoi, ngaythuhoach: ngaythuhoach.toString(), hsd: hsd.toString(), chungchi, image: r.path}),
        }
      )
        .then((res) => {
          setNoti(true);
          setSpreload(reload => !reload)
        })
    })
  }

  const deleteImage = async () => {
    await fetch('http://test.nhanchauthanhdt.vn/api/filemanagers/delete?filename=' + image).then(result => {
      setImgSrc("")
      setImgFile("")
      setImage("")
      fetch(`http://test.nhanchauthanhdt.vn/api/product/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, name, cssx, user, donggoi, ngaythuhoach: ngaythuhoach.toString(), hsd: hsd.toString() , chungchi, image}),
        }
      )
        .then((res) => {
          setNoti(true);
          setSpreload(reload => !reload)
        })
    })

  }

  const saveForm = async () => {
    if (imgFile) {
      await uploadImage();
    } else {
      await fetch(`http://test.nhanchauthanhdt.vn/api/product/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, name, cssx, user, donggoi, ngaythuhoach: ngaythuhoach.toString(), hsd: hsd.toString() , chungchi, image}),
        }
      )
        .then((res) => {
          setNoti(true);
          setSpreload(reload => !reload)
        })
    }
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
      <form onSubmit={e => {
        e.preventDefault();
        saveForm();
      }}>
        <Grid container spacing={7}>
          <Grid item xs={6}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <ImgStyled src={imgSrc} alt='Hình ảnh'/>
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Tải lên
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
                  Tải lên hình ảnh sản phẩm định dạng jpg/png.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label='Tên Sản phẩm'
              placeholder='Nhập tên sản phẩm địa phương'
              value={name}
              defaultValue={name}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              label='Mã sản phẩm'
              value={masp}
              defaultValue={masp}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label='Đóng gói'
              placeholder='Nhập quy cách đóng gói'
              value={donggoi}
              defaultValue={donggoi}
              onChange={e => setDonggoi(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label='Cơ sở sản xuất'
              value={cssx}
              defaultValue={cssx}
              onChange={e => setCssx(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Loại chứng chỉ</InputLabel>
              <Select label='Loại chứng chỉ' defaultValue={chungchi} value={chungchi}
                      onChange={e => setChungchi(e.target.value)}>
                <MenuItem value='vietgap'>VietGap</MenuItem>
                <MenuItem value='globalgap'>GlobalGAP</MenuItem>
                <MenuItem value='usa'>USDA Organic</MenuItem>
                <MenuItem value='eu'>EU Organic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Ngày thu hoạch"
                inputFormat="DD/MM/YYYY"
                value={ngaythuhoach}
                onChange={date => setNgaythuhoach(date)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Hạn sử dụng"
                inputFormat="DD/MM/YYYY"
                value={hsd}
                onChange={date => setHsd(date)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>

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

export default InputSanpham
