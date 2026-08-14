const fieldAddButton = document.getElementById('field-add-button')

const createFieldTextboxDiv = (): HTMLDivElement => {
    const divInnerElements = createFieldTextBoxDivInnerElements();

    const div = document.createElement('div');
    div.classList.add("field");
    div.append(...divInnerElements);

    return div;
}

const getFieldCount = (): number => {
    const fieldsDiv = getFieldsDiv();

    let fieldCount = 0;

    if (fieldsDiv) {
        fieldCount = fieldsDiv.childElementCount;
    }

    return fieldCount;
}

const getFieldsDiv = (): HTMLElement | null => {
    return document.getElementById('fields');
}

const createFieldLabel = (
    newFieldNumber: number,
    textboxId: string): HTMLLabelElement => {
    const label = document.createElement('label');
    label.innerText = 'フィールド' + newFieldNumber.toString();
    label.setAttribute("for", textboxId);
    return label;
}

const createFieldTextbox = (textboxId: string): HTMLInputElement => {
    const textbox = document.createElement('input');
    textbox.setAttribute("type", "text")
    textbox.setAttribute("id", textboxId)
    textbox.classList.add("field-textbox")
    return textbox;
}

const createFieldDeleteButton = (newFieldNumber: number): HTMLButtonElement => {
    const deleteButtonId = "field-delete-button-" + newFieldNumber.toString();
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute("id", deleteButtonId)
    deleteButton.innerText = "削除";
    return deleteButton;
}

const createFieldTextBoxDivInnerElements = (): HTMLElement[] => {
    const newFieldNumber = getFieldCount() + 1;

    const textboxId = "field-textbox-" + newFieldNumber.toString();

    const label = createFieldLabel(newFieldNumber, textboxId);

    const textbox = createFieldTextbox(textboxId);

    const deleteButton = createFieldDeleteButton(newFieldNumber);

    return [label, textbox, deleteButton];
}

const handleAddField = (): void => {
    const fields = getFieldsDiv();
    const div = createFieldTextboxDiv();

    if (fields) {
        fields.append(div);
    }
}

if (fieldAddButton) {
    fieldAddButton.addEventListener("click", handleAddField)
}