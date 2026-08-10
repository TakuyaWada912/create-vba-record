export class GenerateRecord {
  execute(command: GenerateRecordCommand[]): string {
    const fields = command.map((c) => {
      return `Private p${c.fieldName} As ${c.fieldType}`;
    });

    const getters = command.map((c) => {
      return [
        `Property Get ${c.fieldName}() As ${c.fieldType}`,
        `  ${c.fieldName} = p${c.fieldName}`,
        `End Property`,
      ].join('\n');
    });

    return [
      'Option Explicit',
      '',
      "' === fields ===",
      ...fields,
      '',
      "' === getters ===",
      ...getters,
      '',
    ].join('\n');
  }
}

export interface GenerateRecordCommand {
  fieldName: string;
  fieldType: string;
}
