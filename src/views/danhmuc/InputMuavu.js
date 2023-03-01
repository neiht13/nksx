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

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Ngày thực hiện'
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

const InputNhatky = (props) => {
  // ** State
  const {itemEdit} = props
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [stt, setStt] = useState("")
  const [user, setUser] = useState("")
  const [tenCv, setTenCv] = useState("")
  const [loaiCv, setLoaiCv] = useState("chung")
  const [chitietCv, setChitietCv] = useState("")
  const [date, setDate] = useState(dayjs().format("DD/MM/YYYY"))
  const [imgSrc, setImgSrc] = useState('')
  const [imgFile, setImgFile] = useState(null)
  const [muavu, setMuavu] = useState('2022')
  const [noti, setNoti] = useState(false);

  useEffect(() => {
    if (itemEdit) {
      setName(itemEdit.name);
      setId(itemEdit.id);
      setStt(itemEdit.stt);
      setUser(itemEdit.user);
      setTenCv(itemEdit.title);
      setChitietCv(itemEdit.detail)
      setLoaiCv(itemEdit.type)
      setDate(itemEdit.date)
      setMuavu(itemEdit.muavu)
      setImgSrc(itemEdit.image)
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
    setId("");
    setStt("");
    setUser("");
    setTenCv("");
    setChitietCv("")
    setLoaiCv("chung")
    setDate(dayjs().format("DD/MM/YYYY"))
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
          body: JSON.stringify({id, stt, name, user, detail: chitietCv, title: tenCv, type: loaiCv, image: r.path, date, muavu}),
        }
        )
        .then((res) => setNoti(true))

    })
  }

  const saveForm = async () => {
    await uploadImage();
  }

  return (
    <CardContent>
      <form onSubmit={e => {
        e.preventDefault();
        saveForm()
      }}>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label='Tên mùa vụ'
              placeholder='Nhập tên mùa vụ thực hiện'
              value={tenCv}
              defaultValue={tenCv}
              onChange={e => setTenCv(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Năm thực hiện</InputLabel>
              <Select label='Năm thực hiện' defaultValue={loaiCv}
                      value={loaiCv}
                      onChange={e => setLoaiCv(e.target.value)}
              >
                <MenuItem value='2021'>2021</MenuItem>
                <MenuItem value='2022'>2022</MenuItem>
                <MenuItem value='2023'>2023</MenuItem>
                <MenuItem value='2024'>2024</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant='contained' sx={{marginRight: 3.5}}>
              Lưu
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={resetForm}>
              Xóa
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={noti} autoHideDuration={2000} onClose={e => {
        setNoti(false)
      }}>
        <MuiAlert elevation={6} variant="filled" severity="success" sx={{width: '100%'}}>
          Chỉnh sửa thành công
        </MuiAlert>
      </Snackbar>
    </CardContent>
  )
}

export default InputNhatky
