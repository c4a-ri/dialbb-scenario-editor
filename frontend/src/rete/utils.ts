import { NodeEditor, ClassicPreset } from "rete";
import type { Schemes } from "./editor";
import yaml from 'js-yaml';


export async function removeConnections(
  editor: NodeEditor<Schemes>,
  nodeId: any
) {
  for (const c of [...editor.getConnections()]) {
    if (c.source === nodeId || c.target === nodeId) {
      await editor.removeConnection(c.id);
    }
  }
}

export async function clearEditor(editor: NodeEditor<Schemes>) {
  for (const c of [...editor.getConnections()]) {
    await editor.removeConnection(c.id);
  }
  for (const n of [...editor.getNodes()]) {
    await editor.removeNode(n.id);
  }
}

/**
 * Input control options
 */
type InputControlOptions<N> = {
  /** Whether the control is readonly. Default is `false` */
  readonly?: boolean,
  /** Initial value of the control */
  initial?: N,
  /** Callback function that is called when the control value changes */
  change?: (value: N) => void
}
/**
 * The input control class
 * @example new InputControl('text', { readonly: true, initial: 'hello' })
 */
export class CustomInputControl<T extends 'text' | 'number', N = T extends 'text' ? string : number> extends ClassicPreset.InputControl<T, N> {
  // value?: N
  // readonly: boolean

  /**
   * @constructor
   * @param type Type of the control: `text` or `number`
   * @param label Label of the output port ==>## Customize add.
   * @param options Control options
   */
  constructor(public type: T, public label: string='',
      public options?: InputControlOptions<N>, public hide: boolean=false
  ) {
    super(type, options)
    this.label = label; // label of input controle
    this.hide = hide;   // show or hide
  }
}


/**
 * GUIテキスト言語対応テーブル(Global)
 */
let guiTextTable: Record<string, string> = {};

/**
 *  GUIで利用するラベルなどの言語データ読み込み
 * @param key 
 */
export async function loadGuiTextData(lang: string) {
  // 多言語ファイルのパス
  const filePath = 'static/data/gui_editor_text.yml'
  console.log("loadGuiTextData() lang=", lang, "file=", filePath);

  // GUI表示の多言語ファイルを読み込む
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Failed to fetch file: gui_editor_text.yml');
    }
    // YAMLデータに設定
    const raw = yaml.load(await response.text()) as Record<string, Record<string, string>>;
    // 指定言語の辞書を作成
    guiTextTable = Object.fromEntries(
      Object.entries(raw).map(([key, val]) => [key, val[lang] || key])
    );
  }
  catch (error) {
    console.log('Failed to fetch file. '+filePath);
    console.error(error);
  }
}

/**
 * GUI表示テキスト(多言語データ)の取得
 * @param key 
 */
export function guiText(key: string) {
  if (key in guiTextTable) {
    return guiTextTable[key];
  } else {
    console.warn(`Missing gui_text for key: "${key}"`);
    return `!miss: ${key}`;
  }
}
