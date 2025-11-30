# API Switching System - Frontend

Hệ thống này cho phép frontend dễ dàng chuyển đổi giữa Mock API và Real API khi backend chưa sẵn sàng.

## 📁 Cấu trúc Files

```
frontend/src/
├── api/
│   ├── apiService.js          # Factory để switch API
│   ├── apiClient.js           # HTTP client cho real API
│   ├── mockApiService.js      # Mock API service
│   ├── realApiService.js      # Real API service
│   └── coursesApi.js          # API functions (sử dụng apiService)
├── config/
│   └── api.js                 # API configuration & endpoints
├── components/dev/
│   └── ApiSwitcher.jsx        # Development component để test switching
├── .env                       # Environment variables
└── .env.example               # Template cho .env
```

## 🔧 Cách hoạt động

### 1. Environment Configuration

```bash
# .env
VITE_USE_MOCK_API=true    # true = Mock API, false = Real API
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000
```

### 2. API Service Factory

- Tự động chọn Mock hoặc Real API dựa trên `VITE_USE_MOCK_API`
- Cùng interface cho cả Mock và Real API
- Có thể switch runtime trong development

### 3. Consistent API Interface

```javascript
// Cả Mock và Real API đều có cùng methods
{
  getCourses(),
  getLessonsByCourse(courseId),
  login(credentials),
  runCode(codeData),
  // ... etc
}
```

## 🚀 Cách sử dụng

### Development (Mock API)

```bash
# .env
VITE_USE_MOCK_API=true
```

### Production (Real API)

```bash
# .env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://your-api-domain.com/api
```

### Runtime Switching (Development Only)

```javascript
import { switchToMockAPI, switchToRealAPI } from "@/api/apiService";

// Switch to mock
switchToMockAPI();

// Switch to real
switchToRealAPI();
```

## 📝 Khi Backend hoàn thiện

### Bước 1: Cập nhật .env

```bash
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://your-production-api.com/api
```

### Bước 2: Verify API Endpoints

- Kiểm tra `realApiService.js` có đúng endpoints không
- Test từng API call qua ApiSwitcher component
- Fix bất kỳ mismatch nào giữa Mock và Real API responses

### Bước 3: Update Authentication

- Thêm JWT token handling trong `AuthContext.jsx`
- Update login/register flows
- Add token refresh logic

### Bước 4: Update Progress Sync

- Thay thế localStorage bằng API calls trong `ProgressContext.jsx`
- Implement offline-first caching nếu cần

### Bước 5: Remove Development Code

```javascript
// Remove ApiSwitcher from App.jsx
// Remove mock-related code nếu không cần nữa
```

## 🧪 Testing API Switching

1. **Start development server:**

   ```bash
   npm run dev
   ```

2. **Use ApiSwitcher component:**

   - Component sẽ hiện ở góc dưới phải trong development
   - Click "Use Mock" hoặc "Use Real" để switch
   - Click "Test API Call" để verify

3. **Check console logs:**
   ```
   🔄 Using MOCK API service
   🔄 Switched to REAL API service
   ```

## 🔍 Troubleshooting

### API Call Failures

- Check network tab trong DevTools
- Verify API endpoints trong `config/api.js`
- Check CORS settings trên backend
- Verify authentication headers

### Mock vs Real Data Mismatch

- Ensure Mock API returns same data structure as Real API
- Update mock data để match real API responses
- Check error handling trong components

### Authentication Issues

- Verify JWT token format
- Check token storage in localStorage
- Test token refresh flow

## 📋 TODO khi Backend hoàn thiện

- [ ] Update tất cả API endpoints trong `realApiService.js`
- [ ] Implement JWT authentication
- [ ] Add error handling cho network failures
- [ ] Implement progress synchronization
- [ ] Add API response caching (React Query/SWR)
- [ ] Update data validation
- [ ] Add API rate limiting awareness
- [ ] Implement offline support nếu cần

## 🎯 Benefits

1. **Zero Downtime Migration**: Switch từ Mock sang Real API chỉ bằng 1 env variable
2. **Consistent Interface**: Code không cần thay đổi khi switch API
3. **Easy Testing**: Test API switching trong development
4. **Maintainable**: Clean separation giữa Mock và Real implementations
5. **Type Safety**: Cùng interface đảm bảo consistency
