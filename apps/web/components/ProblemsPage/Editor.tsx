"use client";
import { useEffect, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { submissionType, testCaseType } from "@/app/api/submissions/route";

const defineCustomTheme = (monaco: Monaco) => {
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

  // Apply the theme
  monaco.editor.setTheme("custom-dark-theme");
};

export default function CodeEditor({
  code,
  id,
}: {
  code: string | undefined;
  id: string;
}) {
  const [currcode, setcurrCode] = useState<string | undefined>(code);
  const [testCases, setTestCases] = useState<testCaseType[] | undefined>(
    undefined
  );
  const [submission, setSubmission] = useState<submissionType | undefined>(
    undefined
  );
  // Handle code changes
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setcurrCode(value);
    }
  };

  const poll = async ({ id, tries }: { id: string; tries: number }) => {
    if (tries === 0) {
      alert("Sorry");
    }

    const res = await axios.post("/api/verify", {
      submission_id: id,
    });

    const currSubmission: submissionType = await res.data.submission;
    const currTestCases = await res.data.testCases;
    setTestCases(currTestCases);
    setSubmission(currSubmission);
    if (currSubmission.status === "ACCEPTED") {
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
    const res = await axios.post("/api/submissions", {
      code: currcode,
      problem_id: id,
      language_id: 63,
    });
    const currTestCases = await res.data.testCases;
    const currSubmission: submissionType = await res.data.submission;
    setTestCases(currTestCases);
    setSubmission(currSubmission);
    poll({ id: currSubmission.id, tries: 10 });
  };

  return (
    <div className="rounded-3xl h-full flex flex-col gap-10">
      <div className="flex items-center">
        <span className="text-white bg-slate-900 p-2 rounded-xl px-3 flex gap-2 font-semibold">
          {" "}
          Javascript <ChevronDown />
        </span>
      </div>
      <Editor
        defaultLanguage="javascript"
        defaultValue={code}
        value={code}
        theme="custom-dark-theme"
        beforeMount={defineCustomTheme} // Ensures theme is set before editor loads
        options={{
          scrollBeyondLastLine: false,
          fontSize: 20,
          lineNumbers: "on",
          minimap: { enabled: false },
        }}
        className="rounded-3xl h-96"
        onChange={handleEditorChange}
      />
      <div className="flex justify-between">
        <div>
          {testCases !== undefined &&
            testCases.map((t, i) => (
              <div key={i} className="text-white">
                {t.status}
              </div>
            ))}
        </div>
        <Button className="p-5 text-md font-semibold" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
