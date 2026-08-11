import {describe, expect, it} from 'vitest';
import {
  GenerateRecord,
  type GenerateRecordCommand,
  type GenerateRecordField,
} from './GenerateRecord';

describe('GenerateRecord', () => {
  const sut = new GenerateRecord();

  it('一つのフィールドのレコードクラス文字列が生成される', () => {
    const generateRecordField: GenerateRecordField = {
      name: 'Id',
      type: 'String',
    };
    const generateRecordCommand: GenerateRecordCommand = {
      className: 'User',
      fields: [generateRecordField],
    };

    const result = sut.execute(generateRecordCommand);

    expect(result).toBe(
      [
        'Option Explicit',
        '',
        "' === Fields ===",
        'Private pId As String',
        '',
        "' === Constructor ===",
        'Public Sub Init(ByVal id_val As String)',
        '  Id = id_val',
        'End Sub',
        '',
        "' === Getters ===",
        'Property Get Id() As String',
        '  Id = pId',
        'End Property',
        '',
        "' === Equals ===",
        'Public Function Equals(ByVal other As Object) As Boolean',
        '  If other Is Nothing Then',
        '    Equals = False',
        '    Exit Function',
        '  End If',
        '',
        '  If TypeName(other) <> "User" Then',
        '    Equals = False',
        '    Exit Function',
        '  End If',
        '',
        '  If (Id = other.Id) Then',
        '    Equals = True',
        '  Else',
        '    Equals = False',
        '  End If',
        'End Function',
      ].join('\n'),
    );
  });

  it('二つのフィールドのレコードクラス文字列が生成される', () => {
    const f1: GenerateRecordField = {
      name: 'Id',
      type: 'String',
    };

    const f2: GenerateRecordField = {
      name: 'Amount',
      type: 'Long',
    };

    const command: GenerateRecordCommand = {
      className: 'Transaction',
      fields: [f1, f2],
    };

    const result = sut.execute(command);

    expect(result).toBe(
      [
        'Option Explicit',
        '',
        "' === Fields ===",
        'Private pId As String',
        'Private pAmount As Long',
        '',
        "' === Constructor ===",
        'Public Sub Init(ByVal id_val As String, ByVal amount_val As Long)',
        '  Id = id_val',
        '  Amount = amount_val',
        'End Sub',
        '',
        "' === Getters ===",
        'Property Get Id() As String',
        '  Id = pId',
        'End Property',
        '',
        'Property Get Amount() As Long',
        '  Amount = pAmount',
        'End Property',
        '',
        "' === Equals ===",
        'Public Function Equals(ByVal other As Object) As Boolean',
        '  If other Is Nothing Then',
        '    Equals = False',
        '    Exit Function',
        '  End If',
        '',
        '  If TypeName(other) <> "Transaction" Then',
        '    Equals = False',
        '    Exit Function',
        '  End If',
        '',
        '  If (Id = other.Id) And _',
        '     (Amount = other.Amount) Then',
        '    Equals = True',
        '  Else',
        '    Equals = False',
        '  End If',
        'End Function',
      ].join('\n'),
    );
  });
});
