import React, { useState } from "react";

const initialGrid = [
  [5, 3, "", "", 7, "", "", "", ""],
  [6, "", "", 1, 9, 5, "", "", ""],
  ["", 9, 8, "", "", "", "", 6, ""],
  [8, "", "", "", 6, "", "", "", 3],
  [4, "", "", 8, "", 3, "", "", 1],
  [7, "", "", "", 2, "", "", "", 6],
  ["", 6, "", "", "", "", 2, 8, ""],
  ["", "", "", 4, 1, 9, "", "", 5],
  ["", "", "", "", 8, "", "", 7, 9],
];

const SudokuGame = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [message, setMessage] = useState("");

  // Handle input in the grid
  const handleInputChange = (row, col, value) => {
    if (/^[1-9]?$/.test(value)) {
      const newGrid = grid.map((r, i) => [...r]);
      newGrid[row][col] = value === "" ? "" : parseInt(value);
      setGrid(newGrid);
    }
  };

  // Validate the current grid
  const validateSudoku = () => {
    // Check rows and columns
    for (let i = 0; i < 9; i++) {
      const rowSet = new Set();
      const colSet = new Set();
      for (let j = 0; j < 9; j++) {
        // Check row
        if (grid[i][j] !== "" && rowSet.has(grid[i][j])) {
          setMessage("Invalid Solution: Duplicate in row");
          return;
        }
        rowSet.add(grid[i][j]);

        // Check column
        if (grid[j][i] !== "" && colSet.has(grid[j][i])) {
          setMessage("Invalid Solution: Duplicate in column");
          return;
        }
        colSet.add(grid[j][i]);
      }
    }

    // Check 3x3 sub-grids
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const boxSet = new Set();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const value = grid[row + i][col + j];
            if (value !== "" && boxSet.has(value)) {
              setMessage("Invalid Solution: Duplicate in 3x3 grid");
              return;
            }
            boxSet.add(value);
          }
        }
      }
    }

    setMessage("Valid Sudoku Solution!");
  };

  // Reset the grid
  const resetGrid = () => {
    setGrid(initialGrid);
    setMessage("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sudoku Game</h1>
      <div style={{ display: "inline-block" }}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                value={cell}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, e.target.value)
                }
                style={{
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  fontSize: "18px",
                  border: "1px solid #000",
                  margin: "1px",
                }}
                maxLength={1}
                disabled={initialGrid[rowIndex][colIndex] !== ""}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={validateSudoku} style={{ marginRight: "10px" }}>
          Validate
        </button>
        <button onClick={resetGrid}>Reset</button>
      </div>
      {message && <p style={{ marginTop: "20px", color: "blue" }}>{message}</p>}
    </div>
  );
};

export default SudokuGame;
