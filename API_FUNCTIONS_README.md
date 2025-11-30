# API Functions Documentation

Tài liệu này mô tả tất cả các API functions đã được tạo từ mock data, giúp tích hợp vào các giao diện một cách dễ dàng.

## 📁 Cấu trúc API Files

```
frontend/src/api/
├── coursesApi.js      # API cho courses, lessons, exercises
├── profileApi.js      # API cho user profile, badges, stats
├── rankingsApi.js     # API cho leaderboard, rankings
├── challengesApi.js   # API cho coding challenges
├── examApi.js         # API cho exams, quizzes
└── feedbackApi.js     # API cho feedback, reviews
```

## 🚀 Cách sử dụng

### Import và sử dụng:

```javascript
import { fetchCourses } from "@/api/coursesApi";
import { fetchUserProfile } from "@/api/profileApi";
import { fetchLeaderboard } from "@/api/rankingsApi";

// Sử dụng trong component
const courses = await fetchCourses();
const profile = await fetchUserProfile(userId);
const rankings = await fetchLeaderboard();
```

## 📋 Danh sách API Functions

### 1. Courses API (`coursesApi.js`)

#### Courses

- `fetchCourses()` - Lấy danh sách tất cả khóa học
- `fetchCoursesByLang(langId)` - Lấy khóa học theo ngôn ngữ
- `fetchCourseById(id)` - Lấy chi tiết khóa học

#### Lessons

- `fetchLessonsByCourse(courseId)` - Lấy bài học của khóa học
- `fetchLessonProgress(userId, lessonId)` - Lấy tiến độ bài học

#### Exercises

- `fetchExercisesByLesson(lessonId)` - Lấy bài tập của bài học

#### Languages

- `fetchLanguages()` - Lấy danh sách ngôn ngữ
- `fetchLanguage(langId)` - Lấy thông tin ngôn ngữ

#### Compiler

- `runCode({ language, code })` - Chạy code
- `submitExercise({ exerciseId, code })` - Nộp bài tập

### 2. Profile API (`profileApi.js`)

#### User Profile

- `fetchUserProfile(userId)` - Lấy thông tin profile
- `updateUserProfile(userId, profileData)` - Cập nhật profile

#### Courses Progress

- `fetchUserCourses(userId)` - Lấy khóa học của user
- `fetchUserCourseProgress(userId, courseId)` - Tiến độ khóa học

#### Badges

- `fetchUserBadges(userId)` - Lấy huy hiệu của user
- `unlockBadge(userId, badgeId)` - Mở khóa huy hiệu

#### Stats & Activity

- `fetchUserStats(userId)` - Thống kê user
- `fetchRecentActivity(userId, limit)` - Hoạt động gần đây
- `fetchUserAchievements(userId)` - Thành tích user

#### XP & Level

- `updateUserXP(userId, xpGained)` - Cập nhật XP
- `updateUserStreak(userId, newStreak)` - Cập nhật streak

### 3. Rankings API (`rankingsApi.js`)

#### Leaderboard

- `fetchLeaderboard(filters)` - Lấy bảng xếp hạng
- `fetchTopRankings(limit)` - Lấy top rankings
- `fetchUserRanking(userId)` - Xếp hạng của user
- `fetchCurrentUserRanking()` - Xếp hạng user hiện tại

#### Course Rankings

- `fetchCourseRankings(courseId)` - Xếp hạng theo khóa học

#### Stats & Comparison

- `fetchRankingStats()` - Thống kê rankings
- `fetchUserComparison(userId, compareWithIds)` - So sánh user

#### Updates

- `updateUserScore(userId, newXP, newCompleted)` - Cập nhật điểm

### 4. Challenges API (`challengesApi.js`)

#### Challenges

- `fetchChallenges(filters)` - Lấy danh sách challenges
- `fetchChallengeById(challengeId)` - Chi tiết challenge
- `submitChallenge(challengeId, code, language)` - Nộp challenge

#### User Progress

- `fetchUserChallengeData(userId)` - Dữ liệu challenge của user
- `updateUserChallengeProgress(userId, challengeId, progress)` - Cập nhật tiến độ

#### Leaderboard & Quests

- `fetchChallengeLeaderboard(challengeId)` - Bảng xếp hạng challenge
- `fetchDailyQuests(userId)` - Nhiệm vụ hàng ngày
- `updateQuestProgress(userId, questId, newProgress)` - Cập nhật quest
- `claimQuestReward(userId, questId)` - Nhận thưởng quest

