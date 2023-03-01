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
import {useAuthContext} from "../../lib/auth";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Hiệu lực'
                    helperText='Ví dụ: 22/02/2022'
                    fullWidth {...props} />
})

const ImgStyled = styled('img')(({theme}) => ({
  width: 169,
  height: 200,
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

const InputChungnhan = () => {
  // ** State
  const { auth } = useAuthContext()


  const [id, setId] = useState(0)
  const [nsx, setNsx] = useState("")
  const [cssx, setCssx] = useState("")
  const [chungchi, setChungchi] = useState(null)
  const [tieuchuan, setTieuchuan] = useState("")
  const [masp, setMasp] = useState("")
  const [dientich, setDientich] = useState("")
  const [diachi, setDiachi] = useState("")
  const [hieuluc, setHieuluc] = useState(dayjs())
  const [image, setImage] = useState('')
  const [user, setUser] = useState(auth)

  const [imgSrc, setImgSrc] = useState('')
  const [imgFile, setImgFile] = useState(null)
  const [muavu, setMuavu] = useState('2022')
  const [noti, setNoti] = useState(false);

  useEffect(()=>{
    fetch(`http://test.nhanchauthanhdt.vn/api/chungnhan/fetch?user=${auth}`)
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          setId(data[0].id)
          setNsx(data[0].nsx)
          setCssx(data[0].cssx)
          setMasp(data[0].masp)
          setChungchi(data[0].chungchi)
          setTieuchuan(data[0].tieuchuan)
          setDiachi(data[0].diachi)
          setDientich(data[0].dientich)
          setHieuluc(data[0].hieuluc && dayjs(data[0].hieuluc))
          setImage(data[0].image)
          setImgSrc("http://test.nhanchauthanhdt.vn/api/filemanagers/download?filename=" + data[0].image)
          setUser(auth)
        }
      })
  },[])


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
      fetch(`http://test.nhanchauthanhdt.vn/api/chungnhan/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, nsx, cssx, dientich, diachi, chungchi, tieuchuan, hieuluc: hieuluc.toString(), user, masp, image}),
        }

      )
        .then((res) => setNoti(true))
    })
  }

  const deleteImage = async () => {
    await fetch('http://test.nhanchauthanhdt.vn/api/filemanagers/delete?filename=' + image).then(result => {
      setImgSrc("")
      setImgFile("")
      setImage("")
      fetch(`http://test.nhanchauthanhdt.vn/api/chungnhan/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, nsx, cssx, dientich, diachi, chungchi, tieuchuan, hieuluc: hieuluc.toString(), user, masp, image}),
        }
      )
        .then((res) => setNoti(true))
    })

  }

  const saveForm = async () => {
    if (image) {
      await uploadImage();
    } else {
      await fetch(`http://test.nhanchauthanhdt.vn/api/chungnhan/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, nsx, cssx, dientich, diachi, chungchi, tieuchuan, hieuluc: hieuluc.toString(), user, masp, image}),
        }
      )
        .then((res) => setNoti(true))

    }
  }




  return (
    <CardContent>
      <form onSubmit={e => {
        e.preventDefault();
        saveForm()
      }}>
        <Grid container spacing={7}>
          <Snackbar open={noti} autoHideDuration={2000} onClose={e => {
            setNoti(false)
          }}>
            <MuiAlert elevation={6} variant="filled" severity="success" sx={{width: '100%'}}>
              Chỉnh sửa thành công
            </MuiAlert>
          </Snackbar>
          <Grid item xs={12} sm={6}>
            <Grid>
            <TextField
              fullWidth
              required
              label='Tên cơ sở sản xuất'
              value={cssx}
              onChange={e => setCssx(e.target.value)}
            />
            </Grid>
            <Grid sx={{paddingTop: "1.75rem"}}>
            <TextField
              fullWidth
              required
              label='Người sản xuất'
              value={nsx}
              onChange={e => setNsx(e.target.value)}
            />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Địa chỉ'
              multiline
              minRows={3}
              value={diachi}
              onChange={e => setDiachi(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Diện tích'
              minRows={3}
              value={dientich}
              onChange={e => setDientich(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Loại chứng chỉ</InputLabel>
              <Select label='Loại chứng chỉ' defaultValue='vietgap' value={tieuchuan} onChange={e=>{setTieuchuan(e.target.value)}}>
                <MenuItem value='vietgap'>VietGap</MenuItem>
                <MenuItem value='globalgap'>GlobalGAP</MenuItem>
                <MenuItem value='usa'>USDA Organic</MenuItem>
                <MenuItem value='eu'>EU Organic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Tên chứng chỉ'  value={chungchi} onChange={e=>{setChungchi(e.target.value)}} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Ngày thực hiện"
                inputFormat="DD/MM/YYYY"
                value={hieuluc}
                onChange={date => setHieuluc(date)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <ImgStyled src={imgSrc} alt='Hình ảnh chứng chỉ'/>
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

                <Typography variant='body2' sx={{marginTop: 5}}>
                  Tải lên hình ảnh chứng chỉ định dạng jpg/png.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/*<Grid item xs={12} sm={6}>*/}
          {/*  <TextField fullWidth type='number' label='Phone' placeholder='(123) 456-7890' />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12} sm={6}>*/}
          {/*  <TextField*/}
          {/*    fullWidth*/}
          {/*    label='Website'*/}
          {/*    placeholder='https://example.com/'*/}
          {/*    defaultValue='https://themeselection.com/'*/}
          {/*  />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12} sm={6}>*/}
          {/*  <FormControl fullWidth>*/}
          {/*    <InputLabel>Country</InputLabel>*/}
          {/*    <Select label='Country' defaultValue='USA'>*/}
          {/*      <MenuItem value='USA'>USA</MenuItem>*/}
          {/*      <MenuItem value='UK'>UK</MenuItem>*/}
          {/*      <MenuItem value='Australia'>Australia</MenuItem>*/}
          {/*      <MenuItem value='Germany'>Germany</MenuItem>*/}
          {/*    </Select>*/}
          {/*  </FormControl>*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12} sm={6}>*/}
          {/*  <FormControl fullWidth>*/}
          {/*    <InputLabel id='form-layouts-separator-multiple-select-label'>Languages</InputLabel>*/}
          {/*    <Select*/}
          {/*      multiple*/}
          {/*      defaultValue={['English']}*/}
          {/*      id='account-settings-multiple-select'*/}
          {/*      labelId='account-settings-multiple-select-label'*/}
          {/*      input={<OutlinedInput label='Languages' id='select-multiple-language' />}*/}
          {/*    >*/}
          {/*      <MenuItem value='English'>English</MenuItem>*/}
          {/*      <MenuItem value='French'>French</MenuItem>*/}
          {/*      <MenuItem value='Spanish'>Spanish</MenuItem>*/}
          {/*      <MenuItem value='Portuguese'>Portuguese</MenuItem>*/}
          {/*      <MenuItem value='Italian'>Italian</MenuItem>*/}
          {/*      <MenuItem value='German'>German</MenuItem>*/}
          {/*      <MenuItem value='Arabic'>Arabic</MenuItem>*/}
          {/*    </Select>*/}
          {/*  </FormControl>*/}
          {/*</Grid>*/}

          <Grid item xs={12}>
            <Button type="submit" variant='contained' sx={{marginRight: 3.5}}>
              Lưu
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
              Xóa
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default InputChungnhan
