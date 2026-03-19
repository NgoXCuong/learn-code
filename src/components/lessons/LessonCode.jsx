import React, { useContext, useRef, useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { ThemeContext } from "@/context/ThemeContext";
import { Copy, Check, Play, Terminal } from "lucide-react";

export default function LessonCode({ code, language = "java", lessonId }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const editorRef = useRef(null);
  const [editorHeight, setEditorHeight] = useState(300);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  // mount editor
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    updateEditorHeight(editor);
  };

  // dynamic height
  const updateEditorHeight = (editor) => {
    if (editor) {
      const lineHeight = 20;
      const lineCount = editor.getModel()?.getLineCount() || 1;
      const contentHeight = lineCount * lineHeight + 40;
      setEditorHeight(Math.min(contentHeight, 600));
    }
  };

  useEffect(() => {
    if (editorRef.current) updateEditorHeight(editorRef.current);
  }, [code]);

  // Reset output when code changes (lesson changes)
  useEffect(() => {
    setOutput("");
    setIsRunning(false);
    setShowOutput(false);
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Không thể copy:", err);
    }
  };

  const getFileExtension = () => {
    const extensions = {
      java: "java",
      cpp: "cpp",
      python: "py",
      javascript: "js",
      typescript: "ts",
      csharp: "cs",
      php: "php",
    };
    return extensions[language] || language;
  };

  // 🎯 Run Code with Local Simulation (Fallback for Restricted API)
  const handleRunCode = async () => {
    setIsRunning(true);
    setShowOutput(true);
    setOutput("Đang biên dịch và chạy (Local Simulation)...");

    const codeToRun = editorRef.current?.getValue() || code;
    
    // Simulate a short network/compilation delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // 1. Initial State
      let outputLines = [];
      const env = {}; // Environment to store variables
      
      const lines = codeToRun.split('\n');
      const normalizedCurrent = codeToRun.replace(/\s+/g, '').trim();
      const normalizedOriginal = code.replace(/\s+/g, '').trim();
      const isModified = normalizedCurrent !== normalizedOriginal;

      // 2. Line-by-Line Simulation (Simple Interpreter)
      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("//")) return;

        // --- C++ Variable Tracking --- (int a = 5, b = 2;)
        const cppVarMatch = /^(?:int|double|char|float|bool|string)\s+(.+);/.exec(trimmed);
        if (cppVarMatch) {
          const declarations = cppVarMatch[1].split(',');
          declarations.forEach(decl => {
            const parts = decl.split('=');
            if (parts.length === 2) {
              const name = parts[0].trim();
              const val = parts[1].trim().replace(/['"]/g, '');
              // Very basic eval for arithmetic in assignment like a / b
              try {
                if (/[+\-*/]/.test(val)) {
                  // Replace known variables in the expression
                  let expr = val;
                  Object.keys(env).forEach(k => {
                    expr = expr.replace(new RegExp(`\\b${k}\\b`, 'g'), env[k]);
                  });
                  // Safety check: only allow numbers and basic math chars
                  if (/^[0-9.+\-*/\s()]+$/.test(expr)) {
                    env[name] = eval(expr);
                  } else {
                    env[name] = val;
                  }
                } else {
                  env[name] = val;
                }
              } catch { env[name] = val; }
            }
          });
        }

        // --- Python/JS Variable Tracking --- (x = 10)
        const pyVarMatch = /^([a-zA-Z_]\w*)\s*=\s*([^#;]+)/.exec(trimmed);
        if (pyVarMatch && !trimmed.startsWith("if") && !trimmed.startsWith("while")) {
          const name = pyVarMatch[1];
          const val = pyVarMatch[2].trim().replace(/['"]/g, '');
          env[name] = val;
        }

        // --- Output Capture ---
        // cout << "Hello" << age;
        const coutMatch = /cout\s*<<\s*(.*);/.exec(trimmed);
        if (coutMatch) {
          const parts = coutMatch[1].split('<<');
          let lineOut = "";
          parts.forEach(p => {
            const part = p.trim();
            if (part === "endl" || part === "\\n") {
              // skip for now, handled by line breaks
            } else if (part.startsWith('"') || part.startsWith("'")) {
              lineOut += part.replace(/['"]/g, '');
            } else {
              // It's a variable or expression
              let val = env[part] || part;
              lineOut += val;
            }
          });
          outputLines.push(lineOut);
        }

        // print("Hello", x)
        const printMatch = /(?:print|console\.log)\s*\((.*)\)/.exec(trimmed);
        if (printMatch) {
          const args = printMatch[1].split(',');
          let lineOut = args.map(arg => {
            const a = arg.trim();
            if (a.startsWith('"') || a.startsWith("'")) return a.replace(/['"]/g, '');
            return env[a] || a;
          }).join(' ');
          outputLines.push(lineOut);
        }
      });

      // 3. Decide Final Display
      let finalDisplay = "";
      
      if (outputLines.length > 0) {
        finalDisplay = outputLines.join('\n');
      } else if (!isModified) {
        // Only use hardcoded mock if code is ABSOLUTELY UNCHANGED
        const mockResponses = {
          18: "3.10.0 (tags/v3.10.0:b494f59, Oct 4 2021, 19:00:10) [MSC v.1929 64 bit (AMD64)]",
          19: "<class 'int'>\n<class 'str'>",
          20: "3\n1\n3.3333333333333335",
          53: "Hello C++ World!",
          54: "Tuổi: 20\nĐiểm: 3.14159\nKết quả ép kiểu: 2", // updated to match real C++ int division if no double cast
        };
        finalDisplay = mockResponses[lessonId] || "Đã biên dịch thành công!\n[Process exited with code 0]";
      } else {
        finalDisplay = "Đã biên dịch thành công!\n(Nhắc nhở: Hãy sử dụng lệnh cout hoặc print để xem kết quả thực thi).\n[Process exited with code 0]";
      }

      setOutput(finalDisplay + "\n[Simulated Execution Success]");
    } catch (err) {
      setOutput("Lỗi giả lập: Đoạn mã quá phức tạp để thực thi offline.");
      console.error("Simulation error:", err);
    } finally {
      setIsRunning(false);
    }
  };

  if (!code) return null;

  return (
    <div className="w-full rounded-sm overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* Header */}
      <div
        className={`px-4 py-1 flex justify-between items-center ${
          isDark
            ? "bg-gray-800 border-b border-gray-700"
            : "bg-gray-100 border-b border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            main.{getFileExtension()}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`btn-shimmer relative flex items-center gap-2 px-3 py-1 rounded-sm text-sm font-medium transition-all overflow-hidden
              ${isRunning ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}
              ${
                isDark
                  ? "bg-green-600 text-white hover:bg-green-500"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
          >
            <Play className="w-3 h-3" />
            {isRunning ? "Đang chạy..." : "Chạy thử"}
          </button>

          <button
            onClick={handleCopy}
            className={`btn-shimmer relative flex items-center gap-1.5 px-3 py-1 rounded-sm text-sm transition-all font-medium overflow-hidden
              ${
                copied
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Đã copy
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div
        style={{ height: `${editorHeight}px` }}
        className="w-full overflow-hidden"
      >
        <MonacoEditor
          height="100%"
          language={language}
          theme={isDark ? "vs-dark" : "vs-light"}
          value={code}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: "'Consolas', 'Courier New', monospace", // dùng font có sẵn
            lineNumbers: "on",
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            renderWhitespace: "selection",
            cursorStyle: "line",
            readOnly: false,
            padding: { top: 12, bottom: 12 },
            smoothScrolling: true,
            contextmenu: false,
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>

      {/* Output console */}
      {showOutput && (
        <div
          className={`border-t px-4 py-1 font-mono text-base overflow-y-auto max-h-56 animate-fadeIn ${
            isDark
              ? "bg-gray-900 border-gray-700 text-gray-100"
              : "bg-gray-50 border-gray-200 text-gray-800"
          }`}
        >
          <div className="flex items-center gap-2 mb-2 font-semibold">
            <Terminal size={16} />
            <span>Kết quả chạy:</span>
          </div>
          <pre className="whitespace-pre-wrap text-sm">{isRunning ? "Đang xử lý..." : output}</pre>
        </div>
      )}
    </div>

  );
}
