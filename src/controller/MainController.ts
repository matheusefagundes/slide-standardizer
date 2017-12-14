import { FileService } from "../service/FileService";
/**
 * Class that controls the process of standardize the presentations.
 */
export class MainController {

  private fileService: FileService;

  constructor() {
    this.fileService = new FileService();
  }

  /**
   * Main program function that standardize the presentations.
   * @param stylesFile Path to styles.json file.
   * @param inputDir Path to input directory.
   * @param outputDir Path to output directory.
   */
  public standardize(stylesFile: string, inputDir: string, outputDir: string) {
    let styles: any = JSON.parse(this.fileService.readFile(stylesFile));
    console.log(styles);
    let files: Array<string> = this.fileService.discoverFiles(inputDir, ['ppt', 'pptx']);
    console.log(files);
    console.log(`Output to: ${outputDir}`);
  }

}
