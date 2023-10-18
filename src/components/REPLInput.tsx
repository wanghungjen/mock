import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { sensitiveHeaders } from "http2";
import { History } from "./REPLHistory";
import { exampleCSVWithoutHeader } from "./mock/mockCSV";
import { exampleCSVWithHeader } from "./mock/mockCSV";
import { searchCSVWithoutHeaderColumn2Valueto } from "./mock/mockSearchResult";
import { searchCSVWithHeaderColumnAgeValue18 } from "./mock/mockSearchResult";
import React, { useEffect } from "react";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: History[];
  setHistory: Dispatch<SetStateAction<History[]>>;
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");

  // Manages the current filepath
  const [fileString, setFileString] = useState<string>("");
  const args = commandString.split(" ");
  const command = args[0];

  // Creates a Map that links the string to the filepath so its mocked
  const mockDatasets: Map<string, JSX.Element[]> = new Map([
    ["filepath_without_headers", exampleCSVWithoutHeader],
    ["filepath_with_headers", exampleCSVWithHeader],
    ["search2to", searchCSVWithoutHeaderColumn2Valueto],
    ["searchAge18", searchCSVWithHeaderColumnAgeValue18],
  ]);

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    // Assuming you have already split commandString into 'command' and 'args'

    // View functionality
    if (command === "view") {
      if (fileString === "") {
        alert("File not loaded");
      } else {
        const dataset = mockDatasets.get(fileString);
        const newHistoryEntry: History = {
          commandLine: `View file: ${fileString}`,
          table: dataset || [],
        };
        props.setHistory([...props.history, newHistoryEntry]);
      }
    }

    // Search functionality
    else if (command === "search") {
      if (fileString === "") {
        alert("File not loaded");
      } else if (
        args[1] === "2" &&
        args[2] === "to" &&
        fileString === "filepath_without_headers"
      ) {
        const newHistoryEntry: History = {
          commandLine: `Search Column Index ${args[1]} for value ${args[2]}`,
          table: mockDatasets.get("search2to"),
        };
        props.setHistory([...props.history, newHistoryEntry]);
      } else if (
        args[1] == "Age" &&
        args[2] == "18" &&
        fileString === "filepath_with_headers"
      ) {
        const newHistoryEntry: History = {
          commandLine: `Search Column Index ${args[1]} for value ${args[2]}`,
          table: mockDatasets.get("searchAge18"),
        };
        props.setHistory([...props.history, newHistoryEntry]);
      } else {
        alert(
          "No searches found given column " + args[1] + " and search " + args[2]
        );
      }
    }

    // Load functionality
    else if (command === "load_file") {
      if (
        args[1] === "filepath_without_headers" ||
        args[1] === "filepath_with_headers"
      ) {
        const loadHistory: History = {
          commandLine: `Loaded file: ${args[1]}`,
          table: [],
        };
        props.setHistory([...props.history, loadHistory]);
      } else {
        alert("File not found");
      }
      setFileString(args[1]);
    }

    // Switching mode functionality
    else if (command === "mode") {
      // Handle the 'brief' and 'verbose' commands if needed
      if (args[1].toLowerCase() === "brief") {
        props.setMode(true);
      } else if (args[1].toLowerCase() === "verbose") {
        props.setMode(false);
      } else {
        alert("Please enter 'brief' or 'verbose'");
      }
    } else {
      alert("Invalid command entered");
    }
    setCommandString("");
  }

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)} role="button">
        Submit
      </button>
    </div>
  );
}
