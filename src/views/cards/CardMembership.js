// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import {useEffect, useState} from "react";
import {useAuthContext} from "../../lib/auth";

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardMembership = (props) => {
  const { auth } = props;
  const [chungnhan, setChungnhan] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://test.nhanchauthanhdt.vn/api/chungnhan/fetch?user=${auth}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setChungnhan(data[0] || {})
      })
  }, [])



  return (
    <Card sx={{marginTop: "33px"}}>
      {chungnhan.id &&
      <Grid container spacing={6}>
        <Grid item xs={12} sm={7}>
          <CardContent sx={{padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important`}}>
            <Typography variant='h6' sx={{marginBottom: 3.5}}>
              {chungnhan.cssx}
            </Typography>
            <Divider sx={{marginTop: 6.5, marginBottom: 6.75}}/>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <StyledBox>
                  <Box sx={{mb: 6.75, display: 'flex', alignItems: 'center'}}>
                    <LockOpenOutline sx={{color: 'primary.main', marginRight: 2.75}} fontSize='small'/>
                    <Typography><strong>Diện tích: </strong>{chungnhan.dientich}</Typography>
                  </Box>
                  <Divider sx={{marginTop: 5, marginBottom: 5, marginRight: 5}}/>

                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <AccountOutline sx={{color: 'primary.main', marginRight: 2.75}} fontSize='small'/>
                    <Typography><strong>Người sản xuất: </strong>{chungnhan.nsx}</Typography>
                  </Box>
                  <Divider sx={{marginTop: 5, marginBottom: 5, marginRight: 5}}/>

                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <HomeOutlinedIcon color="primary" sx={{marginRight: 2}}/>
                    <Typography><strong>Địa chỉ: </strong>{chungnhan.diachi}</Typography>
                  </Box>
                </StyledBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{mb: 6.75, display: 'flex', alignItems: 'center'}}>
                  <StarOutline sx={{color: 'primary.main', marginRight: 2.75}} fontSize='small'/>
                  <Typography><strong>Tiêu chuẩn: </strong>{chungnhan.tieuchuan}</Typography>
                </Box>
                <Divider sx={{marginTop: 5, marginBottom: 5, marginRight: 5}}/>

                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <TrendingUp sx={{color: 'primary.main', marginRight: 2.75}} fontSize='small'/>
                  <Typography sx={{overflowWrap: "anywhere"}}><strong>Chứng chỉ: </strong>{chungnhan.chungchi}
                  </Typography>
                </Box>
                <Divider sx={{marginTop: 5, marginBottom: 5, marginRight: 5}}/>

                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <TrendingUp sx={{color: 'primary.main', marginRight: 2.75}} fontSize='small'/>
                  <Typography><strong>Hiệu lực: </strong>{chungnhan.hieuluc}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Grid
          item
          sm={5}
          xs={12}
          sx={{paddingTop: ['0 !important', '1.5rem !important'], paddingLeft: ['1.5rem !important', '0 !important']}}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover',
              padding: theme => `${theme.spacing(18, 5, 16)} !important`
            }}
          >
            <Box>
              <img alt="cn" width="100%" src=""/>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
      }
    </Card>
  )
}

export default CardMembership
