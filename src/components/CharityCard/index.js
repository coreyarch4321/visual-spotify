import React from 'react';
import { observer } from "mobx-react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const CharityCard = observer(({ title, url, onClick }) => {
  return (
    <Card onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component={() => <img src={url} width={600} height={600} />}
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

export default CharityCard;
