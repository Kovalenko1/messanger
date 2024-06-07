export const Message = ({ messageInfo }) => {
	return (
		<div className="w-fit ">
			<span className="text-sm text-slate-600">{messageInfo.userName}</span>
			<div className="p-2 bg-green-600 rounded-lg shadow-md">
				{console.log(messageInfo)}
				{messageInfo.message}
			</div>
		</div>
	);
};
