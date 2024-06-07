using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Distributed;
using RealTimeChat.Models;
using Microsoft.EntityFrameworkCore;
using RealTimeChat.Data;
using RealTimeChat.Models;

namespace RealTimeChat.Hubs;

public interface IChatClient
{
    public Task ReceiveMessage(string userName, string message);
}

public class ChatHub : Hub<IChatClient>
    {
        private readonly ApplicationContext _context;

        public ChatHub(ApplicationContext context)
        {
            _context = context;
        }

        public async Task JoinChat(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.chatRoom);

            connection.connectionId = Context.ConnectionId;
            _context.UserConnections.Add(connection);
            await _context.SaveChangesAsync();

            //await Clients
            //    .Group(connection.chatRoom)
            //    .ReceiveMessage("Admin", $"{connection.userName} присоединился к чату");
        }

        public async Task SendMessage(string message)
        {
            var connection = await _context.UserConnections
                .FirstOrDefaultAsync(c => c.connectionId == Context.ConnectionId);

            if (connection is not null)
            {
                await Clients
                    .Group(connection.chatRoom)
                    .ReceiveMessage(connection.userName, message);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var connection = await _context.UserConnections
                .FirstOrDefaultAsync(c => c.connectionId == Context.ConnectionId);

            if (connection is not null)
            {
                _context.UserConnections.Remove(connection);
                await _context.SaveChangesAsync();
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, connection.chatRoom);

                //await Clients
                //    .Group(connection.chatRoom)
                //    .ReceiveMessage("Admin", $"{connection.userName} покинул чат");
            }

            await base.OnDisconnectedAsync(exception);
        }
    }