export class GenerateRecord {
  execute(command: GenerateRecordCommand[]): string {
    const fields = createFieldsStr(command);
    const getters = createGettersStr(command);
    const constructor = createConstructor(command);
    return createRecordStr(fields, getters, constructor);
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

const createConstructor = (command: GenerateRecordCommand[]): string[] => {
  const argsStr = command.map((c) => {
    const argStr = c.fieldName.toLowerCase() + '_val';
    return `ByVal ${argStr} As ${c.fieldType}`;
  });

  const signature = `Public Sub Init(${argsStr.join(', ')})`;

  const fields = command.map((c) => {
    return `  ${c.fieldName} = ${c.fieldName.toLowerCase() + '_val'}`;
  });

  return [signature, ...fields, 'End Sub'];
};
const createRecordStr = (
  fields: string[],
  getters: string[],
  constructor: string[],
): string => {
  return [
    'Option Explicit',
    '',
    "' === Fields ===",
    ...fields,
    '',
    "' === Constructor ===",
    ...constructor,
    '',
    "' === Getters ===",
    ...getters,
  ].join('\n');
};

export interface GenerateRecordCommand {
  fieldName: string;
  fieldType: string;
}
