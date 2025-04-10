# DialBB Scenario Editor

ver. 1.0.0

DialBB Scenario Editor contains GUI scenario editor for DialBB-NC ([DialBB](https://c4a-ri.github.io/dialbb/)  No-Code tool).

It is built with [rete.js](https://retejs.org/), and licensed under MIT License.

## Download

The frontend installer can be downloaded from [this page](https://c4a-ri.github.io/dialbb-scenario-editor/).


## Install

Double-click installer. &emsp;e.g. `scenario-editor-installer-1.0.0-win.exe`

## Test

To test the scenario editor, type the following to invoke the server.

```sh
cd dialbb_scenario_editor
python main.py
```

Then execute `scenario-editor.exe`.

## Build

To create `editor-gui.zip` to be used with DialBB-NC, do the following:
Convert dialbb-scenario-editor to a desktop app with Electron:

- Build frontend according to [the document](frontend/README-ja.md)

- Build frontend to App according to [the document](electron-setup-ja.md)


(c) C4A Research Institute, Inc.
