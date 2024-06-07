import { Button, CloseButton, Heading, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import VideoImg from "./../assets/img/video.png"
import CallImg from "./../assets/img/call.png"
import OptionImg from "./../assets/img/options.png"
import EnterImg from "./../assets/img/enter.png"

export const Chat = ({ messages, chatRoom, sendMessage, closeChat }) => {
	const [message, setMessage] = useState("");
	const messagesEndRef = useRef(null);



	const onSendMessage = () => {
		sendMessage(message);
		setMessage("");
	};

	return (
		<main className="chat">
			<div className="chat-header">
				<p className="contact-name">{chatRoom}</p>
				<div className="chat-actions">
					<img src={VideoImg} className="action-button"></img>
					<img src={CallImg} className="action-button"></img>
					<img src={OptionImg} className="action-button"></img>
				</div>
			</div>
			<div className="messages">
				{messages ? messages.map((messageInfo, index) => (
					<Message messageInfo={messageInfo} key={index} />
				)): ("nope")}
			</div>
			<div className="message-input">
				<input className="input-box"
					   type="text"
					   value={message}
					   onChange={(e) => setMessage(e.target.value)}
					   placeholder="Введите сообщение"
				/>
				<img src={EnterImg} className="send-button" onClick={onSendMessage}></img>
			</div>
		</main>
	);
};
