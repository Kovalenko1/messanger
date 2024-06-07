import { Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import {ChatsSideBar} from "./ChatsSideBar";
import SearchImg from "../assets/img/search.png";
import {Chat} from "./Chat";

export const Messanger = ({ joinChat, messages, sendMessage, closeChat, chatRoom, chatRooms }) => {


	return (
		<div className="body-container">
			<ChatsSideBar joinChat={joinChat} closeChat={closeChat} chatRooms={chatRooms}/>
			<Chat
				messages={messages}
				sendMessage={sendMessage}
				closeChat={closeChat}
				chatRoom={chatRoom}
			/>

		</div>
	);
};