export class GenerateRecord {
  execute(command: GenerateRecordCommand): string {
    const fields = createFieldsStr(command.fields);
    const getters = createGettersStr(command.fields);
    const constructor = createConstructor(command.fields);
    const equals = createEquals(command);
    return createRecordStr(fields, getters, constructor, equals);
  }
}

const createFieldsStr = (fields: GenerateRecordField[]): string[] => {
  return fields.map((f) => {
    return `Private p${f.name} As ${f.type}`;
  });
};

const createGettersStr = (fields: GenerateRecordField[]): string[] => {
  return fields.map((f) => {
    return [
      `Property Get ${f.name}() As ${f.type}`,
      `  ${f.name} = p${f.name}`,
      `End Property`,
      '',
    ].join('\n');
  });
};

const createConstructor = (fields: GenerateRecordField[]): string[] => {
  const signature = createConstructorSignature(fields);

  const assignFields = fields.map((c) => {
    return `  ${c.name} = ${c.name.toLowerCase() + '_val'}`;
  });

  return [signature, ...assignFields, 'End Sub'];
};

const createConstructorSignature = (fields: GenerateRecordField[]): string => {
  const argsStr = fields.map((f) => {
    const argStr = f.name.toLowerCase() + '_val';
    return `ByVal ${argStr} As ${f.type}`;
  });

  return `Public Sub Init(${argsStr.join(', ')})`;
};

const createEquals = (command: GenerateRecordCommand): string[] => {
  const fieldCriteria = createFieldCriteria(command.fields);

  return [
    'Public Function Equals(ByVal other As Object) As Boolean',
    '  If other Is Nothing Then',
    '    Equals = False',
    '    Exit Function',
    '  End If',
    '',
    `  If TypeName(other) <> "${command.className}" Then`,
    '    Equals = False',
    '    Exit Function',
    '  End If',
    '',
    ...fieldCriteria,
    '    Equals = True',
    '  Else',
    '    Equals = False',
    '  End If',
    'End Function',
  ];
};

const createFieldCriteria = (fields: GenerateRecordField[]): string[] => {
  let result: string[];

  if (fields.length > 1) {
    result = fields.map((field, index) => {
      if (index === 0) {
        return `  If (${field.name} = other.${field.name}) And _`;
      }

      if (index === fields.length - 1) {
        return `     (${field.name} = other.${field.name}) Then`;
      }

      return ``;
    });
  } else {
    result = fields.map((f) => {
      return `  If (${f.name} = other.${f.name}) Then`;
    });
  }

  return result;
};

const createRecordStr = (
  fields: string[],
  getters: string[],
  constructor: string[],
  equals: string[],
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
    "' === Equals ===",
    ...equals,
  ].join('\n');
};

export interface GenerateRecordCommand {
  className: string;
  fields: GenerateRecordField[];
}

export interface GenerateRecordField {
  name: string;
  type: string;
}
