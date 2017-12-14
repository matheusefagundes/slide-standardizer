import * as fs from "fs";

/**
 * A service with utilities to work with files.
 * @author Matheus Eller Fagundes
 */
export class FileService {

  /**
   * Creates the service to work with files. You can provide
   * an optional File System to be used in this service. If none
   * is provided, the default Node File System will be used.
   * @param _fs Optional File System to use.
   */
  constructor(private _fs?: any) {
    if(!_fs) {
      this._fs = fs;
    }
  }

  /**
   * Read the content of a file.
   * @param path File path.
   */
  public readFile(path: string): string {
    return this._fs.readFileSync(path).toString();
  }

  /**
   * Gets the name of all files under a folder.
   * @param folder Folder to look up for files.
   * @param extensions Optional. If provided, only files with one of the extensions
   * will be considered.
   */
  public discoverFiles(folder: string, extensions?: Array<string>): Array<string> {
    let files: Array<string> = this._fs.readdirSync(folder)
    if(extensions != null) {
      return files.filter((file: string) => {
        let split: Array<string> = file.split('.');
        return extensions.indexOf(split[split.length - 1]) != -1;
      });
    }
    return files;
  }

}
