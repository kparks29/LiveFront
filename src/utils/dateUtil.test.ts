import { getDate, getDayOfTheWeek, getMonth, getTime } from "./dateUtil"

const mockDateString = '2025-07-23T01:30:00Z'
const mockDate = new Date(mockDateString)

describe('getMonth', () => {
  it('should return a default if date is not provided', () => {
    const result = getMonth(undefined)
    
    expect(result).toBeDefined()
    expect(result.long).toBe('TBD')
    expect(result.short).toBe('TBD')
  })

  it('should accept a valid date', () => {
    const result = getMonth(mockDate)
    
    expect(result).toBeDefined()
    expect(result.long).toBe('July')
    expect(result.short).toBe('Jul')
  })

  it('should accept a valid date string', () => {
    const result = getMonth(mockDateString)
    
    expect(result).toBeDefined()
    expect(result.long).toBe('July')
    expect(result.short).toBe('Jul')
  })

  it('should return a default if invalid date', () => {
    const result = getMonth('test')
    
    expect(result).toBeDefined()
    expect(result.long).toBe('TBD')
    expect(result.short).toBe('TBD')
  })
})

describe('getDate', () => {
  it('should return a default if date is not provided', () => {
    const result = getDate(undefined)
    
    expect(result).toBeDefined()
    expect(result).toBe('TBD')
  })

  it('should accept a valid date', () => {
    const result = getDate(mockDate)
    
    expect(result).toBeDefined()
    expect(result).toBe('22')
  })

  it('should accept a valid date string', () => {
    const result = getDate(mockDateString)
    
    expect(result).toBeDefined()
    expect(result).toBe('22')
  })
})

describe('getDayOfTheWeek', () => {
  it('should return a default if date is not provided', () => {
    const result = getDayOfTheWeek(undefined)
    
    expect(result).toBeDefined()
    expect(result.long).toBe('TBD')
    expect(result.short).toBe('TBD')
  })

  it('should accept a valid date', () => {
    const result = getDayOfTheWeek(mockDate)
    
    expect(result).toBeDefined()
    expect(result.long).toBe('Tuesday')
    expect(result.short).toBe('Tue')
  })

  it('should accept a valid date string', () => {
    const result = getDayOfTheWeek(mockDateString)
    
    expect(result).toBeDefined()
    expect(result.long).toBe('Tuesday')
    expect(result.short).toBe('Tue')
  })

  it('should return a default if invalid date', () => {
    const result = getDayOfTheWeek('test')
    
    expect(result).toBeDefined()
    expect(result.long).toBe('TBD')
    expect(result.short).toBe('TBD')
  })
})

describe('getTime', () => {
  it('should return a default if date is not provided', () => {
    const result = getTime(undefined)
    
    expect(result).toBeDefined()
    expect(result).toBe('TBD')
  })

  it('should accept a valid date', () => {
    const result = getTime(mockDate)
    
    expect(result).toBeDefined()
    expect(result).toBe('6 PM')
  })

  it('should accept a valid date string', () => {
    const result = getTime(mockDateString)
    
    expect(result).toBeDefined()
    expect(result).toBe('6 PM')
  })
})