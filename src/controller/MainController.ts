/**
 * Class that controls the process of standardize the presentations.
 */
export class MainController {

  /**
   * Main program function that standardize the presentations.
   * @param stylesFile Path to styles.json file.
   * @param inputDir Path to input directory.
   * @param outputDir Path to output directory.
   */
  public standardize(stylesFile: string, inputDir: string, outputDir: string) {
    console.log(`Styles from: ${stylesFile}`);
    console.log(`Input from: ${inputDir}`);
    console.log(`Output to: ${outputDir}`);
  }

}
