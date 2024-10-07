import { describe, test, expect, beforeEach, vi } from 'vitest'
import { crosswordSolver } from './crosswordSolver'  // Assuming the function is exported

describe('crosswordSolver', () => {
  // Capture console.log output
  let consoleOutput = []
  const mockLog = vi.fn(output => consoleOutput.push(output))

  beforeEach(() => {
    consoleOutput = []
    console.log = mockLog
    vi.clearAllMocks()
  })

  test('solves a simple 4x4 crossword puzzle', () => {
    const puzzle = '2001\n0..0\n2000\n0..0'
    const words = ['casa', 'alan', 'ciao', 'anta']
    
    crosswordSolver(puzzle, words)
    
    expect(mockLog).toHaveBeenCalledWith(
      'casa\n' +
      'i..l\n' +
      'anta\n' +
      'o..n'
    )
  })

  test('returns error for invalid puzzle dimensions', () => {
    const puzzle = '200\n0..0\n2000\n0..0'  // First line is shorter
    const words = ['casa', 'alan', 'ciao', 'anta']
    
    crosswordSolver(puzzle, words)
    
    expect(mockLog).toHaveBeenCalledWith('Error')
  })

  test('returns error when not enough words of correct length', () => {
    const puzzle = '2001\n0..0\n2000\n0..0'
    const words = ['casa', 'alan', 'hi']  // Missing a 4-letter word
    
    crosswordSolver(puzzle, words)
    
    expect(mockLog).toHaveBeenCalledWith('Error')
  })

  test('returns error for empty puzzle', () => {
    const puzzle = ''
    const words = ['casa', 'alan', 'ciao', 'anta']
    
    crosswordSolver(puzzle, words)
    
    expect(mockLog).toHaveBeenCalledWith('Error')
  })

  test('returns error for empty words array', () => {
    const puzzle = '2001\n0..0\n2000\n0..0'
    const words = []
    
    crosswordSolver(puzzle, words)
    
    expect(mockLog).toHaveBeenCalledWith('Error')
  })

  test('returns error for null words', () => {
    const puzzle = '2001\n0..0\n2000\n0..0'
    const words = null
    
    crosswordSolver(puzzle, words)
    
    expect(mockLog).toHaveBeenCalledWith('Error')
  })

  test('handles puzzle with no solution', () => {
    const puzzle = '2001\n0..0\n2000\n0..0'
    const words = ['casa', 'alan', 'ciao', 'zzzz']  // 'zzzz' makes it impossible to solve
    
    crosswordSolver(puzzle, words)
    
    expect(mockLog).toHaveBeenCalledWith('Error')
  })

  test('solves puzzle with repeated word lengths', () => {
    const puzzle = '2001\n0..0\n2001\n0..0'  // Both horizontal words are 4 letters
    const words = ['casa', 'alan', 'ciao', 'anta', 'wine']  // Extra 4-letter word
    
    crosswordSolver(puzzle, words)
    
    // The exact solution might vary, but it should output something
    expect(mockLog).toHaveBeenCalled()
    expect(consoleOutput.length).toBe(1)
    expect(consoleOutput[0]).toMatch(/^[a-z]{4}\n[a-z]\.{2}[a-z]\n[a-z]{4}\n[a-z]\.{2}[a-z]$/)
  })
})