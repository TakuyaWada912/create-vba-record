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
        "' === fields ===",
        'Private pId As String',
        '',
        "' === getters ===",
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
      fieldName: 'Name',
      fieldType: 'String',
    };

    const result = sut.execute([c1, c2]);

    expect(result).toBe(
      [
        'Option Explicit',
        '',
        "' === fields ===",
        'Private pId As String',
        'Private pName As String',
        '',
        "' === getters ===",
        'Property Get Id() As String',
        '  Id = pId',
        'End Property',
        '',
        'Property Get Name() As String',
        '  Name = pName',
        'End Property',
        '',
      ].join('\n'),
    );
  });
});
