# API Documentation - Frontend Requirements

## Tổng quan

Frontend CodePulse yêu cầu backend implement các API endpoints sau. Tất cả requests đều có base URL `http://localhost:3001/api` và sử dụng JWT authentication.

### Headers chung

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {access_token}"
}
```

---

## 1. AUTHENTICATION APIs

### 1.1 POST /auth/login

**Đăng nhập user**

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**

```json
{
  "user": {
    "id": "number",
    "name": "string",
    "email": "string"
  },
  "access_token": "string",
  "refresh_token": "string"
}
```

**Error (401):**

```json
{
  "message": "Invalid credentials"
}
```

### 1.2 POST /auth/register

**Đăng ký user mới**

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201):**

```json
{
  "user": {
    "id": "number",
    "name": "string",
    "email": "string"
  },
  "access_token": "string",
  "refresh_token": "string"
}
```

**Error (400):**

```json
{
  "message": "User already exists"
}
```

### 1.3 POST /auth/logout

**Đăng xuất user**

**Response (200):**

```json
{
  "message": "Logged out successfully"
}
```

### 1.4 POST /auth/refresh

**Refresh access token**

**Request Body:**

```json
{
  "refresh_token": "string"
}
```

**Response (200):**

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

### 1.5 GET /auth/profile

**Lấy thông tin profile**

**Response (200):**

```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "profile": {
    "avatar": "string|null",
    "bio": "string",
    "joinedAt": "string (ISO date)"
  }
}
```

---

## 2. COURSES APIs

### 2.1 GET /courses

**Lấy danh sách tất cả courses**

**Response (200):**

```json
[
  {
    "id": "number",
    "title": "string",
    "description": "string",
    "lang_id": "number",
    "level": "Cơ bản|Trung bình|Nâng cao",
    "image": "string (URL)",
    "rating": "number",
    "duration": "string",
    "lessons": "number",
    "progress": "number (0-100)",
    "isFavorite": "boolean"
  }
]
```

### 2.2 GET /courses/language/{langId}

**Lấy courses theo ngôn ngữ**

**Path Parameters:** `langId`

**Response (200):** Array of courses (same format as above)

### 2.3 GET /courses/{id}

**Lấy chi tiết course**

**Path Parameters:** `id`

**Response (200):**

```json
{
  "id": "number",
  "title": "string",
  "description": "string",
  "lang_id": "number",
  "level": "string",
  "image": "string",
  "rating": "number",
  "duration": "string",
  "lessons": "number",
  "progress": "number",
  "isFavorite": "boolean",
  "intro": "string",
  "outcomes": ["string"]
}
```

---

## 3. LESSONS APIs

### 3.1 GET /courses/{courseId}/lessons

**Lấy lessons của course**

**Path Parameters:** `courseId`

**Response (200):**

```json
[
  {
    "id": "number",
    "course_id": "number",
    "title": "string",
    "description": "string",
    "content": "string (HTML/markdown)",
    "readTime": "string",
    "order": "number"
  }
]
```

### 3.2 GET /lessons/{id}

**Lấy chi tiết lesson**

**Path Parameters:** `id`

**Response (200):** Single lesson object (same format as above)

---

## 4. EXERCISES APIs

### 4.1 GET /lessons/{lessonId}/exercises

**Lấy exercises của lesson**

**Path Parameters:** `lessonId`

**Response (200):**

```json
[
  {
    "id": "number",
    "lesson_id": "number",
    "title": "string",
    "description": "string",
    "code_template": "string",
    "test_cases": [
      {
        "input": "string",
        "expected_output": "string"
      }
    ],
    "difficulty": "string",
    "points": "number"
  }
]
```

### 4.2 GET /exercises/{id}

**Lấy chi tiết exercise**

**Path Parameters:** `id`

**Response (200):** Single exercise object (same format as above)

---

## 5. PROGRESS APIs

### 5.1 GET /progress

**Lấy progress của user**

**Response (200):**

```json
{
  "user_id": "number",
  "courses_completed": "number",
  "lessons_completed": "number",
  "exercises_completed": "number",
  "total_xp": "number",
  "streak_days": "number"
}
```

### 5.2 POST /progress/lessons/{lessonId}

**Cập nhật lesson progress**

**Path Parameters:** `lessonId`

**Request Body:**

```json
{
  "completed": "boolean",
  "progress_percentage": "number"
}
```

**Response (200):**

```json
{
  "user_id": "number",
  "lesson_id": "number",
  "completed": "boolean",
  "progress_percentage": "number",
  "updated_at": "string (ISO date)"
}
```

### 5.3 POST /progress/exercises/{exerciseId}

**Cập nhật exercise progress**

**Path Parameters:** `exerciseId`

**Request Body:**

```json
{
  "completed": "boolean",
  "score": "number"
}
```

**Response (200):**

```json
{
  "user_id": "number",
  "exercise_id": "number",
  "completed": "boolean",
  "score": "number",
  "updated_at": "string (ISO date)"
}
```

---

## 6. LANGUAGES API

### 6.1 GET /languages

**Lấy danh sách languages**

**Response (200):**

```json
[
  {
    "id": "number",
    "name": "string"
  }
]
```

---

## 7. COMPILER APIs

### 7.1 POST /compiler/run

**Chạy code**

**Request Body:**

```json
{
  "language": "javascript|python|c++|java|c#",
  "code": "string"
}
```

**Response (200):**

```json
{
  "output": "string"
}
```

### 7.2 POST /compiler/submit

**Submit code cho exercise**

**Request Body:**

```json
{
  "exerciseId": "number",
  "code": "string"
}
```

**Response (200):**

```json
{
  "success": "boolean",
  "passed": "boolean",
  "message": "string",
  "comments": [
    {
      "content": "string"
    }
  ],
  "warning": "boolean"
}
```

---

## 8. FEEDBACK APIs

### 8.1 POST /feedback/course

**Submit course feedback**

**Request Body:**

```json
{
  "course_id": "number",
  "rating": "number (1-5)",
  "comment": "string"
}
```

### 8.2 POST /feedback/exercise/{exerciseId}

**Submit exercise feedback**

**Path Parameters:** `exerciseId`

**Request Body:**

```json
{
  "rating": "number (1-5)",
  "comment": "string"
}
```

### 8.3 GET /feedback/stats/{courseId}

**Lấy feedback stats**

**Path Parameters:** `courseId`

**Response (200):**

```json
{
  "course_id": "number",
  "average_rating": "number",
  "total_reviews": "number",
  "rating_distribution": {
    "1": "number",
    "2": "number",
    "3": "number",
    "4": "number",
    "5": "number"
  }
}
```

---

## 9. CHALLENGES APIs

### 9.1 GET /challenges

**Lấy danh sách challenges**

**Query Parameters (optional):**

- `difficulty`: "Dễ|Trung bình|Khó"
- `tags`: ["string"]
- `sortBy`: "difficulty|participants|points"

**Response (200):**

```json
[
  {
    "id": "number",
    "title": "string",
    "description": "string",
    "difficulty": "string",
    "points": "number",
    "participants": "number",
    "tags": ["string"],
    "timeLimit": "number"
  }
]
```

### 9.2 GET /challenges/{challengeId}

**Lấy chi tiết challenge**

**Path Parameters:** `challengeId`

**Response (200):** Single challenge object (same format as above)

### 9.3 POST /challenges/{challengeId}/submit

**Submit challenge**

**Path Parameters:** `challengeId`

**Request Body:**

```json
{
  "code": "string",
  "language": "string"
}
```

**Response (200):**

```json
{
  "challengeId": "number",
  "passed": "boolean",
  "timeSpent": "number",
  "points": "number",
  "message": "string",
  "testCases": "string",
  "submittedAt": "string"
}
```

---

## 10. EXAM APIs

### 10.1 GET /exam/courses

**Lấy courses available cho exam**

**Response (200):**

```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "difficulty": "Cơ bản|Trung bình|Nâng cao",
    "estimatedTime": "string",
    "totalLessons": "number",
    "hasExam": "boolean",
    "examStatus": "available|locked|completed"
  }
]
```

### 10.2 GET /exam/{courseId}

**Lấy exam data**

**Path Parameters:** `courseId`

**Response (200):**

```json
{
  "basicQuiz": {
    "questions": [
      {
        "id": "number",
        "question": "string",
        "options": ["string"],
        "correctAnswer": "number",
        "explanation": "string"
      }
    ]
  },
  "advancedTasks": [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "testCases": [
        {
          "input": "string",
          "expected": "string"
        }
      ]
    }
  ],
  "passingScore": "number",
  "badges": [
    {
      "id": "number",
      "name": "string",
      "description": "string",
      "icon": "string"
    }
  ]
}
```

### 10.3 POST /exam/{courseId}/submit-quiz

**Submit quiz answers**

**Path Parameters:** `courseId`

**Request Body:**

```json
{
  "answers": ["number"],
  "timeSpent": "number"
}
```

**Response (200):**

```json
{
  "courseId": "string",
  "totalQuestions": "number",
  "correctAnswers": "number",
  "score": "number",
  "passed": "boolean",
  "passingScore": "number",
  "results": [
    {
      "questionId": "number",
      "userAnswer": "number",
      "correctAnswer": "number",
      "isCorrect": "boolean",
      "explanation": "string"
    }
  ],
  "submittedAt": "string",
  "timeSpent": "number"
}
```

### 10.4 POST /exam/{courseId}/submit-task

**Submit task code**

**Path Parameters:** `courseId`

**Request Body:**

```json
{
  "taskId": "number",
  "code": "string",
  "language": "string"
}
```

**Response (200):**

```json
{
  "courseId": "string",
  "taskId": "number",
  "passed": "boolean",
  "testResults": [
    {
      "input": "string",
      "expected": "string",
      "actual": "string",
      "passed": "boolean"
    }
  ],
  "allTestsPassed": "boolean",
  "executionTime": "number",
  "memoryUsed": "number",
  "submittedAt": "string",
  "code": "string",
  "language": "string"
}
```

---

## 11. PROFILE APIs

### 11.1 GET /profile/{userId}

**Lấy user profile**

**Path Parameters:** `userId`

**Response (200):**

```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "avatar": "string",
  "bio": "string",
  "level": "number",
  "xp": "number",
  "streak": "number",
  "joinedAt": "string"
}
```

### 11.2 PUT /profile/{userId}

**Cập nhật user profile**

**Path Parameters:** `userId`

**Request Body:**

```json
{
  "name": "string",
  "bio": "string",
  "avatar": "string"
}
```

**Response (200):** Updated profile object (same format as GET)

### 11.3 GET /profile/{userId}/courses

**Lấy courses của user**

**Path Parameters:** `userId`

**Response (200):**

```json
[
  {
    "id": "number",
    "title": "string",
    "progress": "number",
    "completed": "boolean",
    "enrolledAt": "string"
  }
]
```

### 11.4 GET /profile/{userId}/badges

**Lấy badges của user**

**Path Parameters:** `userId`

**Response (200):**

```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "icon": "string",
    "earnedAt": "string"
  }
]
```

### 11.5 GET /profile/{userId}/stats

**Lấy stats của user**

**Path Parameters:** `userId`

**Response (200):**

```json
{
  "totalXP": "number",
  "coursesCompleted": "number",
  "challengesCompleted": "number",
  "streakDays": "number",
  "rank": "number",
  "totalUsers": "number"
}
```

---

## 12. RANKINGS APIs

### 12.1 GET /rankings

**Lấy leaderboard**

**Query Parameters (optional):**

- `course`: "string"
- `limit`: "number"

**Response (200):**

```json
[
  {
    "id": "number",
    "name": "string",
    "avatar": "string",
    "xp": "number",
    "rank": "number",
    "course": "string",
    "badge": "string"
  }
]
```

### 12.2 GET /rankings/user/{userId}

**Lấy ranking của user**

**Path Parameters:** `userId`

**Response (200):**

```json
{
  "id": "number",
  "name": "string",
  "avatar": "string",
  "xp": "number",
  "rank": "number",
  "course": "string",
  "badge": "string",
  "totalUsers": "number"
}
```

### 12.3 GET /rankings/stats

**Lấy ranking stats**

**Response (200):**

```json
{
  "totalUsers": "number",
  "averageXP": "number",
  "topXP": "number",
  "coursesCount": "number"
}
```

---

## Error Response Format

Tất cả errors đều trả về format:

```json
{
  "message": "string"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication Notes

- Tất cả protected endpoints cần `Authorization: Bearer {token}` header
- JWT tokens tự động refresh khi 401 response
- Refresh token được lưu trong localStorage

---

## Data Types & Validation

### User

```json
{
  "id": "integer",
  "name": "string (2-50 chars)",
  "email": "string (valid email)",
  "password": "string (min 6 chars)"
}
```

### Course

```json
{
  "id": "integer",
  "title": "string (required)",
  "description": "string (required)",
  "lang_id": "integer (FK)",
  "level": "enum: Cơ bản, Trung bình, Nâng cao",
  "image": "string (URL)",
  "rating": "decimal (0-5)",
  "duration": "string",
  "lessons": "integer",
  "progress": "integer (0-100)",
  "isFavorite": "boolean"
}
```

### Lesson

```json
{
  "id": "integer",
  "course_id": "integer (FK)",
  "title": "string",
  "description": "string",
  "content": "text",
  "readTime": "string",
  "order": "integer"
}
```

### Exercise

```json
{
  "id": "integer",
  "lesson_id": "integer (FK)",
  "title": "string",
  "description": "string",
  "code_template": "text",
  "test_cases": "json array",
  "difficulty": "string",
  "points": "integer"
}
```
