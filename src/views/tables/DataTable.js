import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {useAuthContext} from "../../lib/auth";
import {postApi} from "../../lib/request-api";



export default function DataGridDemo(props) {
 const {setItemEdit} = props
  const [nhatky, setNhatky] = useState([]);
  const [loading, setLoading] = useState(false);
  const {auth} = useAuthContext()

  const columns= [
    { field: 'stt', headerName: 'STT', width: 90,
      disableColumnMenu: true,
    },
    {
      field: 'title',
      headerName: 'Tên công việc',
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: 'type',
      headerName: 'Loại công việc',
      width: 150,
      disableColumnMenu: true
    },
    {
      field: 'detail',
      headerName: 'Chi tiết công việc',
      width: "300",
      disableColumnMenu: true
    },
    {
      field: 'date',
      headerName: 'Ngày thực hiện',
      width: 150,
      disableColumnMenu: true
    },
    {
      headerName: 'Thao tác',
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) =>
        <div><Button onClick={e=>{setItemEdit(params.row)}}>Sửa</Button>
    <Button color="error" onClick={e=>{deleteRow(params.row)}}>Delete</Button></div>
      ,
    },
  ];

  const deleteRow = (row) => {
    postApi('nhatky/update', {id: row.id, type: "delete"})
    setLoading(loading=> !loading)
  }

  useEffect(() => {
    fetch(`http://test.nhanchauthanhdt.vn/api/nhatky/fetch?user=${auth}&muavu=${"2022"}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setNhatky(data)
      })

  }, [loading])

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={nhatky}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
