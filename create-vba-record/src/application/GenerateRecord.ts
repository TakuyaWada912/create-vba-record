export class GenerateRecord {
  execute(command: GenerateRecordCommand[]): string {
    const fields = createFieldsStr(command);
    const getters = createGettersStr(command);
    return createRecordStr(fields, getters);
  }
}

const createFieldsStr = (command: GenerateRecordCommand[]): string[] => {
  return command.map((c) => {
    return `Private p${c.fieldName} As ${c.fieldType}`;
  });
};

const createGettersStr = (command: GenerateRecordCommand[]): string[] => {
  return command.map((c) => {
    return [
      `Property Get ${c.fieldName}() As ${c.fieldType}`,
      `  ${c.fieldName} = p${c.fieldName}`,
      `End Property`,
      '',
    ].join('\n');
  });
};

const createRecordStr = (fields: string[], getters: string[]): string => {
  return [
    'Option Explicit',
    '',
    "' === fields ===",
    ...fields,
    '',
    "' === getters ===",
    ...getters,
  ].join('\n');
};

export interface GenerateRecordCommand {
  fieldName: string;
  fieldType: string;
}
