"use client";
import { CircleCheckBig } from "lucide-react";
import { useEffect, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { ChevronDown, Loader2, Play, X } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { submissionType, testCaseType } from "@/app/api/submissions/route";
import { updateStreaks } from "@/app/actions/streakUpdateAction";
import { useTheme } from "next-themes";

const defineThemes  = (monaco: Monaco) => {
  monaco.editor.defineTheme("custom-dark-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "#F97583" }, // Bright pink-red for keywords
      { token: "variable", foreground: "#9CDCFE" }, // Soft blue for variables
      { token: "number", foreground: "#B392F0" }, // Muted purple for numbers
      { token: "delimiter", foreground: "#CBD5E1" }, // Light gray for brackets/parentheses
      { token: "operator", foreground: "#FF79C6" }, // Pink for operators
      { token: "identifier", foreground: "#79B8FF" }, // Bright blue for function names
      { token: "type", foreground: "#4EC9B0" }, // Cyan-green for types
      { token: "parameter.variable", foreground: "#FFAB70" }, // Soft orange for parameters
      { token: "string", foreground: "#E6DB74" }, // Mustard yellow for strings
      { token: "comment", foreground: "#64748B" }, // Slate blue-gray for comments
    ],
    colors: {
      "editor.background": "#0F172A",
      "editor.foreground": "#F8FAFC", // Brighter white for better readability
      "editorLineNumber.foreground": "#475569", // Muted slate for line numbers
      "editor.lineHighlightBackground": "#1E293B", // Slightly brighter highlight
      "editorCursor.foreground": "#F8FAFC",
      "editor.selectionBackground": "#334155", // Better contrast selection
      "editor.selectionHighlightBackground": "#33415599", // Semi-transparent version
      "editorIndentGuide.background": "#334155",
      "editorIndentGuide.activeBackground": "#475569",
    },
  });

  // Define both light and dark themes

  
  // Define a custom light theme
  monaco.editor.defineTheme("custom-light-theme", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "#D73A49" }, // Dark red for keywords
      { token: "variable", foreground: "#0366D6" }, // Blue for variables
      { token: "number", foreground: "#005CC5" }, // Darker blue for numbers
      { token: "delimiter", foreground: "#24292E" }, // Dark gray for delimiters
      { token: "operator", foreground: "#D73A49" }, // Red for operators
      { token: "identifier", foreground: "#005CC5" }, // Blue for function names
      { token: "type", foreground: "#22863A" }, // Green for types
      { token: "parameter.variable", foreground: "#E36209" }, // Orange for parameters
      { token: "string", foreground: "#032F62" }, // Navy for strings
      { token: "comment", foreground: "#6A737D" }, // Gray for comments
    ],
    colors: {
      "editor.background": "#FFFFFF",
      "editor.foreground": "#24292E",
      "editorLineNumber.foreground": "#6A737D",
      "editor.lineHighlightBackground": "#F1F8FF",
      "editorCursor.foreground": "#24292E",
      "editor.selectionBackground": "#C8E1FF",
      "editor.selectionHighlightBackground": "#C8E1FF99",
      "editorIndentGuide.background": "#EAF2F8",
      "editorIndentGuide.activeBackground": "#C8E1FF",
    },
  });

  // Apply the theme
  // monaco.editor.setTheme("custom-dark-theme");
};

type SubmissionStatus = "idle" | "PENDING" | "ACCEPTED" | "REJECTED";

