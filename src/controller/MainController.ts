import { FileService } from "../service/FileService";
import { SlideService } from "../service/SlideService";
import * as path from "path";
import * as ProgressBar from "progress";

/**
 * Class that controls the process of standardize the presentations.
 */
export class MainController {

  private fileService: FileService;
  private slideService: SlideService;

  constructor() {
    this.fileService = new FileService();
    this.slideService = new SlideService();
  }

  /**
   * Main program function that standardize the presentations.
   * @param stylesFile Path to styles.json file.
   * @param inputDir Path to input directory.
   * @param outputDir Path to output directory.
   */
  public standardize(stylesFile: string, inputDir: string, outputDir: string) {
    //Creates the styles object and discover which files are going to be processed.
    let styles: any = JSON.parse(this.fileService.readFile(stylesFile));
    let files: Array<string> = this.fileService.discoverFiles(inputDir, ['pptx']);

    //Creates a progress bar.
    let progressBar: ProgressBar = new ProgressBar(' |:bar| :current/:total (:percent) ', files.length);

    //Reads the content from the files and creates a standardized presentation for each of them.
    files.forEach(async (file: string) => {
      let filePath: string = path.join(inputDir, file);
      let presentation: Array<Array<string>> = await this.fileService.readPptxFile(filePath);
      this.slideService.create(file, presentation, styles, outputDir);
      progressBar.tick();
    });
  }

}
