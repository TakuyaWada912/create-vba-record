<<<<<<< HEAD
import {describe, expect, it} from 'vitest';
import {GenerateRecord, type GenerateRecordCommand} from './GenerateRecord';

describe('GenerateRecord', () => {
  it('一つのフィールドのレコードクラス文字列が生成される(Getter,Setterあり)', () => {
    const sut = new GenerateRecord();

    const generateRecordCommand: GenerateRecordCommand = {
      fieldName: 'Id',
      fieldType: 'String',
    };

    const result = sut.execute(Array(generateRecordCommand));

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
});
=======
import { describe, expect, it } from 'vitest';
import { GenerateRecord, type GenerateRecordCommand } from './GenerateRecord';

describe("GenerateRecord", () => {
    it("一つのフィールドのレコードクラス文字列が生成される(Getter,Setterあり)", () => {
        const sut = new GenerateRecord();

        const generateRecordCommand: GenerateRecordCommand = {
            fieldName: "Id",
            fieldType: 'String'
        }

        const result = sut.execute(Array(generateRecordCommand));

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
            ].join('\n')
        );
    })
})
>>>>>>> 1114cb68b4ca013603b8b6228aa70c606b4d094d
