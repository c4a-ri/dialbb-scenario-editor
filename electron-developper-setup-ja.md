# dialbbにシナリオエディタのアプリを導入する方法   (2025/4/2)

## １．Electronを使ってナリオエディタをデスクトップアプリにする

### 準備

* Node.jsが使える環境でプロジェクトフォルダーを作成

    ```powershell
    cd プロジェクトフォルダー
    npm init --yes
    ```

    package.jsonが作成されること

* Electronのインストール

    ```powershell
    npm install -D electron
    npx electron --version
    ```

    node_modulesが作成され、electronのバージョンが表示されること

* ビルダーのインストール

    ```powershell
    npm i -D electron-builder
    npx electron-builder --version
    ```

    electron-builderのバージョンが表示されること

* シナリオエディタをコピー

    editor-gui.zipをプロジェクトフォルダ直下に展開する

    ```text
  プロジェクトフォルダ/
    ├── index.html
    ├── vite.svg
    └── static
        ├── assets
        │   ├── index-xxxxxx.css
        │   └── index-xxxxxx.js
        └── data
            └── init.json
    ```

* 起動確認

    ```powershell
    npx electron .
    ```

    シナリオエディタが起動すること

### デスクトップアプリをビルド

* package.jsonを編集してビルド情報(アプリ名など)を定義

    ```json
    {
        "name": "dialbb-scenario-editor",
        "version": "1.0.0",  ※バージョンアップする時はここを変更
        "description": "",
        "main": "main.js",  ※起動アプリのメインを記載
        "scripts": {        ※スクリプトは"npm run editor"で起動可
            "test": "echo \"Error: no test specified\" && exit 1",
            "editor": "electron .",      ※ｼﾅﾘｵｴﾃﾞｨﾀを起動する
            "build-win": "electron-builder --win --x64", ※windows用ビルドを起動する
            "build-mac": "electron-builder --mac --x64",
            "build-linux": "electron-builder --linux --x64"
        },
        "keywords": [],
        "author": "Mikio Nakano",
        "license": "MIT",
        "devDependencies": {
            "electron": "^35.0.3",   ※npm installしたライブラリ(自動追記)
            "electron-builder": "^26.0.12"
        },
        "build": {
            "appId": "com.electron.dialbb",   ※アプリ識別子（ドメイン形式推奨）
            "productName": "DialBB_Scenario_Editor", ※exe出力するアプリ名
            "directories": {
            "output": "dist"   ※ビルド結果を出力する場所
            },
        "files": [   ※配布パッケージに含めるファイルを記載する
            "static/**/*",
            "main.js",
            "package.json",
            "preload.js"
        ],
        "win": {
            "target": "nsis"
        },
        "mac": {
            "target": "dmg"
        },
        "nsis": {
            "oneClick": false,
            "allowToChangeInstallationDirectory": true
        }
    },
  }
    ```

