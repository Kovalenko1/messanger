import { Button, CloseButton, Heading, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import {ChatSideBar} from "./ChatSideBar";

import SearchImg from "../assets/img/search.png";

const removeDuplicates = (array) => {
	return array.filter((item, index) =>
		array.findIndex(i => JSON.stringify(i) === JSON.stringify(item)) === index
	);
};

export const ChatsSideBar = ({joinChat, closeChat, chatRooms}) => {
	const [userName, setUserName] = useState();
	const [charRoom, setChatRoom] = useState([]);


	const onSubmit = (e) => {
		if (chatRooms.isArray && chatRooms?.length) chatRooms = new Set(chatRooms);
		e.preventDefault();
		if(e.target.value) closeChat();
		joinChat(userName, charRoom);
		setChatRoom("");
	};

	const uniqueChatRooms = removeDuplicates(chatRooms);

	return (
		<aside className="sidebar">
			<div className="side-search-container">
				<div className="search-container">
					<input type="text" id="box" placeholder="Search anything..." className="search__box"
						   onChange={(e) => {
							   if (e.target.value) {
								   setChatRoom(e.target.value);
								   setUserName(e.target.value);
							   }
						   }
					}/>
					<img src={SearchImg} className="fas fa-search search__icon" id="icon"
						 onClick={onSubmit} ></img>
				</div>
			</div>

			<div className="contacts">
				<div className="contact-info">
					{console.log("Chatsss")} {console.log(uniqueChatRooms)}
					{(uniqueChatRooms ) ? uniqueChatRooms.map((roomsInfo, index) => (
						<ChatSideBar roomsInfo={roomsInfo}
									 userName={userName}
									 joinChat={joinChat}
									 closeChat={closeChat}
									 chatRooms={uniqueChatRooms}
									 key={index}
						/>
					)) : (<ChatsSideBar roomsInfo={"Hello"}/>)}
				</div>
			</div>
		</aside>
	);
};
