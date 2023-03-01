// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import DashboardTable from "../../views/tables/DashboardTable";
import DataGridDemo from "../../views/tables/DataTable";

// import excuteQuery from "../../lib/db";

export async function getStaticProps() {
  let rows = [];


  // const result = await excuteQuery({
  //   query: 'SELECT * FROM test_table'
  // });
  // rows = await result;
  // console.log("result", rows)

  return {
    props: {
      rows,
    },
  }
}

const MUITable = ({rows}) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
            MUI Tables
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Data Grid' titleTypographyProps={{variant: 'h6'}}/>
          <DataGridDemo/>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Dashboard Table' titleTypographyProps={{variant: 'h6'}}/>
          <DashboardTable rows={rows}/>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Basic Table' titleTypographyProps={{variant: 'h6'}}/>
          <TableBasic/>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Dense Table' titleTypographyProps={{variant: 'h6'}}/>
          <TableDense/>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{variant: 'h6'}}/>
          <TableStickyHeader/>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Collapsible Table' titleTypographyProps={{variant: 'h6'}}/>
          <TableCollapsible/>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Spanning Table' titleTypographyProps={{variant: 'h6'}}/>
          <TableSpanning/>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Customized Table' titleTypographyProps={{variant: 'h6'}}/>
          <TableCustomized/>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
