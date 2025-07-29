"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface CustomCardProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

const CustomCard = (props: CustomCardProps) => {
  return (
    <Card
      onClick={props?.onClick}
      sx={{
        width: "fit-content",
        height: "fit-content",
        padding: 1,
        cursor: props.onClick ? "pointer" : "default",
      }}
    >
      <CardContent sx={{ padding: 1 }}>
        <Typography variant="body1" component="p">
          {props.title}
        </Typography>
        {props.description && (
          <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 11 }}>
            {props.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
