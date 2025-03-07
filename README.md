# DialBB Scenario Editor

ver. 1.0.0

DialBB Scenario Editor contains GUI scenario editor for DialBB-NC ([DialBB](https://c4a-ri.github.io/dialbb/)  No-Code tool).

It is built with [rete.js](https://retejs.org/), and licensed under MIT License.

## Test

To test the scenario editor, type the following to invoke the server.

```sh
cd dialbb_scenario_editor
python main.py
```

Then access `http://localhost:5000` from a browser.

## Build

To create `editor-gui.zip` to be used with DialBB-NC, do the following:

- Build frontend according to [the document](frontend/README-ja)

- Create zip with the following command:

  ```sh
  sh create-zip-file.sh
  ```

Then access `localhost:5000` from a browser.

(c) C4A Research Institute, Inc.
