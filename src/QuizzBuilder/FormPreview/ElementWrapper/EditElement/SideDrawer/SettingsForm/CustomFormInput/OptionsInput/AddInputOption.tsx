import React, { Fragment, useState } from "react";
import BottomButtons from "../../../../../../../../ReusableComponents/BottomButtons";
import Button from "antd/es/button/button";
import Drawer from "antd/es/drawer";
import Input from "antd/es/input/Input";
import FormItem from "antd/es/form/FormItem";
import message from "antd/es/message";
import cloneDeep from "lodash.clonedeep";
import TranslatedText from "../../../../../../../../translations/TranslatedText";

export default ({ onAdd, languagesList, existingOptions }: any) => {
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [newOption, setNewOption] = useState({ text: {} } as any);

  // opens drawer when add button is clicked
  function openDrawer() {
    setDrawerVisibility(true);
  }

  // close drawer
  function closeDrawer() {
    setDrawerVisibility(false);
  }

  // on change input value | text
  function onChangeInput(
    e: React.ChangeEvent<HTMLInputElement>,
    language?: string
  ) {
    const tempNewOption = cloneDeep(newOption);
    const lastElement = existingOptions[existingOptions.length - 1];
    tempNewOption["value"] = `${parseInt(lastElement.value) + 1}`;

    if (language) {
      tempNewOption["text"][language] = e.target.value;
    }

    setNewOption(tempNewOption);
  }

  // save new added option
  function onSaveOption() {
    const newOptionValue = newOption["value"];
    const newOptionListText = Object.values(newOption["text"]);

    // check if value already exists (iterates over existing options)
    for (let index = 0; index < existingOptions.length; index++) {
      const currentOptionValue = existingOptions[index]["value"];
      if (newOptionValue === currentOptionValue) {
        // error message for already existing value (values must be unique by question)
        return message.error("Esta opción ya existe");
      }
    }

    if (newOptionListText.length === languagesList.length) {
      // sends new option back with text(on each language) and value
      onAdd(newOption);
      // closes this drawer
      closeDrawer();
    } else {
      // error message for required languages
      message.error("Todos los campos son requeridos");
    }
  }

  return (
    <Fragment>
      <Button icon="plus" onClick={openDrawer}>
        <TranslatedText id="btn.add" />
      </Button>
      <Drawer
        title="Agregar nueva opción"
        width={150}
        onClose={closeDrawer}
        visible={drawerVisibility}
        destroyOnClose
      >
        <FormItem label="Texto">
          {languagesList.map((language: string, i: number) => {
            return (
              <Fragment key={i}>
                <Input onChange={e => onChangeInput(e, language)} />
              </Fragment>
            );
          })}
        </FormItem>
        <BottomButtons onClose={closeDrawer} onSubmit={onSaveOption} />
      </Drawer>
    </Fragment>
  );
};
