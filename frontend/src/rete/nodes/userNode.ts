import { ClassicPreset as Classic } from "rete";
import type { DataflowNode } from "rete-engine";
import { socket } from "../sockets";
import { CustomInputControl } from "../utils";

export class userNode extends Classic.Node<
    { state: Classic.Socket },    // Input socket
    { next: Classic.Socket },     // Output socket
    { seqnum: Classic.InputControl<"number">;
      utterance: Classic.InputControl<"text">;
      type: Classic.InputControl<"text">;
      conditions: Classic.InputControl<"text">;
      actions: Classic.InputControl<"text">;
      nextStatus: Classic.InputControl<"text">; // 送出データのコントロール
    }
  >
  implements DataflowNode {
  width = 220;
  height = 390;
  nodeId = "";

  constructor(
    // change?: (value: number) => void,
    // initial?: { left?: number; right?: number },
    change?: () => void,
    private update?: (control: Classic.InputControl<"text">) => void,
    userUtter: string = "", type: string = "",
    conditions: string = "", actions: string = "",
    seqnum: number = 0, nextSt: string = "",
    nodeId: string = ""
  ) {
    super("userNode");
    this.nodeId = nodeId == "" ? this.id : nodeId;

    // Rowソート番号
    this.addControl(
      "seqnum",
      new CustomInputControl("number", "優先度", { initial: seqnum, readonly: true })
    );
    // ユーザ発話
    this.addControl(
      "utterance",
      new CustomInputControl("text", "発話例", { initial: userUtter, readonly: true })
    );
    // ユーザ発話タイプ
    this.addControl(
      "type",
      new CustomInputControl("text", "発話タイプ", { initial: type, readonly: true })
    );
    // 条件
    this.addControl(
      "conditions",
      new CustomInputControl("text", "遷移の条件", { initial: conditions, readonly: true })
    );
    // アクション
    this.addControl(
      "actions",
      new CustomInputControl("text", "遷移時のアクション", { initial: actions, readonly: true })
    );
    // 遷移する状態
    this.addControl(
      "nextStatus",
      new CustomInputControl("text", "", { initial: nextSt, readonly: true }, true)
    );

    // 入出力ソケットの実装
    // this.addInput("state", new Classic.Input(socket, "Input", false));
    // this.addOutput("next", new Classic.Output(socket, "Output", true));

    // systemNodeの状態 -> Inputソケット ->  次状態コントロールと連携 とする
    this.addInput("state", new Classic.Input(socket, "from", false));
    this.addOutput("next", new Classic.Output(socket, "to", false));

  }

  // ソケット送受信のデータ処理関数
  data(inputs: { state?: string }): { next: string } {
    // Inputデータ(次状態)
    console.log("@inputs:"+inputs.state);
    return {
      next: ""
    };
  }

  serialize() {
    const leftControl = this.inputs["state"]?.control;
    const rightControl = this.inputs["state"]?.control;

    return {
      left: (leftControl as Classic.InputControl<"number">).value,
      right: (rightControl as Classic.InputControl<"number">).value
    };
  }
}
