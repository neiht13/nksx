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
  const [tenCv, setTenCv] = useState(null)
  const [loaiCv, setLoaiCv] = useState(null)
  const [chitietCv, setChitietCv] = useState(null)
  const [date, setDate] = useState()
  const [imgSrc, setImgSrc] = useState('')
  const [muavu, setMuavu] = useState('2022')

  useEffect(()=>{
    setDate(dayjs().format("DD/MM/YYYY"))
  },[])

  const onChange = file => {
    const reader = new FileReader()
    const {files} = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      <form onSubmit={e => {
        e.preventDefault();
        console.log({tenCv, loaiCv, chitietCv, muavu, date, imgSrc})
      }}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <Grid>
            <TextField
              fullWidth
              required
              label='Tên cơ sở sản xuất'
              value={tenCv}
              onChange={e => setTenCv(e.target.value)}
            />
            </Grid>
            <Grid sx={{paddingTop: "1.75rem"}}>
            <TextField
              fullWidth
              required
              label='Người sản xuất'
              value={tenCv}
              onChange={e => setTenCv(e.target.value)}
            />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Địa chỉ'
              multiline
              minRows={3}
              value={chitietCv}
              onChange={e => setChitietCv(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Diện tích'
              minRows={3}
              value={chitietCv}
              onChange={e => setChitietCv(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Loại chứng chỉ</InputLabel>
              <Select label='Loại chứng chỉ' defaultValue='vietgap'>
                <MenuItem value='vietgap'>VietGap</MenuItem>
                <MenuItem value='globalgap'>GlobalGAP</MenuItem>
                <MenuItem value='usa'>USDA Organic</MenuItem>
                <MenuItem value='eu'>EU Organic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Tên chứng chỉ' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                value={date}
                dateFormat="dd/MM/yyyy"
                id='account-settings-date'
                placeholderText='Ngày/Tháng/Năm'
                customInput={<CustomInput/>}
                onChange={date => setDate(date)}
              />
            </DatePickerWrapper>
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
