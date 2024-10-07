// crosswordSolver.test.js
import { describe, it, expect } from 'vitest';
import crosswordSolver from './crosswordSolver.js';

describe('crosswordSolver', () => {
  it('should fill the puzzle correctly when a valid solution exists', () => {
    const puzzle = '2...\n.....\n3...\n';
    const words = ['cat', 'dog', 'bat'];
    const expected = '2cat\n.....\n3dog\n';

    expect(crosswordSolver(puzzle, words)).toBe(expected);
  });

  it('should return "Error" when the puzzle does not have a unique solution', () => {
    const puzzle = '2...\n.....\n3...\n';
    const words = ['cat', 'dog'];

    expect(crosswordSolver(puzzle, words)).toBe('Error');
  });

  it('should return "Error" when there are more words than required', () => {
    const puzzle = '2...\n.....\n3...\n';
    const words = ['cat', 'dog', 'bat', 'rat'];

    expect(crosswordSolver(puzzle, words)).toBe('Error');
  });

  it('should return "Error" if any puzzle constraints are violated', () => {
    const puzzle = '2...4\n.....\n3...\n'; // invalid puzzle
    const words = ['cat', 'dog', 'bat'];

    expect(crosswordSolver(puzzle, words)).toBe('Error');
  });
});
