import React, { forwardRef } from "react";
import InputTextArea from "antd/es/input/TextArea";
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
      <div>
        {
          (inputData.imageUrl && inputData.imageUrl.length > 0) && <img style={{marginBottom: '1rem', marginTop: '1rem', borderRadius: '10px', objectFit: 'cover', objectPosition: 'center'}} src={inputData.imageUrl} alt="" />
        }
      </div>
      {getFieldDecorator(id, {
        initialValue: defaultValue,
        rules: [
          {
            required,
            message: "Campo requerido"
          }
        ]
      })(<InputTextArea ref={ref} autoSize />)}
    </FormItem>
  );
});
