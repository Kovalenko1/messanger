import { Button, CloseButton, Heading, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import SearchImg from "../assets/img/search.png"
import ProfilePhotoNone from "../assets/img/profilePhotoNone.png"


export const Header = ({ messages, chatRoom, sendMessage, closeChat, Name }) => {
	const [message, setMessage] = useState("");
	const messagesEndRef = useRef(null);
	const onSendMessage = () => {
		sendMessage(message);
		setMessage("");
	};
	const toggleShow = () => {
		var el = document.getElementById("box");
		el.classList.toggle("show");
	}

	return (

		<header className="header">
				<div className="logo">SH</div>
				<div className="contact-header">
					<img className="profile-img" src={ProfilePhotoNone} alt="Victor Johnmark"/>
					<div className="name-block">
						<span className="profile-name">fff</span>
						<span className="v">v</span>
					</div>

				</div>

		</header>
	);
};
