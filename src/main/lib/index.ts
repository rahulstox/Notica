import { appDirectoryName, fileEncoding, welcomeNoteFilename } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

export const getRootDir = () => {
  return path.join(homedir(), appDirectoryName)
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note')

    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })

    // create the welcome note
    await writeFile(path.join(rootDir, welcomeNoteFilename), content, { encoding: fileEncoding })

    notes.push(welcomeNoteFilename)
  }
  return Promise.all(notes.map((filename) => getNoteInfoFromFilename(path.join(rootDir, filename))))
}

export const getNoteInfoFromFilename = async (filePath: string): Promise<NoteInfo> => {
  const fileStats = await stat(filePath)

  return {
    title: path.basename(filePath, '.md'),
    lastEditTime: fileStats.mtimeMs,
    fullPath: filePath
  }
}

export const readNote: ReadNote = async (filePath) => {
  return readFile(filePath, { encoding: fileEncoding })
}

// ✅ FIX: This function was the main source of the path errors.
// It now correctly takes a full filePath and uses it directly.
export const writeNote: WriteNote = async (filePath, content) => {
  console.info(`Writing note to: ${filePath}`)
  return writeFile(filePath, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: path.join(rootDir, 'Untitled.md'),
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('Note creation canceled')
    return false
  }

  const { dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'warning',
      title: 'Different Directory',
      message: `Note is being saved outside the default directory.`
    })
  }

  console.info(`Creating note: ${filePath}`)
  await writeFile(filePath, '')

  return filePath
}

export const deleteNote: DeleteNote = async (filePath) => {
  const { name: filename } = path.parse(filePath)

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info(`Deleting note: ${filePath}`)
  await remove(filePath)
  return true
}
