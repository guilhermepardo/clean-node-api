import { HttpResponse, HttpRequest, Controller, Validation } from './signup-protocol'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { AddAccount } from '../../../domain/usecases/add-account'

export class SignUpController implements Controller {
    private readonly addAccount: AddAccount
    private readonly validation: Validation

    constructor(addAccount: AddAccount, validation: Validation) {
        this.addAccount = addAccount
        this.validation = validation
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)

            if (error) return badRequest(error)

            const { name, email, password } = httpRequest.body;

            const account = await this.addAccount.add({
                name,
                email,
                password
            })

            console.log('account :>>', account)

            return ok(account)
        } catch (error) {
            return serverError(error)
        }
    }
}