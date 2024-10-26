import React, { useState } from "react";

export default function TextForm(props) {
  // Use the useState hook to manage the text state
  const [text, setText] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result); // Set the file content in textarea
      };
      reader.readAsText(file); // Read file as plain text
    }
  };

  // Function to convert the text to uppercase when the button is clicked
  const handleUpClick = () => {
    // Update the text state with uppercase version of the current text
    setText(text.toUpperCase());
  };

  // Function to convert the text to lowercase when the button is clicked
  const handleLowClick = () => {
    // Update the text state with lowercase version of the current text
    setText(text.toLowerCase());
  };

  const [isCapitalized, setCapitalized] = useState(false);
  const handleCapClick = () => {
    setCapitalized(!isCapitalized);
  };

  const [isBold, setisBold] = useState(false);
  const handleBoldClick = () => {
    // Toggle the bold state
    setisBold(!isBold);
  };

  const [isItalic, setIsItalic] = useState(false);
  const handleItalicClick = () => {
    // Toggle the bold state
    setIsItalic(!isItalic);
  };

  const [isUnderline, setUnderline] = useState(false);
  const handleUnderlineClick = () => {
    // Toggle the underline state
    setUnderline(!isUnderline);
  };

  const handleClrClick = () => {
    // Clear the text state
    setText("");
  };

  const [history, setHistory] = useState([text]);
  const [index, setIndex] = useState(0);

  const handleUndo = () => {
    if (index > 0) {
      setIndex(index - 1);
      setText(history[index - 1]);
    }
  };

  const handleRedo = () => {
    if (index < history.length - 1) {
      setIndex(index + 1);
      setText(history[index + 1]);
    }
  };

  const handleOnChange = (event) => {
    const newText = event.target.value;
    setHistory([...history.slice(0, index + 1), newText]);
    setIndex(index + 1);
    setText(newText);
  };

  //Function to handle the text state change
  // const handleOnChange = (event) => {
  //   // Runs every time the text is changed
  //   console.log("Handle onChange");
  //   // Update the text state with the current input value
  //   setText(event.target.value);
  // };

  function calculateTime(numWords) {
    // Time taken to read one word in minutes
    const timePerWord = 0.008;
    // Total time taken to read all words in minutes
    const totalTimeMinutes = numWords * timePerWord;
    // Convert total time from minutes to seconds
    const totalTimeSeconds = Math.floor(totalTimeMinutes * 60);
    // Calculate minutes and seconds
    const minutes = Math.floor(totalTimeMinutes);
    const seconds = totalTimeSeconds % 60;
    return `${minutes} minutes ${seconds} seconds`;
  }

  let words = text.split(" ").filter((word) => word.length > 0).length;

  return (
    <>
      <div className="container mb-3">
        <h3>{props.heading}</h3>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            style={{
              fontWeight: isBold ? "bold" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
              textDecoration: isUnderline ? "underline" : "none",
              textTransform: isCapitalized ? "capitalize" : "none",
            }}
            placeholder="Enter Text Here"
            onChange={handleOnChange}
            id="myBox"
            rows="10"
          ></textarea>
        </div>
        <button
          className="btn btn-outline-primary me-4 my-2"
          onClick={handleUpClick}
        >
          Convert To Uppercase
        </button>
        <button
          className="btn btn-outline-primary me-4 my-2"
          onClick={handleLowClick}
        >
          Convert To Lowercase
        </button>
        <button
          className="btn btn-outline-primary me-4 my-2"
          onClick={handleCapClick}
        >
          {isCapitalized ? "Normal" : "Capitalize"}
        </button>
        <button
          className="btn btn-outline-primary me-4 my-2"
          onClick={handleBoldClick}
        >
          {isBold ? "Remove Bold" : "Convert to Bold"}
        </button>
        <button
          className="btn btn-outline-primary me-4 my-2"
          onClick={handleItalicClick}
        >
          {isBold ? "Remove Italics" : "Convert to Italics"}
        </button>
        <button
          className="btn btn-outline-primary me-4 my-2"
          onClick={handleUnderlineClick}
        >
          {isUnderline ? "Remove Underline" : "Underline Text"}
        </button>
        <button
          className="btn btn-outline-primary me-4 my-2"
          onClick={handleClrClick}
        >
          {/* Clear Text */}
          <i class="fa fa-home"></i>
        </button>
        <button className="btn btn-outline-primary me-2" onClick={handleUndo}>
          Undo
        </button>
        <button className="btn btn-outline-primary me-2" onClick={handleRedo}>
          Redo
        </button>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="btn btn-outline-primary my-2"
        />
      </div>

      {/* Text Summary */}
      <div className="container border border-dark rounded-2 p-3 my-3">
        <h3>Your Text Summary:</h3>
        <p>
          Word Count: {words} <br />
          Characters Count: {text.length} <br />
          Minutes Read: {calculateTime(words)}
          <br />
        </p>
        <div className="container border border-dark rounded-2 p-3">
          <h4>Text Preview:</h4>
          <p>
            {" "}
            {text.length > 0
              ? text
              : "Enter the text in the above area to preview !"}
          </p>
        </div>
      </div>
    </>
  );
}
