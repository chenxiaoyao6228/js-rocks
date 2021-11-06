import React from "react";
import "./index.css";
import { Button, Form, Input } from "antd";

const { TextArea } = Input;

const MonkeyCompilerIDE = () => {
  return (
    <div className="wrapper">
      <h1>Monkey Compiler</h1>
      <Form>
        <Form.Item>
          <TextArea rows={20} placeholder="please input something.........." />
        </Form.Item>
        <Button type="danger">Lexing</Button>
      </Form>
    </div>
  );
};
export default MonkeyCompilerIDE;
