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
import {useAuthContext} from "../../lib/auth";
import GoogleMapReact from "google-map-react";
import Tooltip from "@mui/material/Tooltip";
import PlaceIcon from "@mui/icons-material/Place";

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

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('account')

  const [muavu, setMuavu] = useState('2022')
  const { auth } = useAuthContext()
  const [itemEdit, setItemEdit] = useState(null)

  const [nkreload, setNkreload] = useState(false)
  const [spreload, setSpreload] = useState(false)
  const [masp, setMasp] = useState("")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }


  return (
    <Grid container spacing={6}>
      <Card sx={{marginLeft: "1.5rem"}}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{borderBottom: theme => `1px solid ${theme.palette.divider}`}}
          >
            <Tab
              value='account'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <CalendarRangeOutline/>
                  <TabName>Nhật ký</TabName>
                </Box>
              }
            />
            <Tab
              value='security'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <BriefcaseSearchOutline/>
                  <TabName>Chứng nhận</TabName>
                </Box>
              }
            />
            <Tab
              value='info'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <InformationOutline/>
                  <TabName>Sản phẩm</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{p: 0}} value='account'>
            <InputNhatky itemEdit={itemEdit}  setNkreload={setNkreload}/>
          </TabPanel>
          <TabPanel sx={{p: 0}} value='security'>
            <InputChungnhan/>
          </TabPanel>
          <TabPanel sx={{p: 0}} value='info'>
            <InputSanpham setSpreload={setSpreload}/>
          </TabPanel>
        </TabContext>
      </Card>
      <Grid item xs={12} md={6} lg={6}>
        {/*<SalesByCountries/>*/}
        <Box>
          <FormControl>
            <InputLabel>Mùa vụ</InputLabel>
            <Select label='Mùa vụ' defaultValue={muavu} onChange={e=>setMuavu(e.target.value)}>
              <MenuItem value='2021'>2021</MenuItem>
              <MenuItem value='2022'>2022</MenuItem>
              <MenuItem value='2023'>2023</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <CustomizedTimeline muavu={muavu} user={auth} setItemEdit={setItemEdit} nkreload={nkreload}/>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CardSanpham  spreload={spreload} setMasp={setMasp} auth={auth}/>
        <Divider/>
        <CardMembership auth={auth}/>
        <Divider/>
        <Card >
          <CardHeader title='QR Code trang hiện tại' titleTypographyProps={{variant: 'h6'}}/>
          <CardContent sx={{ display: "flex", justifyContent: "center"}}>
        <QRCode
          value={'http://nhanchauthanhdt.vn/guest/' + masp}
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
