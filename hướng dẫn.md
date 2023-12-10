### path: /auth/sign-in
```ecmascript 6

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", "3223@gmail.com");
    urlencoded.append("password", "121212");
    urlencoded.append("isRemember", "true");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/auth/sign-in", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));    

```

### path: /auth/sign-up

```ecmascript 6
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("email", "3223@gmail.com");
urlencoded.append("password", "121212");
urlencoded.append("username", "seemeter");
urlencoded.append("phone", "01221221");
urlencoded.append("address", "chòa mnwgwf");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("http://localhost:3000/auth/sign-up", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

### path: /rotation-luck/get-rotation-result

```ecmascript 6
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:3000/rotation-luck/get-rotation-result", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

#### data response

```json
{
    "id": 1,
    "title": "Item 1",
    "description": "Description 1",
    "image": "https://via.placeholder.com/150"
}
```


cài đặt mongoosedb local để chạy test

```js
// db.config.js
const DB_CONFIG = {
    HOST: "127.0.0.1",
    PORT: 27017,
    DB: "sua_ha_nam",
};

```