import * as path from "path";
const PptxGenJS = require('pptxgenjs');

/**
 * A service to create PowerPoint slide presentations.
 * @author Matheus Eller Fagundes
 */
export class SlideService {

  /**
   * Creates a slide presentation given the content and a style to be applied.
   *
   * @param title The presentation title and file name.
   * @param contents Array of strings. Each string will be placed in a separate slide.
   * @param styles A JSON object containing the presentation styles.
   * @param outputDir Path to output directory.
   */
  public create(title: string, contents: Array<Array<string>>, styles: any, outputDir: string): void {
    const presentation = new PptxGenJS.constructor();

    contents.forEach((content: Array<string>) => {
      let slide: any = presentation.addNewSlide();
      slide.back  = styles.backgroundColor;
      slide.color = styles.fontColor;
      if(styles.backgroundImage) {
        slide.addImage({
          path: styles.backgroundImage,
          x:0,
          y:0,
          sizing: {
            type: 'cover',
            w: '100%',
            h: '100%'
          }
        });
      }
      slide.addText(content.join('\n').toUpperCase(), {
        x: 0,
        y: 0,
        w: '100%',
        h: '100%',
        margin: 25,
        valign: 'middle',
        lineSpacing: 85,
        align: 'center',
        font_size: styles.fontSize,
        font_face: styles.font,
        bold: true
      });
    });

    presentation.setTitle(title);
    presentation.setLayout('LAYOUT_4x3');
    presentation.save(path.join(outputDir, title));
  }

}
