// Mock feedback data for different scenarios
export const mockFeedbackData = {
  // Successful feedback
  success: {
    passed: true,
    score: 95,
    testsPassed: 8,
    totalTests: 10,
    comments: [
      {
        type: "success",
        text: "🎉 Xuất sắc! Code của bạn đã pass tất cả test cases",
      },
      {
        type: "success",
        text: "Cấu trúc code rõ ràng, dễ đọc và tuân thủ best practices",
      },
      {
        type: "success",
        text: "Xử lý input/output chính xác theo yêu cầu bài tập",
      },
      {
        type: "success",
        text: "Sử dụng biến và kiểu dữ liệu phù hợp",
      },
      {
        type: "info",
        text: "💡 Mẹo: Có thể tối ưu thuật toán để performance tốt hơn",
      },
    ],
    suggestions: [
      "Sử dụng HashMap thay vì nested loops để tối ưu độ phức tạp từ O(n²) xuống O(n)",
      "Xem xét edge cases: mảng rỗng, số âm, số trùng lặp",
      "Thêm validation đầu vào để tránh lỗi runtime",
    ],
    solutionCode: `public class Main {
    public static void main(String[] args) {
        int age = 20;
        if(age >= 18) {
            System.out.println("Bạn đã trưởng thành");
        } else {
            System.out.println("Bạn chưa trưởng thành");
        }
    }
}`,
  },

  // Failed feedback
  failed: {
    passed: false,
    score: 40,
    testsPassed: 3,
    totalTests: 10,
    comments: [
      {
        type: "warning",
        text: "❌ Lỗi logic: Điều kiện if-else không xử lý đúng tất cả trường hợp",
      },
      {
        type: "warning",
        text: "⚠️ Thiếu validation: Không kiểm tra input đầu vào có hợp lệ không",
      },
      {
        type: "warning",
        text: "🔍 Sai output format: Kết quả in ra không đúng yêu cầu",
      },
      {
        type: "info",
        text: "💭 Cần test thêm với edge cases như tuổi âm, tuổi = 0",
      },
      {
        type: "info",
        text: "📖 Đọc kỹ đề bài: Kiểm tra lại yêu cầu input/output",
      },
    ],
    suggestions: [
      "Kiểm tra lại điều kiện if-else để đảm bảo logic đúng",
      "Thêm validation cho đầu vào (tuổi không thể âm)",
      "Test với nhiều trường hợp khác nhau",
      "Đọc kỹ yêu cầu bài tập trước khi code",
    ],
    solutionCode: `public class Main {
    public static void main(String[] args) {
        int age = 20;
        if(age < 0) {
            System.out.println("Tuổi không hợp lệ");
        } else if(age >= 18) {
            System.out.println("Bạn đã trưởng thành");
        } else {
            System.out.println("Bạn chưa trưởng thành");
        }
    }
}`,
  },

  // Perfect score feedback
  perfect: {
    passed: true,
    score: 100,
    testsPassed: 10,
    totalTests: 10,
    comments: [
      {
        type: "success",
        text: "Code hoàn hảo! Tất cả test case đều pass",
      },
      {
        type: "success",
        text: "Code sạch sẽ, dễ đọc và hiệu quả",
      },
      {
        type: "success",
        text: "Xử lý tốt các edge case",
      },
      {
        type: "success",
        text: "Sử dụng best practices",
      },
    ],
    suggestions: [
      "Code của bạn đã rất tốt, không có gì để cải thiện thêm",
      "Có thể thử áp dụng vào các bài tập nâng cao hơn",
    ],
    solutionCode: `public class Main {
    public static void main(String[] args) {
        int age = Integer.parseInt(args[0]);
        if(age < 0) {
            System.out.println("Tuổi không hợp lệ");
            return;
        }

        String result = age >= 18 ? "Bạn đã trưởng thành" : "Bạn chưa trưởng thành";
        System.out.println(result);
    }
}`,
  },

  // Low score feedback
  low: {
    passed: false,
    score: 20,
    testsPassed: 1,
    totalTests: 10,
    comments: [
      {
        type: "warning",
        text: "Nhiều lỗi cơ bản trong code",
      },
      {
        type: "warning",
        text: "Chưa hiểu đúng yêu cầu bài tập",
      },
      {
        type: "info",
        text: "Cần ôn tập lại kiến thức cơ bản",
      },
    ],
    suggestions: [
      "Đọc kỹ đề bài và hiểu yêu cầu",
      "Thử code từng phần nhỏ trước",
      "Test code thường xuyên trong quá trình viết",
      "Xem lại các bài học cơ bản",
    ],
    solutionCode: `public class Main {
    public static void main(String[] args) {
        // Đọc tuổi từ input
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        System.out.print("Nhập tuổi: ");
        int age = scanner.nextInt();

        // Kiểm tra và in kết quả
        if (age >= 18) {
            System.out.println("Bạn đã trưởng thành");
        } else if (age >= 0) {
            System.out.println("Bạn chưa trưởng thành");
        } else {
            System.out.println("Tuổi không hợp lệ");
        }

        scanner.close();
    }
}`,
  },
};

// Default feedback (can be randomized)
export const getRandomFeedback = () => {
  const keys = Object.keys(mockFeedbackData);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return mockFeedbackData[randomKey];
};

// Get feedback by type
export const getFeedbackByType = (type) => {
  return mockFeedbackData[type] || mockFeedbackData.success;
};
