from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import os
import tkinter as tk
from tkinter import filedialog
import argparse

TEMPLATE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'editor_gui')
STATIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'editor_gui/static')
print(f'template_folder={TEMPLATE_DIR}, static_folder={TEMPLATE_DIR}')

DOC_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'editor_gui')
print(f'template_folder={DOC_ROOT}')
startup_mode = ''


app = Flask(__name__,  template_folder=TEMPLATE_DIR, static_folder=STATIC_DIR)


@app.route('/')
def home():
    return render_template('index.html')


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
        json_file = os.path.join(DOC_ROOT, 'static/data/',
                                 secure_filename(file.filename))
        file.save(json_file)
        print ("JSON file save to: " + json_file)

        return jsonify({'message': ''})



def main():

    # サーバ起動
    app.debug = True
    app.run(host='localhost')


if __name__ == '__main__':
    main()
