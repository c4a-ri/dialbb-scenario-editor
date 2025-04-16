# シナリオエディタアプリのビルド方法

### 準備

* Node.jsは事前に使える環境にしておくこと

* 本リポジトリをクローンする

* Electronのインストール

    ```powershell
    cd dialbb-scenario-editor/dialbb_scenario_editor
    npm install
    npx electron --version
    npx electron-builder --version
    ```

    node_modulesが作成され、electron/electron-builderのバージョンが表示されること

### デスクトップアプリをビルド

* ビルドの実行

    | ファイル | 説プラットフォーム明 |
    |---|---|
    | electron-builder --win --x64 | Windows |
    | electron-builder --mac --x64 | macOS |
    | electron-builder --linux --x64 | Linux |

* 生成物（Windows）

    | ファイル | 説明 |
    |---|---|
    | dist/win-unpacked/* | 実行ファイル一式 |
    | dist/DialBB_Scenario_Editor-installer-x.x.x-win.exe | インストーラー（リリース物） |

* デスクトップアプリの実行

    **dist/win-unpacked/DialBB_Scenario_Editor.exe** をダブルクリック

### アプリのインストール

* Windows  
    インストーラーの **DialBB_Scenario_Editor-installer-x.x.x-win.exe** をダブルクリックしてインストールを実行、  
    アンインストーラも同梱しているのでWindows設定のアプリから、または実行ファイル右クリックメニューからアンインストールが可能.
