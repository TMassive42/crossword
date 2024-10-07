const emptyPuzzle = '2001\n0..0\n2000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']

function crosswordSolver(emptyPuzzle, words) {
    // Validate input
    if (!emptyPuzzle || !words || !Array.isArray(words)) {
        console.log('Error');
        return;
    }

    // Parse the puzzle
    const puzzleLines = emptyPuzzle.split('\n');
    const height = puzzleLines.length;
    const width = puzzleLines[0].length;

    // Validate puzzle dimensions
    if (!puzzleLines.every(line => line.length === width)) {
        console.log('Error');
        return;
    }

    // Create grid and find word starts
    const grid = Array(height).fill().map(() => Array(width).fill(''));
    const wordStarts = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const char = puzzleLines[y][x];
            if (char === '.') {
                grid[y][x] = '.';
            } else if (!isNaN(char)) {
                const numWords = parseInt(char);
                if (numWords > 0) {
                    // Check horizontal word
                    if (x === 0 || grid[y][x - 1] === '.') {
                        let length = 0;
                        while (x + length < width && puzzleLines[y][x + length] !== '.') {
                            length++;
                        }
                        if (length > 1) {
                            wordStarts.push({ x, y, direction: 'horizontal', length });
                        }
                    }
                    // Check vertical word
                    if (y === 0 || grid[y - 1][x] === '.') {
                        let length = 0;
                        while (y + length < height && puzzleLines[y + length][x] !== '.') {
                            length++;
                        }
                        if (length > 1) {
                            wordStarts.push({ x, y, direction: 'vertical', length });
                        }
                    }
                }
            }
        }
    }

    // Group words by length
    const wordsByLength = {};
    for (const word of words) {
        wordsByLength[word.length] = wordsByLength[word.length] || [];
        wordsByLength[word.length].push(word);
    }

    // Check if we have enough words of correct lengths
    const requiredLengths = {};
    for (const start of wordStarts) {
        requiredLengths[start.length] = (requiredLengths[start.length] || 0) + 1;
    }

    for (const length in requiredLengths) {
        if (!wordsByLength[length] || wordsByLength[length].length < requiredLengths[length]) {
            console.log('Error');
            return;
        }
    }

    // Solve the puzzle
    const usedWords = new Set();

    function solve(index) {
        if (index === wordStarts.length) {
            return true;
        }

        const start = wordStarts[index];
        const possibleWords = wordsByLength[start.length] || [];

        for (const word of possibleWords) {
            if (usedWords.has(word)) continue;

            if (canPlaceWord(grid, word, start)) {
                placeWord(grid, word, start);
                usedWords.add(word);

                if (solve(index + 1)) {
                    return true;
                }

                removeWord(grid, start);
                usedWords.delete(word);
            }
        }

        return false;
    }

    // Try to solve
    if (!solve(0)) {
        console.log('Error');
        return;
    }

    // Print solution
    const solution = grid.map(row => row.join('')).join('\n');
    console.log(solution);
}

function canPlaceWord(grid, word, start) {
    const { x, y, direction, length } = start;

    for (let i = 0; i < length; i++) {
        const [checkY, checkX] = direction === 'horizontal' ? [y, x + i] : [y + i, x];
        const currentChar = grid[checkY][checkX];

        if (currentChar !== '' && currentChar !== '.' && currentChar !== word[i]) {
            return false;
        }
    }

    return true;
}

function placeWord(grid, word, start) {
    const { x, y, direction, length } = start;

    for (let i = 0; i < length; i++) {
        const [placeY, placeX] = direction === 'horizontal' ? [y, x + i] : [y + i, x];
        grid[placeY][placeX] = word[i];
    }
}


function removeWord(grid, start) {
    const { x, y, direction, length } = start;

    for (let i = 0; i < length; i++) {
        const [removeY, removeX] = direction === 'horizontal' ? [y, x + i] : [y + i, x];
        grid[removeY][removeX] = '';
    }
}

crosswordSolver(emptyPuzzle, words)
