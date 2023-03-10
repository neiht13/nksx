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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

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
import {postApi} from "../../lib/request-api";
import {useRouter} from "next/router";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Ng??y th???c hi???n'
                    helperText='V?? d???: 22/02/2022'
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

const InputNhatky = (props) => {
  // ** State
  const {itemEdit, setNkreload} = props
  const [id, setId] = useState(0)
  const [name, setName] = useState("")
  const [stt, setStt] = useState(0)
  const [user, setUser] = useState("")
  const [masp, setMasp] = useState("")
  const [tenCv, setTenCv] = useState("")
  const [loaiCv, setLoaiCv] = useState("chung")
  const [chitietCv, setChitietCv] = useState("")
  const [date, setDate] = useState(dayjs())
  const [imgSrc, setImgSrc] = useState('')
  const [imgFile, setImgFile] = useState(null)
  const [muavu, setMuavu] = useState('2022')
  const [noti, setNoti] = useState(false);
  const { auth } = useAuthContext()
  const router = useRouter()


  useEffect(() => {
    if (itemEdit) {
      setName(itemEdit.name);
      setId(itemEdit.id);
      setStt(itemEdit.stt);
      setUser(auth);
      setTenCv(itemEdit.title);
      setChitietCv(itemEdit.detail)
      setLoaiCv(itemEdit.type)
      setDate(dayjs(itemEdit.date))
      setMuavu(itemEdit.muavu)
      setImgSrc('http://test.nhanchauthanhdt.vn/api/filemanagers/download?filename='+itemEdit.image)
    }
  }, [itemEdit])

  const onUpload = file => {
    const reader = new FileReader()
    const {files} = file.target
    if (files && files.length !== 0) {
      setImgFile(files[0])
      reader.onload = () => {
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(files[0])
    }
  }

  function resetForm() {
    setName("");
    setId(0);
    setStt(0);
    setUser("");
    setTenCv("");
    setChitietCv("")
    setLoaiCv("chung")
    setDate(dayjs())
    setMuavu("2022")
    setImgSrc("")
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
      fetch(`http://test.nhanchauthanhdt.vn/api/nhatky/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, stt, masp, name, user: auth, detail: chitietCv, title: tenCv, type: loaiCv, image: r.path, date: date.toString(), muavu}),
        }
        )
        .then((res) => setNoti(true))

    })
  }

  const saveForm = async () => {
    if(imgFile) {
      await uploadImage();
    } else {
      postApi('nhatky/update', {id, stt, masp, name, user: auth, detail: chitietCv, title: tenCv, type: loaiCv, image: "", date: date.toString(), muavu})
      .then((res) => {
        setNoti(true)
        setNkreload(nkreload => !nkreload);
      })

    }
  }

  const deleteRow = () => {
    postApi('nhatky/update', {id, type: "delete"})
    resetForm()
    setNkreload(nkreload=>!nkreload);
  }


  return (
    <CardContent>
      <form onSubmit={e => {
        e.preventDefault();
        saveForm()
      }}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label='T??n c??ng vi???c'
              placeholder='Nh???p t??m t???t t??n c??ng vi???c'
              value={tenCv}
              defaultValue={tenCv}
              onChange={e => setTenCv(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Lo???i c??ng vi???c</InputLabel>
              <Select label='Lo???i c??ng vi???c' defaultValue={loaiCv}
                      value={loaiCv}
                      onChange={e => setLoaiCv(e.target.value)}
              >
                <MenuItem value='chung'><WidgetsOutlinedIcon/>&nbsp;C??ng vi???c chung</MenuItem>
                <MenuItem value='thamvuon'><ViewInArOutlinedIcon/>&nbsp;Th??m v?????n</MenuItem>
                <MenuItem value='tuoinuoc'><OpacityOutlinedIcon/>&nbsp;T?????i n?????c</MenuItem>
                <MenuItem value='bonphan'><BubbleChartOutlinedIcon/>&nbsp;B??n ph??n</MenuItem>
                <MenuItem value='bvtv'><HealingOutlinedIcon/>&nbsp;S??? d???ng thu???c BVTV</MenuItem>
                <MenuItem value='tiacanh'><ContentCutOutlinedIcon/>&nbsp;T???a c??nh</MenuItem>
                <MenuItem value='thuhoach'><PanToolOutlinedIcon/>&nbsp;Thu Ho???ch</MenuItem>
                <MenuItem value='khac'><Grid3x3OutlinedIcon/>&nbsp;C??ng vi???c kh??c</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label='Chi ti???t c??ng vi???c'
              minRows={2}
              placeholder='Nh???p c??c chi ti???t c??ng vi???c ???? l??m'
              value={chitietCv}
              defaultValue={chitietCv}
              onChange={e => setChitietCv(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Ng??y th???c hi???n"
                inputFormat="DD/MM/YYYY"
                value={date}
                mask={'__/__/____'}
                onChange={value=> setDate(value)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sx={{marginTop: "1.75rem"}}>
              <FormControl fullWidth>
                <InputLabel>M??a v???</InputLabel>
                <Select label='M??a v???' defaultValue={muavu} onChange={e => setMuavu(e.target.value)}>
                  <MenuItem value='2021'>2021</MenuItem>
                  <MenuItem value='2022'>2022</MenuItem>
                  <MenuItem value='2023'>2023</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <ImgStyled src={imgSrc} alt='H??nh ???nh'/>
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  T???i l??n
                  <input
                    hidden
                    type='file'
                    onChange={onUpload}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>

                <Typography variant='body2' sx={{marginTop: 5}}>
                  T???i l??n h??nh ???nh c??ng vi???c ?????nh d???ng jpg/png.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant='contained' sx={{marginRight: 3.5}}>
              L??u
            </Button>
            {id !== 0 &&  <Button type='reset' variant='outlined' color='error' onClick={deleteRow}>
              X??a
            </Button>}
          </Grid>
        </Grid>
      </form>
      <Snackbar open={noti} autoHideDuration={2000} onClose={e => {
        setNoti(false)
      }}>
        <MuiAlert elevation={6} variant="filled" severity="success" sx={{width: '100%'}}>
          Ch???nh s???a th??nh c??ng
        </MuiAlert>
      </Snackbar>
    </CardContent>
  )
}

export default InputNhatky
