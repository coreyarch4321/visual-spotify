import React from 'react';
import { observer } from "mobx-react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const TrackCard = observer(({ title, url, onClick }) => {
  return (
    <Card onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component={() => <img src={url} />}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
})

export default TrackCard;
