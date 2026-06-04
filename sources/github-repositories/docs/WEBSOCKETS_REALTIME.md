# Real-time Features with WebSockets

## Socket.IO Setup

### Installation

```bash
npm install socket.io
npm install --save-dev @types/socket.io
```

### Server Configuration

```typescript
// src/socket.ts
import { Server } from 'socket.io';
import http from 'http';

export function initSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST'],
    },
  });

  // Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!validateToken(token)) {
      return next(new Error('Authentication error'));
    }
    next();
  });

  // Connection handler
  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    // Join room
    socket.on('join', (room) => {
      socket.join(room);
      io.to(room).emit('user-joined', {
        userId: socket.id,
        count: io.sockets.adapter.rooms.get(room)?.size,
      });
    });

    // Message handler
    socket.on('message', (data) => {
      io.to(data.room).emit('message', {
        userId: socket.id,
        text: data.text,
        timestamp: Date.now(),
      });
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });

  return io;
}
```

### Express Integration

```typescript
import express from 'express';
import http from 'http';
import { initSocket } from './socket';

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

## Client Implementation

```typescript
// Client-side
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: {
    token: localStorage.getItem('auth_token'),
  },
});

// Connect
socket.on('connect', () => {
  console.log('Connected');
  socket.emit('join', 'room-name');
});

// Listen for messages
socket.on('message', (data) => {
  console.log(`${data.userId}: ${data.text}`);
});

// Send message
function sendMessage(text) {
  socket.emit('message', {
    room: 'room-name',
    text: text,
  });
}

// Disconnect
socket.disconnect();
```

## Features

### Rooms & Broadcasting

```typescript
// Send to specific room
io.to('room-name').emit('event', data);

// Send to everyone except sender
socket.broadcast.emit('event', data);

// Send to all
io.emit('event', data);
```

### Namespaces

```typescript
const notifications = io.of('/notifications');

notifications.on('connection', (socket) => {
  socket.on('alert', (data) => {
    notifications.emit('new-alert', data);
  });
});
```

### Events

```typescript
// Custom events
socket.on('custom-event', (data) => {
  // Handle event
});

socket.emit('response', { status: 'ok' });
```

## Real-time Examples

### Live Notifications

```typescript
// Server
io.to(userId).emit('notification', {
  title: 'New message',
  body: 'You have a new message',
});

// Client
socket.on('notification', (data) => {
  showNotification(data);
});
```

### Collaborative Editing

```typescript
socket.on('text-change', (data) => {
  io.to(documentId).emit('text-changed', {
    userId: socket.id,
    position: data.position,
    text: data.text,
  });
});
```

### Presence Tracking

```typescript
socket.on('user-status', (status) => {
  io.to('presence').emit('status-update', {
    userId: socket.id,
    status: status, // 'online', 'away', 'offline'
  });
});
```

## Best Practices

✅ Authenticate connections
✅ Validate message data
✅ Use rooms for targeting
✅ Implement error handling
✅ Clean up resources
✅ Log important events
✅ Rate limit events
✅ Monitor connection count

## Performance Optimization

```typescript
// Enable compression
const io = new Server(server, {
  transports: ['websocket', 'polling'],
  compress: true,
});

// Monitor
io.engine.on('connection_error', (err) => {
  console.error(err);
});
```

See real-time documentation for more patterns.
