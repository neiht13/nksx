// ** React Imports
import {useState} from 'react'

// ** Next Imports
import Link from 'next/link'
import {useRouter} from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import {styled, useTheme} from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import {useAuthContext} from "../../lib/auth";
import StatisticsCard from "../../views/dashboard/StatisticsCard";
import Grid from "@mui/material/Grid";

// ** Styled Components
const Card = styled(MuiCard)(({theme}) => ({
  [theme.breakpoints.up('sm')]: {width: '28rem'}
}))

const LinkStyled = styled('a')(({theme}) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({theme}) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const {auth, saveAuth} = useAuthContext()

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    saveAuth(username)
    setOpen(true)
  };

  const handleChange = prop => event => {
    setValues({...values, [prop]: event.target.value})
  }

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword})
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const saveForm = () => {
    fetch(`http://test.nhanchauthanhdt.vn/api/user/auth`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          saveAuth(username)
          router.push("/nhatky")
        }
        else {
          setOpen(true)
        }
      })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Box className='content-center'>
          <Card sx={{zIndex: 1}}>
            <CardContent sx={{padding: theme => `${theme.spacing(12, 9, 7)} !important`}}>
              <Box sx={{mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {/*<img alt="logo" style={{width: "30px"}}*/}
                {/*     src="data:img/png;base64,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"/>*/}
                <Typography
                  variant='h6'
                  sx={{
                    ml: 3,
                    lineHeight: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '1.5rem !important'
                  }}
                >
                  {themeConfig.templateName}
                </Typography>
              </Box>
              <Box sx={{mb: 6}}>
                <Typography variant='h5' sx={{fontWeight: 600, marginBottom: 1.5}}>
                  Đăng Nhập
                </Typography>
                <Typography variant='body2'>Vui lòng nhập tên tài khoản và mật khẩu để đăng nhập</Typography>
              </Box>
              <form noValidate autoComplete='off' onSubmit={e => {e.preventDefault(); saveForm()}}>
                <TextField onChange={e => setUsername(e.target.value)} autoFocus required value={username} fullWidth id='username'
                           label='Tên đăng nhập' sx={{marginBottom: 4}}/>
                <FormControl fullWidth>
                  <InputLabel htmlFor='auth-login-password'>Mật khẩu</InputLabel>
                  <OutlinedInput
                    label='Mật khẩu'
                    value={password}
                    id='auth-login-password'
                    required
                    onChange={e => setPassword(e.target.value)}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showPassword ? <EyeOutline/> : <EyeOffOutline/>}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Box
                  sx={{mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between'}}
                >
                  <FormControlLabel control={<Checkbox/>} label='Lưu đăng nhập'/>
                </Box>
                <Button
                  fullWidth
                  size='large'
                  variant='contained'
                  sx={{marginBottom: 7}}
                  type={"submit"}
                >
                  Đăng nhập
                </Button>
                <Snackbar open={open} autoHideDuration={2000} onClose={e => {
                  setOpen(false)
                }}>
                  <MuiAlert elevation={6} variant="filled" severity="error" sx={{width: '100%'}}>
                    Đăng nhập không thành công
                  </MuiAlert>

                </Snackbar>

              </form>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={0} md={6}>
        <img alt="longan"  src="/images/image.jpg"/>
      </Grid>

    </Grid>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
