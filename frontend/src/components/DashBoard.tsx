import { Box, Button, Divider, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Rooms from "./MainPage/Rooms";

interface RoomData {
  number_of_listeners: number;
  total_play_time: number;
  most_played_song: string;
  top_artist: string;
}

const DashBoard = () => {
  const [data, setData] = useState<Record<string, RoomData> | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data from server:", data);
        setData(data);
      })
      .catch((error) => console.error("Error:", error.message));
  }, []);
  /*
  if (!data) {
    return <div>Loading...</div>;
  }
*/
  const rowStyling = {
    width: "100%",
    padding: "20px",
    marginBottom: "50px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  }
  const paperStyling = {
    padding: "20px",
    width: "30%"
  }
  const paperElevation = 1;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          height: "80vh",
          overflow: "auto"
        }}
      >
        General Data
        <Box sx={rowStyling}>
          {/*<Paper elevation={paperElevation} sx={{ ...paperStyling, height: "100%" }}>
            <h3>
              Top Artists:
            </h3>
            <ol>
              <li><h4>Artist number 1</h4></li>
              <li><h4>Numba 2</h4></li>
              <li><h4>3</h4></li>
            </ol>
      </Paper>*/}
          <Paper elevation={paperElevation} sx={paperStyling}>
            Top Queuers: <br />
            <img src="/topQueuers.png" alt="" width={"100%"} />
          </Paper>
          <Paper elevation={paperElevation} sx={paperStyling}>
            Top Skippers: <br />
            <img src="/topSkippers.png" alt="" width={"100%"} />
          </Paper>
        </Box>



        Most Played Songs
        <Box sx={rowStyling}>
          <Paper elevation={paperElevation} sx={paperStyling}>
            Room 1: <br />
            <img src="/topSongs1.png" alt="" width={"100%"} />
          </Paper>
          <Paper elevation={paperElevation} sx={paperStyling}>
            Room 2: <br />
            <img src="/topSongs2.png" alt="" width={"100%"} />
          </Paper>
          <Paper elevation={paperElevation} sx={paperStyling}>
            Room 3: <br />
            <img src="/topSongs3.png" alt="" width={"100%"} />
          </Paper>
        </Box>
        Room Stats
        <Box sx={rowStyling}>
          <Paper elevation={paperElevation} sx={paperStyling}>
            Number of listeners: <br />
            <img src="/numberOfListeners.png" alt="" width={"100%"} />
          </Paper>
          <Paper elevation={paperElevation} sx={paperStyling}>
            Total Playtime: <br />
            <img src="/playtime.png" alt="" width={"100%"} />
          </Paper>
        </Box>
      </Box>
  
    </>
  );
};

export default DashBoard;