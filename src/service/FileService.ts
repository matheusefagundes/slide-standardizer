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
   * Read the text content of a .pptx file.
   * Doesn't work with .ppt files.
   * @param path Slide file path.
   * @returns A promise that resolves into an array of slides. Each slide is
   * composed of an array of paragraphs.
   */
  public readPptxFile(path: string): Promise<Array<Array<string>>> {
    const yauzl = require('yauzl');
    let presentation: Array<Array<string>> = [];
    let orderedSlides: Array<{ slideIndex: number, paragraphs: Array<string> }> = [];
    let promise = new Promise<Array<Array<string>>>((resolve, reject) => {
      yauzl.open(path, { lazyEntries: true }, (err: any, archive: any) => {
        if (err) {
          reject(err);
        }
        archive.readEntry();

        archive.on('entry', (entry: any) => {
          if (/(ppt\/slides\/slide)\d+(.xml)/.test(entry.fileName)) {
            let slideNumber: number = parseInt(entry.fileName.match(/\d+/));
            archive.openReadStream(entry, (err: any, readStream: any) => {
              if (err) {
                reject(err);
              }

              readStream.on('end', () => {
                archive.readEntry();
              });

              readStream.on('data', (data: any) => {
                let slideContent: string = data.toString();
                let slide: Array<string> = [];
                let matches: RegExpMatchArray | null = slideContent.match(/<a:t>((.|\n)+?)<\/a:t>/g);
                if(matches != null) {
                  slide = matches.map((tag: string) => {
                    return tag.replace('<a:t>', '').replace('</a:t>', '');
                  });
                  orderedSlides.push({ slideIndex: slideNumber - 1, paragraphs: slide });
                }
              });

            });
          } else {
            archive.readEntry();
          }
        });

        archive.on('end', () => {
          presentation = orderedSlides
            .sort((a, b) => {
              return a.slideIndex - b.slideIndex;
            })
            .map((slide) => {
              return slide.paragraphs;
            });
          archive.close();
          resolve(presentation);
        });

      });
    });
    return promise;
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
