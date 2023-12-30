import { Box } from "@mui/material";
import "./Style.css";
import SingleChat from "./SingleChat";
import { useState } from "react";
// import { ChatState } from "../Context/ChatProvider";

const Chatpage = ({ fetchAgain, setFetchAgain }) => {
  // const { selectedChat } = ChatState();
  const [selectedChat,setSelectedChat] = useState("")

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatpage;