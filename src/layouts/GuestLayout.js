// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
import UpgradeToProButton from './components/UpgradeToProButton'
import VerticalAppBarContent from './components/vertical/AppBarContent'

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import {useEffect, useState} from "react";
import {useAuthContext} from "../lib/auth";
import {AppBar} from "@mui/material";

const UserLayout = ({ children }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const [currentUser, setCurrentUser] = useState({})
  const { auth } = useAuthContext()

  useEffect(() => {
    fetch(`http://test.nhanchauthanhdt.vn/api/user/get?user=${auth}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data[0])
      })
  }, [])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img alt="longan" href="http://nhanchauthanhdt.vn" style={{width: "50px"}} src="/images/longan.png"/>
            </IconButton>
            <Typography variant="h6" href="http://nhanchauthanhdt.vn"  component="div" color={"white"} sx={{ flexGrow: 1 }}>
              Nông sản
            </Typography>
            <Button color="inherit" href="/">Đăng nhập</Button>
          </Toolbar>
        </AppBar>
      </Box>
    <Box sx={{padding: "20px"}}>
      {children}
    </Box>
      </>
  )
}

export default UserLayout
