import React, { forwardRef } from "react";
import FormItem from "antd/es/form/FormItem";

export default forwardRef((props: any, ref: any) => {
  const { inputData, language } = props,
    { questions } = inputData;

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
    ></FormItem>
  );
});
