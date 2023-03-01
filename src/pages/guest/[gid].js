// ** React Imports
import {useEffect, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import {styled} from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import BriefcaseSearchOutline from 'mdi-material-ui/BriefcaseSearchOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import Grid from "@mui/material/Grid";
import CustomizedTimeline from "../../@core/components/timeline";
import CardMembership from "../../views/cards/CardMembership";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputNhatky from "../../views/nhatky/InputNhatky";
import {CalendarRangeOutline} from "mdi-material-ui";
import InputChungnhan from "../../views/nhatky/InputChungnhan";
import InputSanpham from "../../views/nhatky/InputSanpham";
import CardSanpham from "../../views/nhatky/CardSanpham";
import Divider from "@mui/material/Divider";
import QRCode from "./../../lib/QR/qr";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import {Typography} from "@mui/material";
import {useRouter} from "next/router";

const Tab = styled(MuiTab)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100,
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 66,
  }
}))

const TabName = styled('span')(({theme}) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
}))

export async function getStaticPaths() {
  const results = await fetch(`http://test.nhanchauthanhdt.vn/api/product/getall`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  let fullPaths = []

  results.forEach(i=>{
    fullPaths.push({ params: { gid: i.masp } })
  })

  return {
    paths: fullPaths,
    fallback: false, // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  return {
    // Passed to the page component as props
    props: { post: {} },
  }
}

const AccountSettings = ({post}) => {
  // ** State
  const [value, setValue] = useState('account')

  const [muavu, setMuavu] = useState('2022')
  const [user, setUser] = useState()
  const [itemEdit, setItemEdit] = useState(null)

  const router = useRouter()
  const { gid } = router.query
  const locale = router.locale

  useEffect(()=>{
    fetch(`http://test.nhanchauthanhdt.vn/api/product/getby?masp=${gid}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data[0].user)
      })
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={6}>

      <Grid item xs={12} sx={{textAlign: "center"}}>
        <Typography variant='h4' color="primary">Nhật ký Sản Xuất và Nguồn gốc</Typography>
        <Typography variant='h5'>Nông sản</Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Typography variant='h6'>Thông tin cơ bản</Typography>
        <CardSanpham auth={user}/>
        <Divider/>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Typography variant='h6'>Nhật ký sản xuất</Typography>
        <CustomizedTimeline muavu={muavu} user={user} setItemEdit={setItemEdit}/>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Divider/>
        <Typography variant='h6'>Thông tin chứng nhận</Typography>
        <CardMembership auth={user}/>
        <Divider/>
        <Card >
          <CardHeader title='QR Code trang hiện tại' titleTypographyProps={{variant: 'h6'}}/>
          <CardContent sx={{ display: "flex", justifyContent: "center"}}>
        <QRCode
          value={'http://nhanchauthanhdt.vn/guest/' + gid}
          size={220}
          bgColor={"#ffffff"}
          fgColor={"#008080"}
          level={"H"}
          qrStyle="vnpt"
          includeMargin={true}
          renderAs={"canvas"}
        />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AccountSettings
