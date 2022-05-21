import { CompareFieldsValidation } from "./compare-fields-validator" 
import { InvalidParamError } from "../../errors"

const makeSut = (): CompareFieldsValidation => {
    return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('Compare field validation', () => {
    test('Should return a InvalidParamError if validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({
            field: 'any_value',
            fieldToCompare: 'different_value'
        })
        expect(error).toEqual(new InvalidParamError('fieldToCompare'))
    })

    test('Should not return if validation succeeds', () => {
        const sut = makeSut()
        const error = sut.validate({
            field: 'any_value',
            fieldToCompare: 'any_value'
        })
        expect(error).toBeFalsy()
    })

})