export default function CodeEditor({
  code,
  id,
  userId,
  c_id,
  isContest = false,
  c_p_id
}: {
  code: string | undefined;
  id: string;
  userId : string;
  c_id? : string
  isContest? : boolean
  c_p_id? :string
}) {
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [currcode, setcurrCode] = useState<string | undefined>(code);
  const [testCases, setTestCases] = useState<testCaseType[] | undefined>(
    undefined
  );
  const [theme , setTheme] = useState<string>()
  const [submission, setSubmission] = useState<submissionType | undefined>(
    undefined
  );
  const [isContestSubmission,setIsContestSubmission] = useState(isContest)
  const { resolvedTheme}  = useTheme()
  const {  refreshKey } = useThemeRefresh()

  const handleEditorBeforeMount = (monaco: Monaco) => {
    defineThemes(monaco);
    
    // Set the theme based on the resolved theme
    const editorTheme = resolvedTheme === 'dark' ? 'custom-dark-theme' : 'custom-light-theme';
    monaco.editor.setTheme(editorTheme);
    setTheme(editorTheme)
  };

  // Handle code changes
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setcurrCode(value);
    }
  };

  const poll = async ({ id, tries }: { id: string; tries: number }) => {
    if (tries === 0) {
      alert("Sorry");
      setSubmissionStatus("REJECTED")
      return
    }

    const res = await axios.post("/api/verify", {
      submission_id: id,
    });

    const currSubmission: submissionType = await res.data.submission;
    const currTestCases = await res.data.testCases;
    setTestCases(currTestCases);
    setSubmission(currSubmission);
    setSubmissionStatus(currSubmission.status);
    if (currSubmission.status === "ACCEPTED") {
      await updateStreaks({id : userId})
      return;
    } else if (currSubmission.status === "REJECTED") {
      return;
    } else {
      await new Promise<void>((res, rej) => {
        setTimeout(() => {
          res();
        }, 2500);
      });
      await poll({ id, tries: tries - 1 });
    }
  };

  // Access the code (e.g., on button click)
  const handleSubmit = async () => {
    setSubmissionStatus("PENDING");
    const res = await axios.post("/api/submissions", {
      code: currcode,
      problem_id: id,
      language_id: 63,
      contest_id : c_id,
      contest_problem_id : c_p_id
    });
    const currTestCases = await res.data.testCases;
    const currSubmission: submissionType = await res.data.submission;
    setTestCases(currTestCases);
    setSubmission(currSubmission);
    setSubmissionStatus(currSubmission.status);
    poll({ id: currSubmission.id, tries: 10 });
  };

  return (
    <div className="rounded-3xl h-full flex flex-col gap-3">
      <div className="flex items-center">
        <span className="text-content-secondary bg-secondary p-2 rounded-xl px-3 flex gap-2 font-semibold">
          {" "}
          Javascript <ChevronDown />
        </span>
      </div>
      <div className="rounded-3xl">
      <Editor
        key={refreshKey}
        defaultLanguage="javascript"
        defaultValue={code}
        value={code}
        theme={theme}
        beforeMount={handleEditorBeforeMount}
        options={{
          scrollBeyondLastLine: false,
          fontSize: 16,
          lineNumbers: "on",
          minimap: { enabled: false }
        }}
        className="rounded-3xl min-h-96 border-2 p-4 [&>.monaco-editor]:rounded-md"
        onChange={handleEditorChange}
      />
      </div>
      <div className="flex justify-between">
        {/* <div>
          {testCases !== undefined &&
            testCases.map((t, i) => (
              <div key={i} className="text-white">
                {t.status}
              </div>
            ))}
        </div> */}
        <div className="w-full max-w-3xl bg-primary dark:bg-primary rounded-lg text-white border bborder-border dark:border-border">
          <div className="flex justify-between items-center py-3 px-4 text-xl font-semibold">
            <div className="flex items-center">
              {submissionStatus === "PENDING" ? (
                <Loader2 className="h-5 w-5 mr-2 text-blue-400 animate-spin" />
              ) : submissionStatus === "ACCEPTED" ? (
                <CircleCheckBig className="h-5 w-5 mr-2 text-green-500" />
              ) : submissionStatus === "REJECTED" ? (
                <X className="h-5 w-5 mr-2 text-red-500" />
              ) : null}

              {submissionStatus === "PENDING" ? (
                <span className="text-blue-400">Processing...</span>
              ) : submissionStatus === "ACCEPTED" ? (
                <span className="text-green-500">Accepted</span>
              ) : submissionStatus === "REJECTED" ? (
                <span className="text-red-500">Rejected</span>
              ) : null}
            </div>

            <div className="flex gap-2 items-center h-10">
              <Button
                variant="outline"
                className="bg-primary dark:bg-primary border-gray-700 hover:bg-primary hover:dark:bg-primary text-gray-300 hover:text-gray-300"
                onClick={handleSubmit}
                disabled={submissionStatus === "PENDING"}
              >
                <Play className="h-4 w-4 mr-2" />
                Run Code
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit}
                disabled={submissionStatus === "PENDING"}
              >
                {submissionStatus === "PENDING" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
          <div className="flex gap-2" >
            {testCases !== undefined &&
              (<div className="flex gap-5 p-5">
                {testCases.map((testCase, i) => (
                <div
                  key={testCase.id}
                  className={`
              px-3.5 py-2 rounded-md font-semibold text-content-secondary
              ${
                submissionStatus === "PENDING"
                  ? "bg-secondary border-gray-700"
                  : testCase.status === "AC"
                    ? "bg-secondary text-green-500"
                    : testCase.status === "FAIL" ||
                        "TLE" ||
                        "MLE" ||
                        "COMPILE_ERROR"
                      ? "bg-[#0F172A] text-red-500"
                      : "bg-gray-800 border-gray-700"
              }
            `}
                >
                  {`Case ${i + 1}`}
                  {submissionStatus === "PENDING" && (
                    <Loader2 className="h-3 w-3 ml-2 inline animate-spin" />
                  )}

                </div>
              ))}
              </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}


function useThemeRefresh() {
  const { theme } = useTheme()
  const [refreshKey, setRefreshKey] = useState(0)
  
  useEffect(() => {
    // Increment the key when theme changes to force a re-render
    setRefreshKey(prev => prev + 1)
  }, [theme])
  
  return { theme, refreshKey }
}