import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import Poll from "mdi-material-ui/Poll";
import CardStatisticsVerticalComponent from "../card-statistics/card-stats-vertical";
import Grid from "@mui/material/Grid";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import BriefcaseVariantOutline from "mdi-material-ui/BriefcaseVariantOutline";
import HelpCircleOutline from "mdi-material-ui/HelpCircleOutline";
import MenuItem from "@mui/material/MenuItem";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/lab/Skeleton";
import Dialog from "@mui/material/Dialog";
import Tooltip from '@mui/material/Tooltip';
import {useAuthContext} from "../../../lib/auth";

export default function CustomizedTimeline(props) {
  const {muavu, user, setItemEdit, nkreload} = props;

  const [nhatky, setNhatky] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuthContext()

  useEffect(() => {
    fetch(`http://test.nhanchauthanhdt.vn/api/nhatky/fetch?user=${user}&muavu=${muavu}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setNhatky(data.sort((a, b) => {
          let x = dayjs(a.date);
          let y = dayjs(b.date);

          return x.diff(y);
        }))
      })

  }, [muavu, user, nkreload])

  const RenderIcon = (props) => {
    const {type} = props;

    const list = {
      chung: <WidgetsOutlinedIcon/>,
      thamvuon: <ViewInArOutlinedIcon/>,
      tuoinuoc: <OpacityOutlinedIcon/>,
      bonphan: <BubbleChartOutlinedIcon/>,
      bvtv: <HealingOutlinedIcon/>,
      tiacanh: <ContentCutOutlinedIcon/>,
      thuhoach: <PanToolOutlinedIcon/>,
      khac: <Grid3x3OutlinedIcon/>
    }

    return list[type] || <div/>
  }

  const Loading = () => {
    return (
      <Box>
        <Skeleton variant="rectangular" width={210} height={118}/>
        <Skeleton/>
        <Skeleton width="60%"/>
      </Box>
    )
  }

  const RenderTimelineItems = (props) => {
    const {muavu, handleClose, handleClickOpen, setImageUrl} = props;

    let dataMuavu = [];
    console.log(muavu)
    dataMuavu = nhatky.filter(i => i.muavu === muavu);
    dataMuavu = dataMuavu[0] && dataMuavu[0].data || [];

    const handleClick = () => {
      const anchor = document.querySelector('body')
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return nhatky.map((item) => {
      return (
        <TimelineItem key={item.title}>
          <TimelineOppositeContent
            sx={{m: 'auto 0'}}
            variant="body2"
            color="teal"
          >
            {dayjs(item.date).format("DD-MM-YYYY")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{bgcolor: 'teal'}}/>
            {auth ? <Tooltip title="Nhấn để chỉnh sửa">

              <TimelineDot color="primary" onClick={e => {
                setItemEdit(item)
                handleClick()
              }}>
                <RenderIcon type={item.type} on/>
              </TimelineDot>
            </Tooltip> :
                <TimelineDot color="primary" >
                  <RenderIcon type={item.type} on/>
                </TimelineDot>
            }

            <TimelineConnector sx={{bgcolor: 'teal'}}/>
          </TimelineSeparator>
          <TimelineContent sx={{px: 2}}>
            <CardStatisticsVerticalComponent
              title={item.title}
              image={item.image}
              color='secondary'
              subtitle={item.detail}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              setImageUrl={setImageUrl}
            />
          </TimelineContent>
        </TimelineItem>
      )
    })
  }


  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Timeline sx={{
      [`& .${timelineOppositeContentClasses.root}`]: {
        flex: 0.2,
      },
      marginLeft: "-2.5rem"
      }}>
      {loading && <Loading/>}
      <RenderTimelineItems muavu={muavu} handleClickOpen={handleClickOpen} handleClose={handleClose}
                           setImageUrl={setImageUrl}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <img alt={imageUrl} src={imageUrl} loading="lazy"/>
      </Dialog>
    </Timeline>
  );
}