* ビルド（Windowsの場合）

    ```powershell
    npm run build-win
    ※内部的にはElectronを実行 ： npx electron-builder --win --x64
    ```

    生成物

    | ファイル | 説明 |
    |---|---|
    | dist/win-unpacked/* | 実行ファイル一式 |
    | dist/DialBB_Scenario_Editor-installer-x.x.x-win.exe | インストーラー（リリース物） |

* デスクトップアプリの実行（Windowsの場合）

    **dist/win-unpacked/scenario-editor.exe** をダブルクリック

### アプリのインストール

* Windows  
    インストーラーの **DialBB_Scenario_Editor-installer-x.x.x-win.exe** をダブルクリックしてインストール、保存先は固定（\Users\<ユーザ名>\AppData\Roaming\<アプリ名>）、  
    アンインストーラーも同梱しているのでWindows設定のアプリから、または実行ファイル右クリックメニューからアンインストールが可能.

## ２．dialbbと連携させる

1. エディタからサーバにPOSTしている個所に修正が必要  
理由：Flaskサーバとアプリが別々に起動するため

    * frontend/src/rete/editor.ts または assets/index-xxxxxx.js を編集する  
        [before]  

        ```python
            await fetch('/save', {
                method: 'POST',
                    ：
        ```

        [after]  

        ```python
        await fetch('http://localhost:5000/save', {
            method: 'POST',
                ：
        ```

    * frontendをビルド  

        ```powershell
        cd frontend
        npm run build
        ```

    * Electronで再ビルド  

        ```powershell
        cd ..\dialbb_scenario_editor
        npm run build-win
        ```

1. ノーコードのGUIからアプリを起動するように修正  

    * dialbb/no_code/editor_main.pyのexec_editor()を以下のように修正  
        [before]

        ```python
        subprocess.Popen(["start", "msedge", "--app=http://localhost:5000/"], shell=True)
                ：
        # stop server   サーバ停止
        editor_proc.stop()
        ```

        [after]

        ```python
        cmd = os.path.join(NC_PATH, "win-unpacked", "scenario-editor.exe")
        editor_apl = subprocess.Popen(cmd, shell=True)
                ：
        # エディタアプリ停止
        os.system(f"taskkill /F /T /PID {editor_apl.pid}")

        # stop server   サーバ停止
        editor_proc.stop()
        ```

1. 動作確認  
    1. scenario-editor.exeをダブルクリックしてシナリオエディタを起動
    1. ノーコードのGUIを起動
    1. GUIの[編集] > [シナリオ]をクリックしてシナリオエディタのアプリが起動すること
    1. シナリオエディタの[Save]ボタンでセーブできること
    1. サーバの終了させるとシナリオエディタも終了すること

## ３．クロスプラットフォームへの対応

* 次の点を考慮する、詳細手順は導入時に検討が必要

    1. Windows/macOS/Linuxのアプリを生成するには、それぞれのOSでビルドする必要があるのでシナリオエディタの生成手順を確立する  
    （Windows互換ライブラリもあるが3つを一気にビルドは出来なさそう）
    1. シナリオエディタのリリース方法を各プラットフォームに対応させる.  
    （全ての実行ファイルを無条件にコピーでも良いが）
    1. ノーコード側でプラットフォームに合わせた実行ファイルを起動する処理が必要  
    exec_editor()を改造する

## ４. シナリオエディタの日本語／英語表示切替について

* 画面の表示テキストを外部ファイルに定義することによりGUIを日本語と英語表示に切り替え可能にしました.

  * ファイルの内容 : YAML形式

    ```yaml
    greeting:               ※使用する時のインデックス
        ja: "こんにちは！"   ※日本語表記
        en: "Hello!"        ※英語表記

    yes_button:
        ja: "はい"
        en: "Yes"
        　　：
    ```

    * ファイルの場所

    ```sh
    frontend/public/static/data/gui_editor_text.yml
    ```

    * 実行方法

      * DialBBノーコードから起動された場合は、dialbbで指定された言語を継承する。  
        デバッグなどでシナリオエディタ単体で起動するパターンは以下となる、

        * Vue.jsの場合

        ```powershell
        cd frontend
        npm run dev
        ブラウザ：http://localhost:5173/?lang=ja    ※日本語版
        ブラウザ：http://localhost:5173/?lang=en    ※英語版
        ```

        * Electronの場合

        ```powershell
        cd dialbb_scenario_editor
        npm run dev
        npm run editor      ※日本語版
        npm run editor-en   ※英語版
        ```

        * インストール済みのデスクトップアプリの場合

        ```text
        (Windowsの場合)
        ※日本語版：メニューから"DialBB_Scenario_Editor"選択
                    または DialBB_Scenario_Editor.exeダブルクリック
        ※英語版：コマンドプロンプトで
                    > cd AppData\Local\Programs\DialBB_Scenario_Editor
                    > DialBB_Scenario_Editor.exe --lang=en
                  または、"--lang=en"引数付きのショートカット／バッチファイルを作成
        ```
