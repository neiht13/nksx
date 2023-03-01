// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import Grid from "@mui/material/Grid";

const CardStatsVertical = props => {
  // ** Props
  const {title, subtitle, handleClickOpen, handleClose, image, trend, setImageUrl} = props

  const imagePath = "http://test.nhanchauthanhdt.vn/api/FileManagers/download?filename="

  return (
    <Card>
      <Grid container>
        <Grid sm={12} md={8}>
          <CardContent>
          <Typography sx={{fontWeight: 600, fontSize: '0.875rem'}}>{title}</Typography>
          <Typography variant='body1'>{subtitle}</Typography>
          </CardContent>
        </Grid>

          {image && <Grid sx={{backgroundColor: 'action.hover'}} sm={12} md={4}>
            <CardContent onClick={e=>{handleClickOpen(); setImageUrl(imagePath + image)}}>
              <img width={"90%"} src={imagePath + image} loading="lazy"/>
            </CardContent>
          </Grid>
          }
        </Grid>
    </Card>
  )
}

export default CardStatsVertical

CardStatsVertical.defaultProps = {
  color: 'primary',
  trend: 'positive'
}
