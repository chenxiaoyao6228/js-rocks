import React, { useCallback, useMemo } from "react";
import { storiesOf } from "@storybook/react";
import useForm from "./";

// 使用 useForm 得到表单的状态管理逻辑
const useFormDemo = () => {

const validators = useMemo(() => {
    return {
      name: (value) => {
        if (value.length < 2) return "Name length should be no less than 2.";
        return null;
      },
      email: (value) => {
        // 简单的实现一个 email 验证逻辑：必须包含 @ 符号。
        if (!value.includes("@")) return "Invalid email address";
        return null;
      },
    };
  },[]);

  const { values, setFieldValue, errors, resetFields} = useForm({
      name: null,
      email: null,
  }, validators);


  // 处理表单的提交事件
  const handleSubmit = useCallback(
    (evt) => {
      // 使用 preventDefault() 防止页面被刷新
      evt.preventDefault();
      console.log(values);
    },
    [values]
  );


  return (
    <form onSubmit={handleSubmit}>
        {JSON.stringify(values)}
        {JSON.stringify(errors)}
      <div>
        <label>Name:</label>
        <input
          value={values.name}
          onChange={(evt) => setFieldValue("name", evt.target.value)}
        />
        {errors.name}
      </div>
      <div>
        <label>Email:</label>
        <input
          value={values.email}
          onChange={(evt) => setFieldValue("email", evt.target.value)}
        /> 
        {errors.email}
      </div>
      <button type="submit">Submit</button>
      <button onClick={resetFields}>reset</button>
    </form>
  );
};

storiesOf("useForm", module).add("basic", useFormDemo);
