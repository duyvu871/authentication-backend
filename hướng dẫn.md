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
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("email", "thanhtruc@gmail.com");
urlencoded.append("id", "657723b240a0e6f60a0331e7");

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
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

## path:  /rotation-luck/get-rotation-list

````ecmascript 6
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:3000/rotation-luck/get-rotation-list", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
````

### data response

```javascript
[
    {
        "T_id": 1,
        "title": "Item 1",
        "description": "Description 1",
        "image": "https://via.placeholder.com/150"
    },
    {
        "T_id": 2,
        "title": "Item 2",
        "description": "Description 2",
        "image": "https://via.placeholder.com/150"
    },
    {
        "T_id": 3,
        "title": "Item 3",
        "description": "Description 3",
        "image": "https://via.placeholder.com/150"
    },
//....
]
```
## path:  /excel-service/get-collection-as-excel

tải file excel dữ liệu người dùng về về


cài đặt mongoosedb local để chạy test

```js
// db.config.js
const DB_CONFIG = {
    HOST: "127.0.0.1",
    PORT: 27017,
    DB: "sua_ha_nam",
};

```