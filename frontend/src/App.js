import { useState } from "react";
import { Messanger } from "./components/Messager.jsx";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Chat } from "./components/Chat.jsx";
import { Header } from "./components/Header.jsx";

const App = () => {
	const [connection, setConnection] = useState(null);
	const [messages, setMessages] = useState([]);
	const [chatRoom, setChatRoom] = useState([]);
	const [chatRooms, setChatRooms] = useState([]);
	const [Name, setName] = useState([]);

	const joinChat = async (userName, chatRoom) => {
		var connection = new HubConnectionBuilder()
			.withUrl("http://localhost:5000/chat")
			.withAutomaticReconnect()
			.build();

		if (messages) connection.on("ReceiveMessage", (userName, message, chatRoom) => {
			setMessages((messages) => [...messages, { userName, message }]);
		});

		try {
			await connection.start();
			await connection.invoke("JoinChat", { userName, chatRoom });

			setConnection(connection);
			setChatRoom(chatRoom);
			setChatRooms((chatRooms => [... new Set(chatRooms), (userName, chatRoom)]));

		} catch (error) {
			console.log(error);
		}
	};

	const sendMessage = async (message) => {
		await connection.invoke("SendMessage", message);
	};

	const closeChat = async () => {
		await connection.stop();
		setConnection([]);
		setMessages([])
	};

	return (
		<>
			<Header Name={Name}/>
				<div className="">
					<Messanger joinChat={joinChat}
							   messages={messages}
							   sendMessage={sendMessage}
							   closeChat={closeChat}
							   chatRoom={chatRoom}
							   chatRooms={chatRooms}
					/>
			</div>
		</>
	);
};

export default App;
