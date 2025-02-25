from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import os
import tkinter as tk
from tkinter import filedialog
import argparse

TEMPLATE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'editor_gui')
STATIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'editor_gui/static')
print(f'template_folder={TEMPLATE_DIR}, static_folder={TEMPLATE_DIR}')

input_json_file = ""
output_json_file = ""

app = Flask(__name__,  template_folder=TEMPLATE_DIR, static_folder=STATIC_DIR)


@app.route('/')
def home():
    return render_template('index.html')


# @app.route('/upload', methods=['POST'])
# def upload_file():
#     print(request)
#     if 'file' not in request.files:
#         return 'No file part'
#     file = request.files['file']
#     if file.filename == '':
#         return 'No selected file'
#     if file:
#         filename = secure_filename(file.filename)
#         file.save(os.path.join(DOC_ROOT, 'static/data/', filename))
#         return 'File successfully uploaded'


@app.route('/save', methods=['POST'])
def save_excel():
    print(request)
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        # 受信データをjsonファイルに保存
        file.save(output_json_file)
        return jsonify({'message': ''})


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=str, help="input JSON file")
    parser.add_argument("output", type=str, help="output JSON file")
    args = parser.parse_args()

    # サーバ起動
    app.debug = True
    app.run(host='localhost')


if __name__ == '__main__':
    main()