#### Comments & Stats

- `fetchChallengeComments(challengeId, page, limit)` - Bình luận
- `addChallengeComment(challengeId, userId, content)` - Thêm bình luận
- `fetchChallengeStats(challengeId)` - Thống kê challenge

### 5. Exam API (`examApi.js`)

#### Exam Data

- `fetchExamData(courseId)` - Dữ liệu bài thi
- `fetchBasicQuiz(courseId)` - Bài trắc nghiệm cơ bản
- `fetchAdvancedTasks(courseId)` - Bài tập nâng cao

#### Submissions

- `submitQuizAnswers(courseId, answers)` - Nộp câu trả lời quiz
- `submitTaskCode(courseId, taskId, code, language)` - Nộp code bài tập

#### Progress & Results

- `fetchUserExamProgress(userId, courseId)` - Tiến độ thi
- `updateExamProgress(userId, courseId, progressData)` - Cập nhật tiến độ
- `fetchExamResults(userId, courseId)` - Kết quả thi
- `fetchExamStats(courseId)` - Thống kê bài thi

#### Course Selection

- `fetchAvailableCoursesForExam()` - Khóa học có thể thi
- `resetExamProgress(userId, courseId)` - Reset tiến độ thi

### 6. Feedback API (`feedbackApi.js`)

#### Feedback Submission

- `submitFeedback(feedbackData)` - Gửi feedback
- `submitCourseFeedback(courseId, rating, comment, anonymous)` - Feedback khóa học

#### Feedback Retrieval

- `fetchCourseFeedback(courseId, page, limit, sortBy)` - Lấy feedback khóa học
- `fetchFeedbackStats(courseId)` - Thống kê feedback
- `fetchUserFeedback(userId, page, limit)` - Feedback của user

#### Interactions

- `markFeedbackHelpful(feedbackId, userId)` - Đánh dấu hữu ích
- `reportFeedback(feedbackId, userId, reason)` - Báo cáo feedback

#### Instructor & Moderation

- `submitInstructorResponse(feedbackId, response)` - Phản hồi giảng viên
- `fetchFeedbackAnalytics(courseId, instructorId)` - Phân tích feedback
- `moderateFeedback(feedbackId, action, reason)` - Kiểm duyệt feedback

## 🔄 Response Format

Tất cả API functions đều trả về Promise và có format nhất quán:

```javascript
// Success response
{
  data: { ... }, // Actual data
  // or direct data object
}

// Error response (thrown as Error)
throw new Error("Error message");
```

## ⚡ Mock Behavior

- **Delay**: 500ms để simulate network delay
- **Success Rate**: Các API có tỷ lệ thành công ngẫu nhiên
- **Data**: Dựa trên mock data trong `/src/mock/`
- **IDs**: Sử dụng timestamp hoặc random cho new records

## 🎯 Integration Examples

### Trong React Component:

```javascript
import React, { useState, useEffect } from "react";
import { fetchCourses, fetchUserProfile } from "@/api/coursesApi";
import { fetchUserStats } from "@/api/profileApi";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [coursesData, profileData, statsData] = await Promise.all([
          fetchCourses(),
          fetchUserProfile(1),
          fetchUserStats(1),
        ]);

        setCourses(coursesData);
        setProfile(profileData);
        setStats(statsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome {profile?.name}!</h1>
      <p>
        Level: {profile?.level} | XP: {profile?.xp}
      </p>
      <p>Courses completed: {stats?.lessonsDone}</p>
      {/* Render courses, etc. */}
    </div>
  );
}
```

### Trong Custom Hook:

```javascript
import { useState, useEffect } from "react";
import { fetchLeaderboard } from "@/api/rankingsApi";

export function useLeaderboard(filters = {}) {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLeaderboard(filters);
      setRankings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [JSON.stringify(filters)]);

  return { rankings, loading, error, refetch };
}
```

## 🔧 Khi Backend hoàn thiện

1. **Cập nhật .env**: `VITE_USE_MOCK_API=false`
2. **Update API calls**: Thay thế mock logic bằng real API calls
3. **Maintain interfaces**: Giữ nguyên function signatures
4. **Test thoroughly**: Verify tất cả features hoạt động với real data

## 📝 Notes

- Tất cả functions đều async và return Promises
- Error handling đã được implement sẵn
- Mock data được thiết kế để giống real API responses
- Functions có thể được gọi từ components, hooks, hoặc services khác
