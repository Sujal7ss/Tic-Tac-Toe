# to generate a custom session ID 

```
const uuid = require("uuid");

io.engine.generateId = (req) => {
  return uuid.v4(); // must be unique across all Socket.IO servers
}
```


Utility methods
Some utility methods were added in Socket.IO v4.0.0 to manage the Socket instances and their rooms:

socketsJoin: makes the matching socket instances join the specified rooms
socketsLeave: makes the matching socket instances leave the specified rooms
disconnectSockets: makes the matching socket instances disconnect
fetchSockets: returns the matching socket instances
The serverSideEmit method was added in Socket.IO v4.1.0.

