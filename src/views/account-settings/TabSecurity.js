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
          body: JSON.stringify({name: "Nhãn Châu Thành", cssx: "Nhãn An Nhơn", user: u.username, donggoi: "Đóng gói", ngaythuhoach: "01/01/2022", hsd: "01/01/2023", chungchi: "", image: 'noimage'}),
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
            Đổi mật khẩu thành công
          </MuiAlert>
        </Snackbar>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>Mật khẩu mới</InputLabel>
                  <OutlinedInput
                    label='Mật khẩu mới'
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
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Xác nhận mật khẩu mới</InputLabel>
                  <OutlinedInput
                    label='Xác nhận mật khẩu mới'
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
                      Xác nhận mật khẩu chưa trùng khớp
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
                Lưu mật khẩu mới
              </Button>
              <Button
                type='reset'
                variant='outlined'
                color='secondary'
                mt="1rem"
                sx={{ mt: "1rem" }}
                onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
              >
                Khôi phục mặc định
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
    "name": "Nguyễn Văn Mảnh",
    "role": "USER",
    "phone": "0344351110",
    "donvi": "Ấp Tân Phú, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "image",
    "location": "10.268109,105.857897"
  },
  {
    "id": "4",
    "username": "nguyenthanhdat",
    "password": "vnpt@123",
    "name": "Nguyễn Thành Đạt",
    "role": "USER",
    "phone": "0939858837",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "b540caec-88a7-4692-94cc-6e7095aa0bc3_IMG_20221206_145528.jpg",
    "location": "10.271049,105.852301"
  },
  {
    "id": "5",
    "username": "ledinhchau",
    "password": "vnpt@123",
    "name": "Lê Đình Châu",
    "role": "USER",
    "phone": "0916456349",
    "donvi": "Ấp Tân Phú, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "070d5d89-dc7c-456b-81b9-d35b68e264d0_Lê Đình Châu.jpg",
    "location": "10.270301,105.856502"
  },
  {
    "id": "6",
    "username": "buithanhtoan",
    "password": "vnpt@123",
    "name": "Bùi Thanh Toàn",
    "role": "USER",
    "phone": "0356503886",
    "donvi": "Ấp Tân Phú, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "249d1b93-860c-42b2-bd13-e7b6da5be14e_Bùi Thanh Toàn.jpg",
    "location": "10.275178,105.854704"
  },
  {
    "id": "7",
    "username": "nguyenvanduc",
    "password": "vnpt@123",
    "name": "Nguyễn Văn Đức",
    "role": "USER",
    "phone": "0932969519",
    "donvi": "Ấp Tân Phú, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "2be74c88-56af-4445-9c7e-5e7fb0214d19_Nguyễn Văn Đức.jpg",
    "location": "10.269154,105.854924"
  },
  {
    "id": "8",
    "username": "duongthanhtoan",
    "password": "vnpt@123",
    "name": "Dương Thanh Toàn",
    "role": "USER",
    "phone": "0938336632",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10.276302,105.851341"
  },
  {
    "id": "9",
    "username": "lethanhlap",
    "password": "vnpt@123",
    "name": "Lê Thành Lập",
    "role": "USER",
    "phone": "0395128353",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10.268333,105.852270"
  },
  {
    "id": "10",
    "username": "nguyenphuocloc",
    "password": "vnpt@123",
    "name": "Nguyễn Phước Lộc",
    "role": "USER",
    "phone": "0795917838",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "8476a6db-5273-43a5-a532-428ef71bd140_loc.jpg",
    "location": "10.270938,105852449"
  },
  {
    "id": "11",
    "username": "nguyenvantai",
    "password": "vnpt@123",
    "name": "Nguyễn Văn Tài",
    "role": "USER",
    "phone": "",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10.271080,105.852188"
  },
  {
    "id": "12",
    "username": "levantuoi",
    "password": "vnpt@123",
    "name": "Lê Văn Tuôi",
    "role": "USER",
    "phone": "0975008948",
    "donvi": "Ấp Tân Phú, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "61ba09d1-28bd-4528-9e5e-5cab57c7ff20_Lê Văn Tuôi.jpg",
    "location": "10270056,105853245"
  },
  {
    "id": "13",
    "username": "nguyenvanhung",
    "password": "vnpt@123",
    "name": "Nguyễn Văn Hùng",
    "role": "USER",
    "phone": "0767026576",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "a88225da-0c8d-4358-8f31-8b421f98ce55_images.jpg",
    "location": "102738888,105845833"
  },
  {
    "id": "14",
    "username": "nguyenvanbe",
    "password": "vnpt@123",
    "name": "Nguyễn Văn Bé",
    "role": "USER",
    "phone": "",
    "donvi": "Ấp Tân Phú, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "819da2d6-62ab-40f0-b3dc-979652ea2669_Nguyễn Văn Bé.jpg",
    "location": "10269567,105854937"
  },
  {
    "id": "15",
    "username": "phamvanung",
    "password": "vnpt@123",
    "name": "Phạm Văn Ứng",
    "role": "USER",
    "phone": "",
    "donvi": "Ấp Tân Phú, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10272775,105857847"
  },
  {
    "id": "16",
    "username": "phanvanminh",
    "password": "vnpt@123",
    "name": "Phan Văn Minh",
    "role": "USER",
    "phone": "0329951779",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "defe1504-16eb-4c5c-a080-c2143d12654f_minh.jpg",
    "location": "10278378,105850529"
  },
  {
    "id": "17",
    "username": "buianhthang",
    "password": "vnpt@123",
    "name": "Bùi Anh Thắng",
    "role": "USER",
    "phone": "0977487419",
    "donvi": "Ấp Tân Phú, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "3e5c4044-a1da-4ace-bdd2-4a9a2ad64c68_Bùi Anh Thắng.jpg",
    "location": "10274737,105855311"
  },
  {
    "id": "18",
    "username": "tranvananh",
    "password": "vnpt@123",
    "name": "Trần Văn Anh",
    "role": "USER",
    "phone": "0918660050",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10271960,105853367"
  },
  {
    "id": "19",
    "username": "vohonghiep",
    "password": "vnpt@123",
    "name": "Võ Hồng Hiệp",
    "role": "USER",
    "phone": "",
    "donvi": "Ấp Tân Phú, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10274721,105853489"
  },
  {
    "id": "20",
    "username": "voquocan",
    "password": "vnpt@123",
    "name": "Võ Quốc An",
    "role": "USER",
    "phone": "0348445277",
    "donvi": "Ấp Tân Phú, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10268318,105853966"
  },
  {
    "id": "21",
    "username": "lethanhlaptp",
    "password": "vnpt@123",
    "name": "Lê Thành Lập",
    "role": "USER",
    "phone": "0349031110",
    "donvi": "Ấp Tân Phú, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "573c4424-5a4d-4f18-aeb6-878c9fa8faae_images.jpg",
    "location": "10.271320,105.857276"
  },
  {
    "id": "22",
    "username": "huynhthanhphong",
    "password": "vnpt@123",
    "name": "Huỳnh Thanh Phong",
    "role": "USER",
    "phone": "",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10276430,105853227"
  },
  {
    "id": "23",
    "username": "nguyenvanhiep",
    "password": "vnpt@123",
    "name": "Nguyễn Văn Hiệp",
    "role": "USER",
    "phone": "0917497850",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "720d6819-2957-4bb3-9710-6dc6bdbbd9ad_hiep.jpg",
    "location": "10271591,105852829"
  },
  {
    "id": "24",
    "username": "phamvanhoa",
    "password": "vnpt@123",
    "name": "Phạm Văn Hoà",
    "role": "USER",
    "phone": "",
    "donvi": "Ấp Tân Phú, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "2631df18-8785-474f-af07-9a40bf3566c3_Phạm Văn Hòa.jpg",
    "location": "10270141,105855853"
  },
  {
    "id": "25",
    "username": "letandat",
    "password": "vnpt@123",
    "name": "Lê Tấn Đạt",
    "role": "USER",
    "phone": "",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10276892,105851655"
  },
  {
    "id": "26",
    "username": "tranthanhnhien",
    "password": "vnpt@123",
    "name": "Trần Thanh Nhiên",
    "role": "USER",
    "phone": "0334748829",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10270795,105848948"
  },
  {
    "id": "27",
    "username": "levanchien",
    "password": "vnpt@123",
    "name": "Lê Văn Chiến",
    "role": "USER",
    "phone": "0938924317",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "c98d40a5-fed0-4e05-ab2d-e61b23862be8_chien.jpg",
    "location": "10.277891,105.849252"
  },
  {
    "id": "28",
    "username": "huynhngocthai",
    "password": "vnpt@123",
    "name": "Huỳnh Ngọc Thái",
    "role": "USER",
    "phone": "0834511883",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "3113afcf-a34d-4dac-8b40-dbfeca9dce16_Thai.jpg",
    "location": "10272279,105852689"
  },
  {
    "id": "29",
    "username": "lethingocloi",
    "password": "vnpt@123",
    "name": "Lê Thị Ngọc Lợi",
    "role": "USER",
    "phone": "0915794919",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "102786111,105849722"
  },
  {
    "id": "30",
    "username": "ledungthang",
    "password": "vnpt@123",
    "name": "Lê Dũng Thắng",
    "role": "USER",
    "phone": "093968304",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10274594,105855637"
  },
  {
    "id": "31",
    "username": "nguyentantruong",
    "password": "vnpt@123",
    "name": "Nguyễn Tấn Trường",
    "role": "USER",
    "phone": "",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "0eef57fb-e605-46a3-a692-a5b08354f5f5_truong.jpg",
    "location": "10.270211,105.850110"
  },
  {
    "id": "32",
    "username": "nguyenvanbiet",
    "password": "vnpt@123",
    "name": "Nguyễn Văn Biết",
    "role": "USER",
    "phone": "",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10269047,105851550"
  },
  {
    "id": "33",
    "username": "bachthihuong",
    "password": "vnpt@123",
    "name": "Bạch Thị Hường",
    "role": "USER",
    "phone": "0949890707",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10279464,105851296"
  },
  {
    "id": "34",
    "username": "tranthile",
    "password": "vnpt@123",
    "name": "Trần Thị Lệ",
    "role": "USER",
    "phone": "",
    "donvi": "Ấp Tân Thạnh, Xã An Nhơn, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "10274355,105851627"
  },
  {
    "id": "35",
    "username": "nguyenvanthang",
    "password": "vnpt@123",
    "name": "Nguyễn Văn Thẳng",
    "role": "USER",
    "phone": "0933958630",
    "donvi": "ấp Tân Thạnh, xã An Nhơn, huyện Châu Thành, tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "",
    "location": "0,0"
  },
  {
    "id": "36",
    "username": "nguyenvansam",
    "password": "vnpt@123",
    "name": "Nguyễn Văn Sâm",
    "role": "USER",
    "phone": "0949697475",
    "donvi": "ấp Tân Thạnh, xã An Nhơn, huyện Châu Thành, tỉnh Đồng Tháp",
    "status": "ACTIVE",
    "image": "2e212d57-58fd-4a08-b5ae-056feb12adbf_sâm.jpg",
    "location": "0,0"
  }
]

export default TabSecurity
