import React, { forwardRef } from "react";
import NumberInput from "antd/es/input-number/index";
import FormItem from "antd/es/form/FormItem";

export default forwardRef((props: any, ref: any) => {
  const { form, inputData, language } = props,
    { required, questions, id, defaultValue } = inputData,
    { getFieldDecorator } = form;

  return (
    <FormItem
      colon={false}
      label={
        <label
          dangerouslySetInnerHTML={{
            __html: questions[language] || "No hay una pregunta para el lenguaje seleccionado"
          }}
        />
      }
    >
      {getFieldDecorator(id, {
        initialValue: defaultValue,
        rules: [
          {
            required,
            message: "Campo requerido"
          }
        ]
      })(<NumberInput ref={ref} />)}
    </FormItem>
  );
});
