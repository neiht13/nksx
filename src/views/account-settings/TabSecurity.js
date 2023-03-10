// ** React Imports
import {useEffect, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import FormHelperText from "@mui/material/FormHelperText";
import {useAuthContext} from "../../lib/auth";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const TabSecurity = () => {
  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })
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
  const [noti, setNoti] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const { auth } = useAuthContext()

  useEffect(() => {
    fetch(`http://test.nhanchauthanhdt.vn/api/user/get?user=${auth}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data[0])
        setId(data[0].id)
        setName(data[0].name)
        setUsername(data[0].username)
        setDonvi(data[0].donvi)
        setPhone(data[0].phone)
        setRole(data[0].role)
        setStatus(data[0].status)
        setImage(data[0].image)
        data[0].image && setImgSrc('http://test.nhanchauthanhdt.vn/api/filemanagers/download?filename='+ data[0].image)

      })
  }, [])


  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  const saveForm = (e) => {
    e.preventDefault();
    if(values.newPassword === values.confirmNewPassword){
      fetch(`http://test.nhanchauthanhdt.vn/api/user/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id,
            username,
            password: values.newPassword,
            name, phone, donvi,
            role,
            image,
            status,
          }),
        }
      )
        .then((res) => setNoti(true))
    }

  }

  const importData = () => {
    listUser.forEach(u=>{
      fetch(`http://test.nhanchauthanhdt.vn/api/product/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name: "Nh??n Ch??u Th??nh", cssx: "Nh??n An Nh??n", user: u.username, donggoi: "????ng g??i", ngaythuhoach: "01/01/2022", hsd: "01/01/2023", chungchi: "", image: 'noimage'}),
        }
      )
    })
  }

  return (
    <form onSubmit={saveForm}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Snackbar open={noti} autoHideDuration={2000} onClose={e => {
          setNoti(false)
        }}>
          <MuiAlert elevation={6} variant="filled" severity="success" sx={{width: '100%'}}>
            ?????i m???t kh???u th??nh c??ng
          </MuiAlert>
        </Snackbar>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>M???t kh???u m???i</InputLabel>
                  <OutlinedInput
                    label='M???t kh???u m???i'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    required
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>X??c nh???n m???t kh???u m???i</InputLabel>
                  <OutlinedInput
                    label='X??c nh???n m???t kh???u m???i'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    required
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {values.newPassword !== values.confirmNewPassword && (
                    <FormHelperText error id="accountId-error">
                      X??c nh???n m???t kh???u ch??a tr??ng kh???p
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <Box>
              <Button type={"submit"} variant='contained'  sx={{ mt: "1rem" , marginRight: 3.5 }}>
                L??u m???t kh???u m???i
              </Button>
              <Button
                type='reset'
                variant='outlined'
                color='secondary'
                mt="1rem"
                sx={{ mt: "1rem" }}
                onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
              >
                Kh??i ph???c m???c ?????nh
              </Button>
              {/*<Button*/}
              {/*  type='reset'*/}
              {/*  variant='outlined'*/}
              {/*  color='error'*/}
              {/*  mt="1rem"*/}
              {/*  sx={{ mt: "1rem" }}*/}
              {/*  onClick={importData}*/}
              {/*>*/}
              {/*  Import Data*/}
              {/*</Button>*/}
            </Box>
          </Grid>
        </Grid>
      </CardContent>

    </form>
  )
}

const listUser = [
  {
    "id": "3",
    "username": "nguyenvanmanh",
    "password": "vnpt@123",
    "name": "Nguy???n V??n M???nh",
    "role": "USER",
    "phone": "0344351110",
    "donvi": "???p T??n Ph??, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "image",
    "location": "10.268109,105.857897"
  },
  {
    "id": "4",
    "username": "nguyenthanhdat",
    "password": "vnpt@123",
    "name": "Nguy???n Th??nh ?????t",
    "role": "USER",
    "phone": "0939858837",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "b540caec-88a7-4692-94cc-6e7095aa0bc3_IMG_20221206_145528.jpg",
    "location": "10.271049,105.852301"
  },
  {
    "id": "5",
    "username": "ledinhchau",
    "password": "vnpt@123",
    "name": "L?? ????nh Ch??u",
    "role": "USER",
    "phone": "0916456349",
    "donvi": "???p T??n Ph??, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "070d5d89-dc7c-456b-81b9-d35b68e264d0_L?? ????nh Ch??u.jpg",
    "location": "10.270301,105.856502"
  },
  {
    "id": "6",
    "username": "buithanhtoan",
    "password": "vnpt@123",
    "name": "B??i Thanh To??n",
    "role": "USER",
    "phone": "0356503886",
    "donvi": "???p T??n Ph??, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "249d1b93-860c-42b2-bd13-e7b6da5be14e_B??i Thanh To??n.jpg",
    "location": "10.275178,105.854704"
  },
  {
    "id": "7",
    "username": "nguyenvanduc",
    "password": "vnpt@123",
    "name": "Nguy???n V??n ?????c",
    "role": "USER",
    "phone": "0932969519",
    "donvi": "???p T??n Ph??, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "2be74c88-56af-4445-9c7e-5e7fb0214d19_Nguy???n V??n ?????c.jpg",
    "location": "10.269154,105.854924"
  },
  {
    "id": "8",
    "username": "duongthanhtoan",
    "password": "vnpt@123",
    "name": "D????ng Thanh To??n",
    "role": "USER",
    "phone": "0938336632",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10.276302,105.851341"
  },
  {
    "id": "9",
    "username": "lethanhlap",
    "password": "vnpt@123",
    "name": "L?? Th??nh L???p",
    "role": "USER",
    "phone": "0395128353",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10.268333,105.852270"
  },
  {
    "id": "10",
    "username": "nguyenphuocloc",
    "password": "vnpt@123",
    "name": "Nguy???n Ph?????c L???c",
    "role": "USER",
    "phone": "0795917838",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "8476a6db-5273-43a5-a532-428ef71bd140_loc.jpg",
    "location": "10.270938,105852449"
  },
  {
    "id": "11",
    "username": "nguyenvantai",
    "password": "vnpt@123",
    "name": "Nguy???n V??n T??i",
    "role": "USER",
    "phone": "",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10.271080,105.852188"
  },
  {
    "id": "12",
    "username": "levantuoi",
    "password": "vnpt@123",
    "name": "L?? V??n Tu??i",
    "role": "USER",
    "phone": "0975008948",
    "donvi": "???p T??n Ph??, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "61ba09d1-28bd-4528-9e5e-5cab57c7ff20_L?? V??n Tu??i.jpg",
    "location": "10270056,105853245"
  },
  {
    "id": "13",
    "username": "nguyenvanhung",
    "password": "vnpt@123",
    "name": "Nguy???n V??n H??ng",
    "role": "USER",
    "phone": "0767026576",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "a88225da-0c8d-4358-8f31-8b421f98ce55_images.jpg",
    "location": "102738888,105845833"
  },
  {
    "id": "14",
    "username": "nguyenvanbe",
    "password": "vnpt@123",
    "name": "Nguy???n V??n B??",
    "role": "USER",
    "phone": "",
    "donvi": "???p T??n Ph??, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "819da2d6-62ab-40f0-b3dc-979652ea2669_Nguy???n V??n B??.jpg",
    "location": "10269567,105854937"
  },
  {
    "id": "15",
    "username": "phamvanung",
    "password": "vnpt@123",
    "name": "Ph???m V??n ???ng",
    "role": "USER",
    "phone": "",
    "donvi": "???p T??n Ph??, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10272775,105857847"
  },
  {
    "id": "16",
    "username": "phanvanminh",
    "password": "vnpt@123",
    "name": "Phan V??n Minh",
    "role": "USER",
    "phone": "0329951779",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "defe1504-16eb-4c5c-a080-c2143d12654f_minh.jpg",
    "location": "10278378,105850529"
  },
  {
    "id": "17",
    "username": "buianhthang",
    "password": "vnpt@123",
    "name": "B??i Anh Th???ng",
    "role": "USER",
    "phone": "0977487419",
    "donvi": "???p T??n Ph??, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "3e5c4044-a1da-4ace-bdd2-4a9a2ad64c68_B??i Anh Th???ng.jpg",
    "location": "10274737,105855311"
  },
  {
    "id": "18",
    "username": "tranvananh",
    "password": "vnpt@123",
    "name": "Tr???n V??n Anh",
    "role": "USER",
    "phone": "0918660050",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10271960,105853367"
  },
  {
    "id": "19",
    "username": "vohonghiep",
    "password": "vnpt@123",
    "name": "V?? H???ng Hi???p",
    "role": "USER",
    "phone": "",
    "donvi": "???p T??n Ph??, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10274721,105853489"
  },
  {
    "id": "20",
    "username": "voquocan",
    "password": "vnpt@123",
    "name": "V?? Qu???c An",
    "role": "USER",
    "phone": "0348445277",
    "donvi": "???p T??n Ph??, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10268318,105853966"
  },
  {
    "id": "21",
    "username": "lethanhlaptp",
    "password": "vnpt@123",
    "name": "L?? Th??nh L???p",
    "role": "USER",
    "phone": "0349031110",
    "donvi": "???p T??n Ph??, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "573c4424-5a4d-4f18-aeb6-878c9fa8faae_images.jpg",
    "location": "10.271320,105.857276"
  },
  {
    "id": "22",
    "username": "huynhthanhphong",
    "password": "vnpt@123",
    "name": "Hu???nh Thanh Phong",
    "role": "USER",
    "phone": "",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10276430,105853227"
  },
  {
    "id": "23",
    "username": "nguyenvanhiep",
    "password": "vnpt@123",
    "name": "Nguy???n V??n Hi???p",
    "role": "USER",
    "phone": "0917497850",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "720d6819-2957-4bb3-9710-6dc6bdbbd9ad_hiep.jpg",
    "location": "10271591,105852829"
  },
  {
    "id": "24",
    "username": "phamvanhoa",
    "password": "vnpt@123",
    "name": "Ph???m V??n Ho??",
    "role": "USER",
    "phone": "",
    "donvi": "???p T??n Ph??, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "2631df18-8785-474f-af07-9a40bf3566c3_Ph???m V??n H??a.jpg",
    "location": "10270141,105855853"
  },
  {
    "id": "25",
    "username": "letandat",
    "password": "vnpt@123",
    "name": "L?? T???n ?????t",
    "role": "USER",
    "phone": "",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10276892,105851655"
  },
  {
    "id": "26",
    "username": "tranthanhnhien",
    "password": "vnpt@123",
    "name": "Tr???n Thanh Nhi??n",
    "role": "USER",
    "phone": "0334748829",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10270795,105848948"
  },
  {
    "id": "27",
    "username": "levanchien",
    "password": "vnpt@123",
    "name": "L?? V??n Chi???n",
    "role": "USER",
    "phone": "0938924317",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "c98d40a5-fed0-4e05-ab2d-e61b23862be8_chien.jpg",
    "location": "10.277891,105.849252"
  },
  {
    "id": "28",
    "username": "huynhngocthai",
    "password": "vnpt@123",
    "name": "Hu???nh Ng???c Th??i",
    "role": "USER",
    "phone": "0834511883",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "3113afcf-a34d-4dac-8b40-dbfeca9dce16_Thai.jpg",
    "location": "10272279,105852689"
  },
  {
    "id": "29",
    "username": "lethingocloi",
    "password": "vnpt@123",
    "name": "L?? Th??? Ng???c L???i",
    "role": "USER",
    "phone": "0915794919",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "102786111,105849722"
  },
  {
    "id": "30",
    "username": "ledungthang",
    "password": "vnpt@123",
    "name": "L?? D??ng Th???ng",
    "role": "USER",
    "phone": "093968304",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10274594,105855637"
  },
  {
    "id": "31",
    "username": "nguyentantruong",
    "password": "vnpt@123",
    "name": "Nguy???n T???n Tr?????ng",
    "role": "USER",
    "phone": "",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "0eef57fb-e605-46a3-a692-a5b08354f5f5_truong.jpg",
    "location": "10.270211,105.850110"
  },
  {
    "id": "32",
    "username": "nguyenvanbiet",
    "password": "vnpt@123",
    "name": "Nguy???n V??n Bi???t",
    "role": "USER",
    "phone": "",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10269047,105851550"
  },
  {
    "id": "33",
    "username": "bachthihuong",
    "password": "vnpt@123",
    "name": "B???ch Th??? H?????ng",
    "role": "USER",
    "phone": "0949890707",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10279464,105851296"
  },
  {
    "id": "34",
    "username": "tranthile",
    "password": "vnpt@123",
    "name": "Tr???n Th??? L???",
    "role": "USER",
    "phone": "",
    "donvi": "???p T??n Th???nh, X?? An Nh??n, Huy???n Ch??u Th??nh, T???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "10274355,105851627"
  },
  {
    "id": "35",
    "username": "nguyenvanthang",
    "password": "vnpt@123",
    "name": "Nguy???n V??n Th???ng",
    "role": "USER",
    "phone": "0933958630",
    "donvi": "???p T??n Th???nh, x?? An Nh??n, huy???n Ch??u Th??nh, t???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "",
    "location": "0,0"
  },
  {
    "id": "36",
    "username": "nguyenvansam",
    "password": "vnpt@123",
    "name": "Nguy???n V??n S??m",
    "role": "USER",
    "phone": "0949697475",
    "donvi": "???p T??n Th???nh, x?? An Nh??n, huy???n Ch??u Th??nh, t???nh ?????ng Th??p",
    "status": "ACTIVE",
    "image": "2e212d57-58fd-4a08-b5ae-056feb12adbf_s??m.jpg",
    "location": "0,0"
  }
]

export default TabSecurity
