export const ChatSideBar = ({ roomsInfo, userName, joinChat, closeChat, chatRooms}) => {
	const onSubmit = (e) => {
		if (chatRooms.isArray && chatRooms?.length) chatRooms = new Set(chatRooms);
		e.preventDefault();
		closeChat();
		joinChat(userName, roomsInfo);
	};

	return (
		<div className="message-list">
			<div className="contact-name" onClick={onSubmit}>{(roomsInfo === "Hello" || roomsInfo === null) ? "Hello" : roomsInfo } </div>
		</div>
	);
};
