**Deployed APP URL**

[Deployed chat app ](https://5f7b62b6d5653923fc03e4a6--wizardly-rosalind-b53985.netlify.app/)

**Notes**

```

Whenever we want to do anything that is realtime we use sockets and not http which are much more faster that
HTTP.

Hooks enable us do what otherwise would not have been possible in function based componets.This includes that functional
components may now have state as well as LifeCycle Methods.

There is a difference between Link and React Router.Router is more of how you create routes themselves and Link is more like a url that leads to the route.

JSX helps you write javascript in between your HTML.

```

**JSX**

```
JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement()  and/or appendChild() methods.

Passsing data as query strings is where you decide to pass the data via a url as opposed to passing it via props or redux.

Use effect brings in lifecyle methods in class based components.
When  we redirect via the react router we are able to have access to the location and can be able to get the url parameters.

The array passed as a parameter in use effect specifies the instance that useEffect will run.

Socket emit()  after creating an instance of the socket is what passes the data to the backend.

```

**Socket io callbacks**

```
These happen after specific events have been emitted.

  server side
  socket.on('join', ({ name, room }, callback) => {
    const error = true;

    if (error) {
      callback({ error: 'error' });
    }
    console.log(name, room);
  });


  client side(receives the callback)
  socket.emit('join', { name, room }, ({ error }) => {
      alert(error);
    });

Naming of the event emiited by the socket example 'join' should be uniform..both at the
client and at the server side.

When ever i emit an event..I listen for it via socket.on()

```

**Client Side Packages**

```
npm install --save react-router socket.io-client react-scroll-to-bottom react-emoji query-string

```

**Server side packages**

```
nodemon
express
socket.io
cors

```

**Notes by**

```
Mbugua Caleb
```
