import * as FileSaver from 'file-saver';

export const download = (filename: string, text: string): void => {
  const blob = new Blob([text], {type: 'text/plain;charset=utf-8'});
  FileSaver.saveAs(blob, filename);
};
