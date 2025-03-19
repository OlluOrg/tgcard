## **Base URL**
All API requests should be made to the base URL:
```
http://localhost/
```

---

## **General Request Format**
All requests must include an `action` parameter, which specifies the controller and method to be executed. The format is:
```
action = <controller>.<method>
```
- `<controller>`: The name of the controller (e.g., `businessCard`, `viewHistory`).
- `<method>`: The method to be called (e.g., `create`, `read`, `update`, `delete`).

All requests must be sent using the `POST` method.

---

## **Error Responses**
If the `action` parameter is missing or invalid, the API will return an error response with one of the following status codes:
- `400 Bad Request`: Missing or invalid `action` parameter.
- `404 Not Found`: Controller or method not found.

---

## **Controllers and Methods**

### **1. Business Card Controller**
Manages business card-related operations.

#### **1.1 Create Business Card**
- **Action**: `businessCard.create`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "action": "businessCard.create",
    "data": {
      "userId": "user_id",
      "data": {} // Business card data
    }
  }
  ```
- **Response**:
  ```json
  {
    "id": "business_card_id"
  }
  ```

#### **1.2 Read Business Card**
- **Action**: `businessCard.read`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "action": "businessCard.read",
    "id": "business_card_id", // Optional
    "userId": "user_id" // Optional
  }
  ```
- **Response**:
  - If `id` or `userId` is provided:
    ```json
    {
      "_id": "business_card_id",
      "userId": "user_id",
      "data": {}
    }
    ```
  - If neither `id` nor `userId` is provided (returns all business cards):
    ```json
    [
      {
        "_id": "business_card_id_1",
        "userId": "user_id_1",
        "data": {}
      },
      {
        "_id": "business_card_id_2",
        "userId": "user_id_2",
        "data": {}
      }
    ]
    ```

#### **1.3 Update Business Card**
- **Action**: `businessCard.update`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "action": "businessCard.update",
    "id": "business_card_id",
    "data": {
      "userId": "user_id",
      "data": {} // Updated business card data
    }
  }
  ```
- **Response**:
  ```json
  {
    "modifiedCount": 1
  }
  ```

#### **1.4 Delete Business Card**
- **Action**: `businessCard.delete`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "action": "businessCard.delete",
    "id": "business_card_id"
  }
  ```
- **Response**:
  ```json
  {
    "deletedCount": 1
  }
  ```

---

### **2. View History Controller**
Manages view history-related operations.

#### **2.1 Add View**
- **Action**: `viewHistory.addView`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "action": "viewHistory.addView",
    "userId": "user_id",
    "cardId": "business_card_id"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success"
  }
  ```

#### **2.2 Get Views**
- **Action**: `viewHistory.getViews`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "action": "viewHistory.getViews",
    "userId": "user_id"
  }
  ```
- **Response**:
  ```json
  [
    {
      "_id": "business_card_id_1",
      "userId": "user_id",
      "data": {}
    },
    {
      "_id": "business_card_id_2",
      "userId": "user_id",
      "data": {}
    }
  ]
  ```

---

## **Error Codes**
| Code | Message                          | Description                                      |
|------|----------------------------------|--------------------------------------------------|
| 400  | `Action parameter is required`   | Missing `action` parameter.                      |
| 400  | `Data is required for create`    | Missing `data` in create requests.               |
| 400  | `ID is required`                 | Missing `id` in update/delete requests.          |
| 400  | `ID and data are required`       | Missing `id` or `data` in update requests.       |
| 404  | `Controller not found`           | Invalid controller name in `action`.             |
| 404  | `Method not found`               | Invalid method name in `action`.                 |
| 404  | `Resource not found`             | Requested resource (e.g., card) not found.       |

---

## **Examples**

### **Create Business Card**
```bash
curl -X POST http://localhost/ \
  -H "Content-Type: application/json" \
  -d '{
    "action": "businessCard.create",
    "data": {
      "userId": "12345",
      "data": {
        "title": "Business Card 1",
        "content": "Sample content"
      }
    }
  }'
```

### **Read Business Card**
```bash
curl -X POST http://localhost/ \
  -H "Content-Type: application/json" \
  -d '{
    "action": "businessCard.read",
    "id": "12345"
  }'
```

### **Update Business Card**
```bash
curl -X POST http://localhost/ \
  -H "Content-Type: application/json" \
  -d '{
    "action": "businessCard.update",
    "id": "12345",
    "data": {
      "userId": "12345",
      "data": {
        "title": "Updated Business Card"
      }
    }
  }'
```

### **Delete Business Card**
```bash
curl -X POST http://localhost/ \
  -H "Content-Type: application/json" \
  -d '{
    "action": "businessCard.delete",
    "id": "12345"
  }'
```

### **Add View History**
```bash
curl -X POST http://localhost/ \
  -H "Content-Type: application/json" \
  -d '{
    "action": "viewHistory.addView",
    "userId": "user1",
    "cardId": "card1"
  }'
```

### **Get View History**
```bash
curl -X POST http://localhost/ \
  -H "Content-Type: application/json" \
  -d '{
    "action": "viewHistory.getViews",
    "userId": "user1"
  }'
```

---

This documentation covers all the API endpoints and their usage, with all methods using the `POST` HTTP method. For further assistance, refer to the source code or contact the development team.