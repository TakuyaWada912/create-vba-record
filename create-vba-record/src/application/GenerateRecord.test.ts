import {describe, expect, it} from 'vitest';
import {GenerateRecord, type GenerateRecordCommand} from './GenerateRecord';

describe('GenerateRecord', () => {
  const sut = new GenerateRecord();

  it('一つのフィールドのレコードクラス文字列が生成される', () => {
    const generateRecordCommand: GenerateRecordCommand = {
      fieldName: 'Id',
      fieldType: 'String',
    };

    const result = sut.execute([generateRecordCommand]);

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
      ].join('\n'),
    );
  });

  it('二つのフィールドのレコードクラス文字列が生成される', () => {
    const c1: GenerateRecordCommand = {
      fieldName: 'Id',
      fieldType: 'String',
    };

    const c2: GenerateRecordCommand = {
      fieldName: 'Amount',
      fieldType: 'Long',
    };

    const result = sut.execute([c1, c2]);

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
      ].join('\n'),
    );
  });
});
