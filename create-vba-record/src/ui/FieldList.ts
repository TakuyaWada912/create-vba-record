class NotFoundElementWithIdError extends Error {
  constructor(id: string) {
    super(`IDに${id}を持った要素が見つかりません。`);
  }
}
export class FieldList {
  private readonly fieldsDiv: HTMLElement;
  private readonly fieldAddButton: HTMLElement;

  constructor() {
    const fieldsDiv = document.getElementById('fields');
    const fieldAddButton = document.getElementById('field-add-button');

    if (!fieldsDiv) {
      throw new NotFoundElementWithIdError('fields');
    }
    if (!fieldAddButton) {
      throw new NotFoundElementWithIdError('field-add-button');
    }

    this.fieldsDiv = fieldsDiv;
    this.fieldAddButton = fieldAddButton;
  }

  initialize(): void {
    this.fieldAddButton.addEventListener('click', this.handleAddField);
  }

  private handleAddField = (): void => {
    const div = this.createFieldTextboxDiv();

    this.fieldsDiv.append(div);
  };

  private createFieldTextboxDiv = (): HTMLDivElement => {
    const divInnerElements = this.createFieldTextBoxDivInnerElements();

    const div = document.createElement('div');
    div.classList.add('field');
    div.append(...divInnerElements);

    return div;
  };

  private createFieldTextBoxDivInnerElements = (): HTMLElement[] => {
    const newFieldNumber = this.fieldsDiv.childElementCount + 1;

    const textboxId = 'field-textbox-' + newFieldNumber.toString();

    const label = this.createFieldLabel(newFieldNumber, textboxId);

    const textbox = this.createFieldTextbox(textboxId);

    const deleteButton = this.createFieldDeleteButton(newFieldNumber);

    return [label, textbox, deleteButton];
  };

  private createFieldLabel = (
    newFieldNumber: number,
    textboxId: string,
  ): HTMLLabelElement => {
    const label = document.createElement('label');
    label.innerText = 'フィールド' + newFieldNumber.toString();
    label.setAttribute('for', textboxId);
    return label;
  };

  private createFieldTextbox = (textboxId: string): HTMLInputElement => {
    const textbox = document.createElement('input');
    textbox.setAttribute('type', 'text');
    textbox.setAttribute('id', textboxId);
    textbox.classList.add('field-textbox');
    return textbox;
  };

  private createFieldDeleteButton = (
    newFieldNumber: number,
  ): HTMLButtonElement => {
    const deleteButtonId = 'field-delete-button-' + newFieldNumber.toString();
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', deleteButtonId);
    deleteButton.innerText = '削除';
    return deleteButton;
  };
}
