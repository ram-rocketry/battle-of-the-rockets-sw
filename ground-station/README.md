# Ground Station

The ground station is an electron application that displays data sent from the rocket payload. The application uses `serialport` to communicate with a radio that recieves the data, and `chart.js` to render that data on line graphs.

## Configuration

`config.json` is the main configuration file that can either be directly edited in a text editor, or through the settings window within the app itself.

## File structure

- `src` - Sources root
- `src/classes` - Javascript classes for common components (modals, graphs, etc.)
- `src/res` - Application resources root