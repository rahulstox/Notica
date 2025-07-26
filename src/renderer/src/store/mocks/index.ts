import { NoteInfo } from '@shared/models'

export const notesMock: NoteInfo[] = [
  {
    title: `Welcome 👋🏻`,
    lastEditTime: new Date().getTime(),
    // Add a placeholder fullPath
    fullPath: 'mock/Welcome.md'
  },
  {
    title: 'Note 1',
    lastEditTime: new Date().getTime(),
    // Add a placeholder fullPath
    fullPath: 'mock/Note 1.md'
  },
  {
    title: 'Note 2',
    lastEditTime: new Date().getTime(),
    // Add a placeholder fullPath
    fullPath: 'mock/Note 2.md'
  },
  {
    title: 'Note 3',
    lastEditTime: new Date().getTime(),
    // Add a placeholder fullPath
    fullPath: 'mock/Note 3.md'
  }
]
