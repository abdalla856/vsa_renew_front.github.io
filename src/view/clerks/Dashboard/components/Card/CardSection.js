import React from "react";

import { Link } from "react-router-dom";

import {

  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import "./Card_style.css";

const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4",
];

const muiBaseTheme = createMuiTheme();
const handleSubmit = (e) => {
  e.preventDefault();
};
const theme = {
  overrides: {
    MuiCard: {
      root: {
        "&.MuiEngagementCard--01": {
          transition: "0.3s",
          maxWidth: 300,
          maxheight: 200,
          margin: "auto",
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
          },
          "& .MuiCardMedia-root": {
            paddingTop: "56.25%",
          },
          "& .MuiCardContent-root": {
            textAlign: "left",
            // padding: muiBaseTheme.spacing.unit * 3,
          },
          "& .MuiDivider-root": {
            margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
          },
          "& .MuiTypography--heading": {
            fontWeight: "bold",
          },
          "& .MuiTypography--subheading": {
            lineHeight: 1.8,
          },
          "& .MuiAvatar-root": {
            display: "inline-block",
            border: "2px solid white",
            "&:not(:first-of-type)": {
              marginLeft: -muiBaseTheme.spacing.unit,
            },
          },
          "& .MuiAvatar-button": {
            "&:hover": {
              backgroundColor: "blue",
              color: "white",
            },
          },
        },
      },
    },
  },
};

function CardSection() {
  return (
    <body>
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <div className="App">
          <Card className={"MuiEngagementCard--01"} sx={{ maxWidth: 345 }}>
            <CardMedia
              className={"MuiCardMedia-root"}
              image={
                // "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                "https://thumbs.dreamstime.com/z/application-under-review-little-men-reviewing-grunge-stamp-blue-white-background-32338289.jpg"
              }
            />
            <CardContent className={"MuiCardContent-root"}>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                gutterBottom
              >
                New Applications
              </Typography>
              <Typography
                className={"MuiTypography--subheading"}
                variant={"caption"}
              >
                check the new applications for Visa and i-kad that the students
                recently submitted
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/newapp">
                <Button
                  href="/newapp"
                  size="small"
                  className={"MuiAvatar-button"}
                >
                  View
                </Button>
              </Link>
            </CardActions>
          </Card>
          <Card className={"MuiEngagementCard--01"} sx={{ maxWidth: 345 }}>
            <CardMedia
              className={"MuiCardMedia-root"}
              image={
                // "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                "https://image.shutterstock.com/image-illustration/recheck-stamp-260nw-477997930.jpg"
              }
            />
            <CardContent className={"MuiCardContent-root"}>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h7"}
                gutterBottom
              >
                Re-check Applications
              </Typography>

              <br />
              <br />
              <Typography
                className={"MuiTypography--subheading"}
                variant={"caption"}
              >
                check the re-uploaded applications for Visa and i-kad that the
                students recently submitted
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/reupload">
                <Button size="small" className={"MuiAvatar-button"}>
                  View
                </Button>
              </Link>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345 }} className={"MuiEngagementCard--01"}>
            <CardMedia
              className={"MuiCardMedia-root"}
              image={
                // "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                "https://www.digitaloutlook.com.au/wp-content/uploads/2017/09/future_payment_methods-compressor-1.jpg"
              }
            />
            <CardContent className={"MuiCardContent-root"}>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                gutterBottom
              >
                Payment
              </Typography>
              <br />
              <Typography
                className={"MuiTypography--subheading"}
                variant={"caption"}
              >
                Check the payment doucments for the applications
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={"/paymentc"}>
                <Button size="small" className={"MuiAvatar-button"}>
                  View
                </Button>
              </Link>
            </CardActions>
          </Card>
          <Card className={"MuiEngagementCard--01"} sx={{ maxWidth: 345 }}>
            <CardMedia
              className={"MuiCardMedia-root"}
              image={
                // "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                // "src\assets\approved.jpg"
                "https://image.shutterstock.com/image-vector/approved-stamp-green-isolated-on-260nw-738518230.jpg"
              }
            />
            <CardContent
              className={"MuiCardContent-root"}
              style={{ padding: 8, paddingTop: 15 }}
            >
              <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                gutterBottom
              >
                Approved Applications
              </Typography>
              <br />

              <Typography
                className={"MuiTypography--subheading"}
                variant={"caption"}
              >
                You can check the finished applications withall approved
                documents
              </Typography>
              {/* <Divider className={"MuiDivider-root"} light /> */}
            </CardContent>

            <CardActions>
              <Link to={"/approved"}>
                <Button
                  size="small"
                  className={"MuiAvatar-button"}
                  onSubmit={handleSubmit}
                >
                  View
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      </MuiThemeProvider>
    </body>
  );
}

export default CardSection;
