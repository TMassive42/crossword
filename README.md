# Crossword

This project is a crossword puzzle solver implemented in JavaScript. The solver takes an empty puzzle template and a list of words, then fills the puzzle grid by placing the words in appropriate locations following specific rules.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Input Format](#input-format)
- [How It Works](#how-it-works)
- [Contributing](#contributing)

## Installation

To use the crossword puzzle solver, you copy the script into your project.
### Clone this repository
```bash
git clone https://learn.zone01kisumu.ke/git/hilaromondi/crossword
```
### Navigate to the project directory
```bash
cd crossword
```

## Usage

To use the solver, call the crosswordSolver function with the appropriate inputs. Here's a sample input and how to invoke the function:

```bash
const emptyPuzzle = '2001\n0..0\n2000\n0..0';
const words = `['casa', 'alan', 'ciao', 'anta']`;

crosswordSolver(emptyPuzzle, words);
```
This will attempt to fill the puzzle with the provided words and print the solved puzzle grid or an error message if the puzzle cannot be solved.

## Input Format

- emptyPuzzle: A string representation of the crossword puzzle grid. Each line represents a row in the grid, with numbers indicating how many words can start at that position, and dots (.) representing empty spaces.

- words: An array of strings containing the words to be placed in the puzzle

### Example Input
```bash
const emptyPuzzle = '2001\n0..0\n2000\n0..0';
const words = `['casa', 'alan', 'ciao', 'anta']`;
```

## How It Works

1. Input Validation: The solver first checks if the input is valid, ensuring that the puzzle grid and the list of words are properly formatted.

2. Grid Parsing: The puzzle grid is parsed to determine the puzzle's dimensions and identify potential starting points for words (horizontal or vertical).

3. Word Placement: The algorithm attempts to place the words into the grid, ensuring that:
    - Words fit within the constraints of the puzzle.
    -  No conflicts arise between overlapping words.

4. Backtracking: The solver uses a recursive backtracking approach to try different word placements. If a word placement causes a conflict later in the puzzle, it will backtrack and try a different word.

5. Solution: If the puzzle is solvable with the given words, the solver prints the completed puzzle grid. If no solution is found, it outputs an error message.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue if you find any bugs or have ideas for improvements.

## Author
This project was built by: 

[Thadeus Ogondola](https://learn.zone01kisumu.ke/git/togondol/)

[Hillary Omondi](https://learn.zone01kisumu.ke/git/hilaromondi)
