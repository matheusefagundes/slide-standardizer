# Slide Standardizer
Standardizes a set of Microsoft PowerPoint slide presentations so they all get with the same style applied.

## Instalation
For CLI use, is recommended to install the package globally:
```shell
sudo npm install -g slide-standardizer
```
If you wanna use Slide Standardizer as a library for your Node project, install it with:
```shell
npm install --save slide-standardizer
```

## CLI Usage
To standardize the presentations, you'll need to setup a style first. This is done through a JSON file (usually named `styles.json`). Think about this file as a sort of CSS for PowerPoint slides. Let's take a look on the options you can use within this file.

```json
{
  "backgroundColor": "FF3409",
  "backgroundImage": "absolute/path/to/image.png",
  "fontSize": 16,
  "font": "Roboto",
  "fontColor": "0845E3"
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
