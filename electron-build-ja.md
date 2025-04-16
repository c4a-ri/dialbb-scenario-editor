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

    | コマンド | 説プラットフォーム明 |
    |---|---|
    | electron-builder --win --x64 | Windows |
    | electron-builder --mac --x64 | macOS |
    | electron-builder --linux --x64 | Linux |

* 生成物（Windows）

    | ファイル | 説明 |
    |---|---|
    | dist/win-unpacked/* | 実行ファイル一式 |
    | dist/DialBB_Scenario_Editor-installer-x.x.x-win.exe | インストーラー（リリース物） |

* デスクトップアプリのデバッグ実行

    * Flaskサーバを起動：> python .\dialbb_scenario_editor\main.py
    * **dist/win-unpacked/DialBB_Scenario_Editor.exe** をダブルクリック

### アプリのインストール

* Windows  
    * インストーラーの **DialBB_Scenario_Editor-installer-x.x.x-win.exe** をダブルクリックしてインストールを実行  
    * シナリオエディタの実行は基本的にDialBBノーコードのシナリオ編集から起動されるが、アプリ単独でもWindowsメニューから実行できる、ただしその場合はDialBBシナリオファイルの読み書きは不可となる  
    * アンインストーラーも同梱しているのでWindows設定のアプリ/またはアプリを右クリック>メニューからアンインストールが可能
