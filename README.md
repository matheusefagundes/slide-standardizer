# Slide Standardizer
Standardizes a set of Microsoft PowerPoint slide presentations so they all get with the same style applied.

## Instalation
*TODO*

## Usage
To standardize the presentations, you'll need to setup a style first. This is done through a JSON file (usually named `styles.json`). Think about this file as a sort of CSS for PowerPoint slides. Let's take a look on the options you can use within this file.

```json
{
  "backgroundColor": "#ff3409",
  "backgroundImage": "path/to/image.png", //Relative to execution dir
  "fontSize": 16, //Pixels
  "font": "Roboto", //Must be installed in your system
  "fontColor": "#0845e3"
}
```

This is it for now. Other options will be added in the future.

Now that you have a style defined, all you need to do is to put all presentations you want to standardize in the same folder. Then, choose a folder to be the output folder and run:

```bash
slide-standardizer path/to/styles.json input-folder/ output-folder/
```

Have in mind this can took a while to execute. At the end of the process, all the presentations under `output-folder/` will have the style you defined in `styles.json`.

## Acknowledgments
*TODO*
