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

### シナリオエディタをビルド

* フロントエンドのビルド方法は[こちら](../frontend/README-ja.md)

### デスクトップアプリをビルド

* ビルドの実行

    | コマンド | プラットフォーム |
    |---|---|
    | npm run build-win | Windows |
    | npm run build-mac | macOS |
    | npm run build-linux | Linux |

* 生成物（Windowsの場合）

    | ファイル | 説明 |
    |---|---|
    | dist/win-unpacked/* | 実行ファイル一式 |
    | dist/DialBB_Scenario_Editor-installer-x.x.x-win.exe | インストーラー（リリース物） |

* デスクトップアプリのデバッグ実行

    * **dist/win-unpacked/DialBB_Scenario_Editor.exe** をダブルクリック

### アプリのインストール

* Windows  
    * インストーラーの **DialBB_Scenario_Editor-installer-1.0.x-win.exe** をダブルクリックしてインストールを実行  
    * シナリオエディタの実行は基本的にDialBBノーコードのシナリオ編集から起動されるが、アプリ単独でもWindowsメニューから実行できる、ただしその場合はDialBBシナリオファイルの読み書きは不可となる  
    * アンインストーラーも同梱しているのでWindows設定のアプリ/またはアプリを右クリック>メニューからアンインストールが可能
* Mac/Linux  
    * **DialBB_Scenario_Editor-installer-1.0.x-mac.*/DialBB_Scenario_Editor-installer-x.x.x-linux.\*** をプラットフォームのインストール方法に従って実行
