import React, { forwardRef } from "react";
import Tabs from "antd/es/tabs/index";
import Row from "antd/es/row/index";
import Col from "antd/es/col/index";
import Input from "antd/es/input/Input";
import Button from "antd/es/button/button";
import cloneDeep from "lodash.clonedeep";
import TextWithInfo from "../../../../../../../../ReusableComponents/TextWithInfo";
import AddInputOption from "./AddInputOption";

const { TabPane } = Tabs;

export default forwardRef((props: any, ref) => {
  const {
    value,
    onChange,
    currentLanguage,
    setLanguage,
    languagesList
  } = props;

  // handles on change ofr text and value
  function onChangeInput(index: number, content: string, language?: string) {
    const valueClone = cloneDeep(value);
    if (language) {
      // language exists means its text editing
      valueClone[index]["text"][language] = content;
    } else {
      // value editing
      valueClone[index]["value"] = content;
    }

    onChange(valueClone);
  }

  // handles delete option
  function onDelete(index: number) {
    const valueClone = cloneDeep(value);
    // removes provided index
    valueClone.splice(index, 1);

    onChange(valueClone);
  }

  // on add new option
  function onAddOption(newOption: object) {
    const valueClone = cloneDeep(value);
    valueClone.push(newOption);

    onChange(valueClone);
  }

  // on set correct answrt
  function onSetRightAnswer(index: number) {
    const valueClone = cloneDeep(value);
    const answerOption = valueClone[index];

    if (!!answerOption.isCorrect) {
      delete answerOption.isCorrect;
    } else {
      answerOption.isCorrect = true;
    }

    onChange(valueClone);
  }

  return (
    <Row>
      <Row>
        <AddInputOption
          existingOptions={value}
          languagesList={languagesList}
          onAdd={onAddOption}
        />
      </Row>
      <Row>
        <Col xs={16} sm={12}>
          <TextWithInfo title="Es el texto que se mostrará en la opción">
            Texto:
          </TextWithInfo>
          {/* Text options */}
          <Tabs
            onChange={setLanguage}
            activeKey={currentLanguage}
            renderTabBar={() => <div />}
          >
            {languagesList.map((language: string) => (
              <TabPane tab={language} key={language}>
                {value.map((option: any, i: number) => (
                  <Input
                    key={i}
                    value={option.text[language]}
                    onChange={e => onChangeInput(i, e.target.value, language)}
                  />
                ))}
              </TabPane>
            ))}
          </Tabs>
        </Col>
        <Col xs={8} sm={12}>
          <TextWithInfo title="Selecciona la respuesta para indicar que es correcta">
            Correcta
          </TextWithInfo>

          {value.map((option: any, i: number) => (
            <Row key={i}>
              <Col style={{ textAlign: "center" }} span={4}>
                <Button
                  style={!!value[i].isCorrect ? { background: "green", color: "white" } : {}}
                  icon="check"
                  shape="circle"
                  onClick={() => onSetRightAnswer(i)}
                />
              </Col>
              <Col style={{ textAlign: "center" }} span={4}>
                {i > 0 ? (
                  /* only show delete button if not first option */
                  <Button
                    type="danger"
                    icon="delete"
                    shape="circle"
                    onClick={() => onDelete(i)}
                  />
                ) : null}
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Row>
  );
});
